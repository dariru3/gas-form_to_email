# gas-form_to_email
# Google Sheets Workflow Automation

## Overview

This project is designed to automate a set of specific tasks related to a Google Sheets workflow. It includes functionalities like:

- Copy new form submissions to an "Assign" sheet
- Move rows from the "Assign" sheet to the "Archive" sheet when marked as done
- Automatically send emails and Google Chat messages on a new submission

## Features

### Custom Menu
- **Copy New Entries**: A custom menu button to initiate the process of copying new entries from the "Form Responses 1" sheet to the "Assign" sheet.

### Triggers
- **onOpen**: Initializes the custom menu when the sheet is opened.
- **onFormSubmit**: Triggered upon form submission. It sends an email to the relevant parties and initiates a Google Chat message.

## Setup

1. Open Google Sheets
2. Navigate to Extensions > Apps Script to open the script editor
3. Copy the code from the `.gs` file into the script editor
4. Save the project
5. Set up appropriate triggers for `onOpen` and `onFormSubmit`

## How it Works

1. **onOpen**: Adds a custom menu that has a function to copy new entries from "Form Responses 1" to "Assign."
2. **Copy New Entries**: Compares the "Form Responses 1" sheet with the "Assign" and "Archive" sheets. Any new entries get copied to the "Assign" sheet.
3. **onFormSubmit**: Activated upon a new form submission. Fills a pre-defined email template and sends it. Also sends a Google Chat message.
4. **Moving Rows**: If a row in the "Assign" sheet is marked as 'Done,' it can be moved to the "Archive" sheet along with a timestamp.

## Notes

### Email Sending
- The email templates are HTML files and can be customized.
- Emails are sent with the Gmail API.
  
### Google Chat
- Google Chat messages are sent using webhooks.
