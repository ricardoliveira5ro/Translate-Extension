chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translateText",
      title: "Translate Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateText") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: translateSelectedText,
        args: [info.selectionText]
      });
    }
  });
  
  function translateSelectedText(selectedText) {
    const translation = "Translation of: " + selectedText;
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const translateBox = document.createElement('div');
  
    translateBox.textContent = translation;
    translateBox.style.color = '#000000';
    translateBox.style.position = 'absolute';
    translateBox.style.backgroundColor = '#f9f9f9';
    translateBox.style.border = '1px solid #ccc';
    translateBox.style.padding = '5px';
    translateBox.style.zIndex = '1000';
    translateBox.style.left = `${rect.left + window.scrollX}px`;
    translateBox.style.top = `${rect.top + window.scrollY - 35}px`;
  
    document.body.appendChild(translateBox);
  
    setTimeout(() => {
      translateBox.remove();
    }, 3000);
}