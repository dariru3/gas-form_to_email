function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Creates a custom menu
  ui.createMenu('Custom Menu')
      .addItem('Copy New Entries', 'copyNewEntries')  // The name of the function to run
      .addToUi();
}

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
  const newEntries = [];
  
  // Loop through each row in "Response" to see if it exists in the Set
  for (const responseRow of responseData) {
    const timestamp = responseRow[0].toString();
    
    if (!allKnownTimestamps.has(timestamp)) {
      //Add additional data: Status set to 'NEW' and Done set to an unchecked checkbox
      const extendedRow = [...responseRow, 'NEW', '', '', '', ''];
      newEntries.push(extendedRow);
    }
  }
  
  // Append new entries to "Assign" if any
  if (newEntries.length > 0) {
    const targetRange = assignSheet.getRange(assignSheet.getLastRow() + 1, 1, newEntries.length, newEntries[0].length);
    targetRange.setValues(newEntries);
  }
}
