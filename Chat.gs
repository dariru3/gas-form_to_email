function sendToGoogleChat(formData) {
  // Generate the message to be sent
  const message = {
    "text": `★★${formData.clientName} ${formData.requestType} ${formData.numPages}p ${formData.returnDate}`
  };

  // Replace this URL with your Google Chat Webhook URL
  const webhookUrl = config.webhook;

  // Set up the API call parameters
  const params = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(message)
  };

  // Make the API call
  UrlFetchApp.fetch(webhookUrl, params);
}
