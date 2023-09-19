function moveCompletedTasks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const assignSheet = ss.getSheetByName("Assign");
  const archiveSheet = ss.getSheetByName("Archive");
  
  const assignData = assignSheet.getRange(2, 1, assignSheet.getLastRow() - 1, assignSheet.getLastColumn()).getValues();
  
  // Locate the column labeled "Done"
  const headerRow = assignSheet.getRange(1, 1, 1, assignSheet.getLastColumn()).getValues()[0];
  const doneColumnIndex = headerRow.findIndex(header => header === "Done");
  
  const rowsToArchive = [];
  const rowsToRemove = [];
  
  // Check each row in the "Assign" sheet to see if "Done" is true
  for (let i = 0; i < assignData.length; i++) {
    if (assignData[i][doneColumnIndex]) {
      // Add a timestamp to the end of the row
      const rowWithTimestamp = [...assignData[i], new Date()];
      rowsToArchive.push(rowWithTimestamp);
      rowsToRemove.push(i + 2); // +2 because array is 0-based and we skip the header row
    }
  }
  
  // Move the rows to "Archive" sheet
  if (rowsToArchive.length > 0) {
    const archiveTargetRange = archiveSheet.getRange(archiveSheet.getLastRow() + 1, 1, rowsToArchive.length, rowsToArchive[0].length);
    archiveTargetRange.setValues(rowsToArchive);
  }
  
  // Remove the moved rows from the "Assign" sheet, doing it in reverse so it doesn't mess up the row numbers
  for (let i = rowsToRemove.length - 1; i >= 0; i--) {
    assignSheet.deleteRow(rowsToRemove[i]);
  }
}
