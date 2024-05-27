let currentTranslateBox;

document.addEventListener('mouseup', (event) => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        let translateButton = document.createElement('button');
  
        translateButton.textContent = 'Translate';
        translateButton.style.position = 'absolute';
        translateButton.style.left = `${rect.right + window.scrollX + 5}px`;
        translateButton.style.top = `${rect.bottom + window.scrollY + 5}px`;
        translateButton.style.zIndex = '1000';
        translateButton.style.backgroundColor = '#008CBA';
        translateButton.style.color = '#fff';
        translateButton.style.border = 'none';
        translateButton.style.borderRadius = '4px';
        translateButton.style.padding = '5px 10px';
        translateButton.style.cursor = 'pointer';
  
        document.body.appendChild(translateButton);
  
        translateButton.addEventListener('click', () => {
            const translation = "Translation of: " + selectedText;
            const rangeTranslation = window.getSelection().getRangeAt(0);
            const rectTranslation = rangeTranslation.getBoundingClientRect();
            const translateBox = document.createElement('div');

            translateBox.textContent = translation;
            translateBox.style.color = '#000000';
            translateBox.style.position = 'absolute';
            translateBox.style.backgroundColor = '#f9f9f9';
            translateBox.style.border = '1px solid #ccc';
            translateBox.style.padding = '5px';
            translateBox.style.zIndex = '1000';
            translateBox.style.left = `${rectTranslation.left + window.scrollX}px`;
            translateBox.style.top = `${rectTranslation.top + window.scrollY - 35}px`;

            document.body.appendChild(translateBox);
            currentTranslateBox = translateBox;

            translateButton.remove();
        });

        document.addEventListener('mousedown', (event) => {
            if (currentTranslateBox)
                currentTranslateBox.remove()

            if (event.target !== translateButton)
                translateButton.remove();
        }, { once: true });
    }
});