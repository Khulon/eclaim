import * as XLSX from 'xlsx'
import { parseDate } from '../functions/Parsers';


export default function excel(claim, fullData) {
    try {
        console.log(fullData)
        for(let i = 0; i < fullData.length; i++){
            if(fullData[i].receipt != null){
                fullData[i].receipt = "Yes"            
            }
        }

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        

        const worksheet = XLSX.utils.aoa_to_sheet([['Claim ID: ' + claim.id], ['Form Creator: ' + claim.form_creator], ['Pay Period From: ' + parseDate(claim.pay_period_from)],
        ['Pay Period To: ' + parseDate(claim.pay_period_to)], ['Cost Centre: ' + claim.cost_centre]]);

        // Convert the data to worksheet format
        XLSX.utils.sheet_add_json(worksheet, fullData, { origin: 7});
        

        const columns = Object.keys(fullData[0]);
        const columnWidths = columns.map(column => ({
        width: column.length + 2
        }));
        
        
        
        fullData.forEach(row => {
        columns.forEach((column, index) => {
            const value = row[column]
            if (value.length + 2 > columnWidths[index].width) {
            columnWidths[index].width = value.length + 2;
            }
        });
        });

        worksheet['!cols'] = columnWidths;
        
        const cellAddress = 'A9'; // Specify the cell address you want to access
        const cellValue = worksheet[cellAddress].v;
        
        const totalRow = fullData.length + 12;
        

        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Total Amount: $ ' + claim.total_amount ]], { origin: 'A' + totalRow });
        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Approved By: ' ]], { origin: 'A' + (totalRow + 1) });
        XLSX.utils.sheet_add_aoa(worksheet, [[ 'Processed By: ']], { origin: 'A' + (totalRow + 2) });
        


        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

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

  