let currentTranslateBox;

document.addEventListener('mouseup', (event) => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();

        let translateButton = document.createElement('button');
        translateButton.classList.add('translate-button');
        translateButton.style.left = `${rect.right + window.scrollX + 5}px`;
        translateButton.style.top = `${rect.bottom + window.scrollY + 5}px`;

        let translateIcon = document.createElement('img');
        translateIcon.src = chrome.runtime.getURL('icons/icon32.png');
        translateIcon.classList.add('translate-icon');

        let translateText = document.createElement('span');
        translateText.textContent = 'Translate';
        translateText.classList.add('translate-text')

        translateButton.appendChild(translateIcon)
        translateButton.appendChild(translateText)
        document.body.appendChild(translateButton);
  
        translateButton.addEventListener('click', async () => {
            try {
                const response = await fetch('https://translate-server-ten.vercel.app/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: selectedText,
                        targetLang: 'PT-PT'
                    })
                });

                const data = await response.json();
                console.log(data)
                const translation = data.translation;

                const rangeTranslation = window.getSelection().getRangeAt(0);
                const rectTranslation = rangeTranslation.getBoundingClientRect();
                const translateBox = document.createElement('div');

                translateBox.textContent = translation;
                translateBox.classList.add('translate-box');
                const containerElement = range.startContainer.parentElement;
                if (containerElement) {
                    const containerRect = containerElement.getBoundingClientRect();
                    translateBox.style.maxWidth = `${containerRect.width}px`;
                }
                translateBox.style.left = `${rectTranslation.left + window.scrollX}px`;
                translateBox.style.top = `${rectTranslation.top + window.scrollY - rectTranslation.height - 10}px`;

                document.body.appendChild(translateBox);
                currentTranslateBox = translateBox;

                translateButton.remove();

            } catch (error) {
                console.error('Error translating text:', error);
            }
        });

        document.addEventListener('mousedown', (event) => {
            if (currentTranslateBox)
                currentTranslateBox.remove()

            if (!translateButton.contains(event.target))
                translateButton.remove();
        }, { once: true });
    }
});