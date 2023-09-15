function onFormSubmit(e) {
  // Get the submitted form values
  var responses = e.values;
  var name = responses[1];
  var email = responses[2];
  var message = responses[3];
  
  // Fetch the email template and fill in the variables
  var emailTemplate = HtmlService.createTemplateFromFile('emailTemplate');
  emailTemplate.name = name;
  emailTemplate.message = message;
  
  // Generate the HTML email body
  var emailBody = emailTemplate.evaluate().getContent();
  
  // Send the custom email
  GmailApp.sendEmail({
    to: email,
    subject: "Thanks for Your Submission",
    htmlBody: emailBody
  });
}
