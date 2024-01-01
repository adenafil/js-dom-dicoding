const localStorageKey = 'PRESS_FREQUENCY';

// Pengecekan: apakah data localStorage dengan key count tersedia atau belum
if (typeof Storage !== 'undefiend') {
    // Jika item pada local storage belum ada, data akan diberi nilai awal, yakni 0
    if (localStorage.getItem(localStorageKey) == null)
    localStorage.setItem(localStorageKey, 0);
    
    const incrementButton = document.querySelector('#incrementButton');
    const clearButton = document.querySelector('#clear');
    const countDisplay = document.querySelector('#count');

    // Memberikan nilai item dari local storage
    countDisplay.innerText = localStorage.getItem(localStorageKey);

    incrementButton.addEventListener('click', () => {
        let count = localStorage.getItem(localStorageKey);
        count++;
        localStorage.setItem(localStorageKey, count);
        countDisplay.innerText = localStorage.getItem(localStorageKey);
    });

    // Memberikan nilai 0 ke tampilan karena di-reset dan menghapus item
    clearButton.addEventListener('click', () => {
        localStorage.removeItem(localStorageKey);
        countDisplay.innerText = 0;
    })
} else
    alert('Browser yang anda gunakan tidak mendukung web storage.');


