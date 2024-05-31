const dropdown = document.getElementById('language-select');

const setTargetLanguage = () => {
    chrome.storage.sync.get(['targetLanguage'], (result) => {
        dropdown.value = result.targetLanguage || 'EN';
    });
}
setTargetLanguage();


const changeLanguage = () => {
    const targetLanguage = dropdown.value;
    chrome.storage.sync.set({ targetLanguage }, () => {
        console.log(`Target language set to ${targetLanguage}`);
    });
}

dropdown.addEventListener('change', changeLanguage)
document.addEventListener('DOMContentLoaded', setTargetLanguage);