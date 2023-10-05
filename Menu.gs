function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('Custom Menu')
    .addItem('Copy New Entries (hide rows)', 'copyNewEntries')
    .addItem('Move Completed Tasks to Archive', 'moveCompletedTasks')
    .addToUi();
}
