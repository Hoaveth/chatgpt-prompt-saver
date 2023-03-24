// For popup.js, add an event listener to the button or element inside your popup.html
document.getElementById("saveButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "addButtonBesideForm" });
  });
});
