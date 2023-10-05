function copyNewEntries() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Identify the "Response", "Assign", and "Archive" sheets
  const responseSheet = ss.getSheetByName("Form Responses 1");
  const assignSheet = ss.getSheetByName("Assign");
  const archiveSheet = ss.getSheetByName("Archive");

  
  // Get all data from all three sheets
  const responseData = responseSheet.getRange(2, 1, responseSheet.getLastRow(), responseSheet.getLastColumn()).getValues();
  const assignData = assignSheet.getRange(2, 1, assignSheet.getLastRow(), assignSheet.getLastColumn()).getValues();
  const archiveData = archiveSheet.getRange(2, 1, archiveSheet.getLastRow(), archiveSheet.getLastColumn()).getValues();


  // Convert timestamps to strings for easier comparison
  const assignTimestamps = assignData.map(row => row[0].toString());
  const archiveTimestamps = archiveData.map(row => row[0].toString());
  
  // Combine the timestamps from both "Assign" and "Archive" into one Set
  const allKnownTimestamps = new Set([...assignTimestamps, ...archiveTimestamps]);

  // Initialize an array to hold new entries
  let newEntries = [];
  let rowsToHide = [];
  
  // Loop through each row in "Response" to see if it exists in the Set
  for (let i = 0; i < responseData.length; i++) {
    const responseRow = responseData[i];
    const timestamp = responseRow[0].toString();
    
    if (allKnownTimestamps.has(timestamp)) {
      rowsToHide.push(i+1);
    } else {
      //Add additional data: Status set to 'NEW' and Done set to an unchecked checkbox
      const extendedRow = [...responseRow, '', 'NEW', '', '', ''];
      newEntries.push(extendedRow);
    }
  }
  
  // Get header row and find "Done" column index
  const headerRow = assignSheet.getRange(1, 1, 1, assignSheet.getLastColumn()).getValues()[0];
  const doneColumnIndex = headerRow.indexOf("Done") + 1;  // Adding 1 because sheet column indices are 1-based

  // Append new entries to "Assign" if any
  if (newEntries.length > 0) {
    const targetRange = assignSheet.getRange(assignSheet.getLastRow() + 1, 1, newEntries.length, newEntries[0].length);
    targetRange.setValues(newEntries);

    // Define the range for the 'Done' checkboxes.
    const checkboxStartRow = assignSheet.getLastRow() - newEntries.length + 1;
    const checkboxRange = assignSheet.getRange(checkboxStartRow, doneColumnIndex, newEntries.length);
    
    // Insert checkboxes into the 'Done' column for the new rows
    checkboxRange.insertCheckboxes();
  }

  // Sort rowsToHide in descending order
  rowsToHide.sort((a, b) => b - a);

  for (const rowIndex of rowsToHide) {
    responseSheet.hideRows(rowIndex, 1);
  }
}
