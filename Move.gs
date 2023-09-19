function moveCompletedTasks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const assignSheet = ss.getSheetByName("Assign");
  const archiveSheet = ss.getSheetByName("Archive");
  
  // Fetch the header row to find the index of the "Done" column
  const headerRow = assignSheet.getRange(1, 1, 1, assignSheet.getLastColumn()).getValues()[0];
  const doneColumnIndex = headerRow.indexOf("Done") + 1;  // +1 because sheet column indices are 1-based

  // Get the data in the "Assign" sheet
  const assignData = assignSheet.getRange(2, 1, assignSheet.getLastRow() - 1, assignSheet.getLastColumn()).getValues();
  
  // Initialize an array to hold completed tasks
  const completedTasks = [];
  
  // Initialize an array to hold the row numbers to be deleted
  const rowsToDelete = [];
  
  // Loop through the "Assign" sheet and check for rows with `True` in the "Done" column
  for (let i = 0; i < assignData.length; i++) {
    if (assignData[i][doneColumnIndex - 1] === true) { // -1 because arrays are 0-based
      completedTasks.push(assignData[i]);
      rowsToDelete.push(i + 2);  // +2 because sheet rows are 1-based and we skip the header
    }
  }
  
  // Append completed tasks to the "Archive" sheet
  if (completedTasks.length > 0) {
    const archiveTargetRange = archiveSheet.getRange(archiveSheet.getLastRow() + 1, 1, completedTasks.length, completedTasks[0].length);
    archiveTargetRange.setValues(completedTasks);
  }
  
  // Delete the completed tasks from the "Assign" sheet, starting from the bottom
  for (let i = rowsToDelete.length - 1; i >= 0; i--) {
    assignSheet.deleteRow(rowsToDelete[i]);
  }
}
