function getDisclaimer() {
  // Get current time in Tokyo timezone
  const tokyoTime = new Date();
  const tokyoHour = tokyoTime.getHours();
  console.log("Time:", tokyoTime, "Hour:", tokyoHour)

  let disclaimer = "";

  // Check if it's past 6 pm
  if (tokyoHour >= 18) {
    disclaimer += "ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n";
    disclaimer += "このメールはフォーム入力完了時に自動配信されています。\n";
    disclaimer += "18時以降に送信された依頼は、翌営業日受付となります。ご了承ください。\n";
    disclaimer += "ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n";
  }
  console.log("Disclaimer:", disclaimer)
  return disclaimer;
}