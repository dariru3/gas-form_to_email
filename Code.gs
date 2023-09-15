function onFormSubmit(e) {
  const formHeaders = ["依頼日", "メール", "CCメール", "依頼タイプ", "顧客名", "制作物", "対応ページ総数", "ゲラ対応ページ指定", "希望提出期限", "原稿URL（BOX）", "その他希望事項"];
  // Get the submitted form values
  const formKeys = ["timeStamp", "email", "ccAddresses", "requestType", "clientName", "productItem", "numPages", "specificPages", "returnDate", "boxUrl", "otherNotes"];
  const formData = {};

  // Populate formData
  formKeys.forEach((key, index) => {
    formData[key] = e.values[index];
  });
  console.log(formData);

  // Fetch the email template and fill in the variables
  const emailTemplate = HtmlService.createTemplateFromFile('emailTemplate');

  /// Use Object.assign() to transfer all properties to emailTemplate
  Object.assign(emailTemplate, { formData, formHeaders, formKeys });  // Added formHeaders and formKeys here

  // Get preferred name from lookup sheet
  const preferredName = getPreferredName(formData.email);
  if (preferredName) {
    Object.assign(emailTemplate, { name: preferredName });
  }

  // Generate the HTML email body
  const emailBody = emailTemplate.evaluate().getContent();
  console.log(emailBody);
  
  // Send the custom email
  GmailApp.sendEmail(formData.email, 'Thanks for Your Submission', "_", {
    htmlBody: emailBody
  });
}

function getPreferredName(email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lookupSheet = ss.getSheetByName("メールリスト"); // Replace "NameLookup" with your actual sheet name
  const emailColumn = lookupSheet.getRange("A:A").getValues(); // Assuming emails are in column A
  const preferredNameColumn = lookupSheet.getRange("C:C").getValues(); // Assuming preferred names are in column C

  for (let i = 0; i < emailColumn.length; i++) {
    if (emailColumn[i][0] === email) {
      return preferredNameColumn[i][0];
    }
  }
  return null;
}
