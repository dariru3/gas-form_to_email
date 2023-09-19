function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('Custom Menu')
    .addItem('Copy New Entries', 'copyNewEntries')
    .addItem('Move Completed Tasks to Archive', 'moveCompletedTasks')
    .addToUi();
}
