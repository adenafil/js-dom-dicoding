const sessionStorageKey = 'PRESS_FREQUENCY';

if (typeof sessionStorage !== 'undefined') {
    if (sessionStorage.getItem(sessionStorageKey) === null)
        sessionStorage.setItem(sessionStorageKey, 0);

    const incrementButton = document.querySelector('#incrementButton');
    const clearButton = document.querySelector('#clear');
    const countDisplay = document.querySelector('#count');

    countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);

    incrementButton.addEventListener('click', () => {
        let count = sessionStorage.getItem(sessionStorageKey);
        count++;
        sessionStorage.setItem(sessionStorageKey, count);
        countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);
    })

    clearButton.addEventListener('clicl', () => {
        sessionStorage.removeItem(sessionStorageKey);
        countDisplay.innerText = 0;
    })      
} else 
    alert('Browser anda tidak mendukung session storage.');