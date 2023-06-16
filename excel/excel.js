import * as XLSX from 'xlsx'


export default function excel(props) {
    try {
        // Fetch the data from your API or source
        const data = [{id: '1', name: 'First User'},{ id: '2', name: 'Second User'}];

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert the data to worksheet format
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate the Excel file as a Blob
        const excelBlob = workbookToExcelBlob(workbook);

        // Create a temporary URL for the Blob
        const excelUrl = URL.createObjectURL(excelBlob);

        // Download the Excel file
        downloadExcelFile(excelUrl);
    } catch (error) {
        console.error('Error fetching and downloading table data:', error);
    }

    }
    
    const workbookToExcelBlob = (workbook) => {
    const excelData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    return new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    };

    // Function to download the Excel file
    const downloadExcelFile = (excelUrl) => {
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'table.xlsx';
    link.click();
    };

  