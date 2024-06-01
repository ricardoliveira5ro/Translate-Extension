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
  
async function translateSelectedText(selectedText) {
  try {
    chrome.storage.sync.get(['targetLanguage'], async (result) => {
      const targetLanguage = result.targetLanguage || 'EN';

      const response = await fetch('https://translate-server-ten.vercel.app/translate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              text: selectedText,
              targetLang: targetLanguage
          })
      });
      
      const data = await response.json();
      const translation = data.translation;

      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const translateBox = document.createElement('div');

      translateBox.textContent = translation;
      translateBox.classList.add('translate-box');
      const containerElement = range.startContainer.parentElement;
      if (containerElement) {
          const containerRect = containerElement.getBoundingClientRect();
          translateBox.style.maxWidth = `${containerRect.width}px`;
      }
      translateBox.style.left = `${rect.left + window.scrollX}px`;
      translateBox.style.top = `${rect.top + window.scrollY - rect.height - 10}px`;

      document.body.appendChild(translateBox);

      setTimeout(() => {
        translateBox.remove();
      }, 3000);
      });

  } catch (error) {
    console.error('Error translating text:', error);
  }
}