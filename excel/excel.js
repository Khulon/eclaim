import * as XLSX from 'xlsx'
import { parseDate } from '../functions/Parsers';


export default function excel(claim, fullData, approvers, processor) {
        
    try {

        if(claim.cost_centre == null) {
            claim.cost_centre = ""
        }

        for(let i = 0; i < fullData.length; i++){
            if(fullData[i].receipt != null){
                fullData[i].receipt = "Yes"            
            }
        }

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        var worksheet;
        
        if(claim.form_type == 'Travelling') {
            worksheet =  XLSX.utils.aoa_to_sheet([['Claim ID: ' + claim.id], ['Form Creator: ' + claim.form_creator], ['Country: '+ claim.country], ['Period From: ' + parseDate(claim.period_from)],
            ['Period To: ' + parseDate(claim.period_to)], ['Company:' + claim.company], ['Exchange Rate: ' + claim.exchange_rate]]);
        } else {
            worksheet = XLSX.utils.aoa_to_sheet([['Claim ID: ' + claim.id], ['Form Creator: ' + claim.form_creator], ['Period From: ' + parseDate(claim.pay_period_from)],
            ['Period To: ' + parseDate(claim.pay_period_to)], ['Company:' + claim.company], ['Cost Centre: ' + claim.cost_centre]]);
        }
        

        // Convert the data to worksheet format
        XLSX.utils.sheet_add_json(worksheet, fullData, { origin: 7});
        

        const columns = Object.keys(fullData[0]);
        const columnWidths = columns.map(column => ({
        width: column.length + 2
        }));
        for(let i = 0; i < fullData.length; i++) {
            for(let j = 0; j < columns.length; j++) {
                const cellAddress = XLSX.utils.encode_cell({ c: j, r: i + 7 });
                const value = worksheet[cellAddress].v;
                console.log(value)
                if(value != null && value.toString().length + 2 > columnWidths[j].width) {
                    columnWidths[j].width = value.length + 2;
                }
            }
        }

        worksheet['!cols'] = columnWidths; 
        const totalRow = fullData.length + 12;
        var approversString = ""
        var processorString = ""
        
        if(approvers.length != 0) {
            for (let i = 0; i < approvers.length; i++){
                if (i == approvers.length - 1){
                    approversString += approvers[i].person
                } else {
                    approversString += approvers[i].person + ", "
                }
            }
        }
        

        if(processor.length == 0) {
            processorString = ""
        } else {
            processorString = processor[0].person
        }

        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Total Amount: $ ' + claim.total_amount ]], { origin: 'A' + totalRow });
        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Approved By: ' + approversString ]], { origin: 'A' + (totalRow + 1) });
        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Processed By: ' + processorString]], { origin: 'A' + (totalRow + 2) });


        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const workbookToExcelBlob = (workbook) => {
            const excelData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
            return new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        };

        // Function to download the Excel file
        const downloadExcelFile = (excelUrl, id) => {
            const link = document.createElement('a');
            link.href = excelUrl;
            link.download = 'Claim ' + id + '.xlsx';
            link.click();
        };

        // Generate the Excel file as a Blob
        const excelBlob = workbookToExcelBlob(workbook);

        // Create a temporary URL for the Blob
        const excelUrl = URL.createObjectURL(excelBlob);

        // Download the Excel file
        downloadExcelFile(excelUrl, claim.id);
    } catch (error) {
        console.error('Error fetching and downloading table data:', error);
    }

}
    
    

    

  