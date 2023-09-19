# gas-form_to_email
# Google Sheets Automation for Task Management

## Description

This project is designed to automate task management in Google Sheets using Google Apps Script. It consists of multiple components:

1. A Form Responses sheet that collects responses from an external form.
2. An Assign sheet where tasks are managed and updated.
3. An Archive sheet for storing completed tasks.

## Features

### Custom Menu

A custom menu is added to Google Sheets allowing users to manually trigger various functions.

### Copy New Entries

New form entries are copied from the Form Responses sheet to the Assign sheet. Duplicates are identified and ignored based on their timestamp.

### Task Management

In the Assign sheet, new tasks are given a status of "NEW" and a checkbox is inserted in the "Done" column.

### Archiving Completed Tasks

Tasks marked as "Done" in the Assign sheet are moved to the Archive sheet along with a timestamp to indicate when they were completed.

## Setup

1. Open the Google Sheet you wish to automate.
2. Go to Extensions > Apps Script to open the script editor.
3. Paste the code into the editor and save the script.

## Usage

1. Open the Google Sheet.
2. Use the custom menu to run functions manually.

## Functions

### `onOpen()`

Adds a custom menu to Google Sheets.

### `copyNewEntries()`

Checks for new entries in the Form Responses sheet and copies them to the Assign sheet, ignoring duplicates.

### `archiveCompletedTasks()`

Moves rows marked as "Done" from the Assign sheet to the Archive sheet and adds a timestamp.

## Dependencies

* Google Sheets
* Google Apps Script
