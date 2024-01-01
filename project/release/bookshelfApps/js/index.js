const select = document.querySelector('.select');
const BOOK = 'BOOK-KEY';
const imgBook = document.querySelector('.bukuBaru');
let textBuku = document.querySelectorAll('.gap-list')[0];
let inputBuku = document.getElementById('inputBuku');
const RENDER_BOOK_NAME = 'render-book-name';
const tempBukuNama = [];
const books = [];
let staticNameMiddle = '';

function isStorageExist() {
    if (typeof (Storage) === 'undefined') return false;
    return true;
}

class Book {
    #isFilled = false;
    #isCreated = false;
    // #todos = [];

    isFIlled(value) {
        this.#isFilled = value;
    }

    isCreated(value) {
        this.#isCreated = value;
    }

    getFilledValue() {
        return this.#isFilled;
    }

    getCreatedValue() {
        return this.#isCreated;
    }

}

class Bookshelf {
    uuid;
    title;
    author;
    year;
    isComplete = false;
    note;

    constructor(title, author, year, isComplete, note, uuid) {
        if (uuid === undefined) {
            this.uuid = crypto.randomUUID();
        } else {
            this.uuid === uuid;
        }
        this.title = title;
        this.author = author;
        this.year = year;
        this.isComplete = isComplete;
        this.note = note;
    }
}


const bookHTML = new Book();

function loadListOfBooks() {

    let data = JSON.parse(localStorage.getItem(BOOK));

    if (data !== null) tempBukuNama.push(data.title);

    document.dispatchEvent(new Event(RENDER_BOOK_NAME));
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(BOOK) !== null) {
        loadListOfBooks();
        appearMiddle();
        clickMiddleToSet();
        controllerPKosong();
    }
})

function clickMiddleToSet () {
    for (let i = 0; i < document.querySelectorAll('.box-books').length; i++) {
        document.querySelectorAll('.box-books')[i].addEventListener('click', () => {
            appearRightToSet();
            const data = getNameOfBooks();

            document.getElementById('judulSet').value = data[i].title;
            document.getElementById('authorSet').value = data[i].author;
            document.getElementById('yearSet').value = data[i].year;
            document.getElementById('noteSet').value = data[i].note;
            document.getElementById('selesaiSet').checked = data[i].isComplete;

            staticNameMiddle = data[i].title;
        })
    }
}

function controllerPKosong() {
    if (document.querySelectorAll('.contents-list').length <= 3) {
        turnPKosongOn();
    } else {
        disabledKosongText();
    }
}

imgBook.addEventListener('click', () => {
    disableButtonNewBook();
    addJudulOnLeft();
    disabledKosongText();
})

function turnPKosongOn() {
    const p = document.querySelector('.recent-addup').querySelector('p');
    p.removeAttribute('hidden', 'hidden');
}

function disabledKosongText() {
   const p = document.querySelector('.recent-addup').querySelector('p');
   p.setAttribute('hidden', 'hidden');

}

function disableButtonNewBook() {
    document.querySelector('.bukuBaru').setAttribute('disabled', 'disabled');
    document.querySelector('.bukuBaru').style.backgroundColor = '#1E1E1E';
    document.querySelector('.bukuBaru').style.color = 'rgba(255, 255, 255, 0.6)';
    document.getElementById('plusplus').remove();
}

function turnButtonNewBookOn() {
    document.querySelector('.bukuBaru').removeAttribute('disabled', 'disabled');
    document.querySelector('.bukuBaru').style.color = '#FFF';
    document.querySelector('.bukuBaru').style.backgroundColor = '#242424';
    const img = document.createElement('img');
    img.setAttribute('id', 'plusplus');
    img.setAttribute('src', 'assets/plus.svg');
    img.setAttribute('alt', 'bukuBaru');
    imgBook.prepend(img);
}


function addJudulOnLeft() {
    let atas = `
        <div class="contents-list">
        <img width="20px" height="20px" src="assets/book.png" alt="buku">
        <input type="text" name="inputBuku" id="inputBuku" value="Ketik Nama Buku...">
        <img id="x" width="15px" height="15px" src="assets/x.svg" alt="x.svg">
        </div>
        `;

    atas += textBuku.innerHTML;

    textBuku.innerHTML = atas;

    removeX();

    document.getElementById('inputBuku').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {

            document.getElementById('judul').value = document.getElementById('inputBuku').value;

            event.preventDefault();

            appearRightByDefault();

        }
    })
}

function removeJudulOnLeft() {
    document.querySelectorAll('.contents-list')[0].remove();
}


function saveBookToLocalStorage(isSet = false) {
    if (isSet) {
        const judul = document.getElementById('judulSet').value;
        const penulis = document.getElementById('authorSet').value;
        const tahun = document.getElementById('yearSet').value;
        const catatan = document.getElementById('noteSet').value;
        const selesai = document.getElementById('selesaiSet').checked;   
        return JSON.stringify(new Bookshelf(judul, penulis, parseInt(tahun), selesai, catatan)); 
    } else {
        const judul = document.getElementById('judul').value;
        const penulis = document.getElementById('author').value;
        const tahun = document.getElementById('year').value;
        const catatan = document.getElementById('note').value;
        const selesai = document.getElementById('selesai').checked;    
        return JSON.stringify(new Bookshelf(judul, penulis, parseInt(tahun), selesai, catatan));
    }
}


document.getElementById('btn-form').addEventListener('click', (event) => {
    let temp = [];

    if (localStorage.getItem(BOOK) !== null) {
        temp = JSON.parse(localStorage.getItem(BOOK));
        temp.unshift(JSON.parse(saveBookToLocalStorage()));
        localStorage.setItem(BOOK, JSON.stringify(temp));
    } else {
        temp.unshift(JSON.parse(saveBookToLocalStorage()));
        localStorage.setItem(BOOK, JSON.stringify(temp));
    }

    if (document.getElementById('inputBuku') !== null) {

        const firstBook = document.querySelectorAll('.contents-list');
        let buku = document.getElementById('inputBuku');
        const p = document.createElement('p');
        let textNode = document.createTextNode(buku.value);
        p.appendChild(textNode);
        const pUUID = document.createElement('p');
        pUUID.innerText = JSON.parse(saveBookToLocalStorage()).uuid;
        pUUID.setAttribute('hidden', 'hidden');

        firstBook[0].appendChild(p);
        firstBook[0].querySelector('img').setAttribute('src', 'assets/book.png')
        firstBook[0].appendChild(pUUID);

        buku.remove();
        document.getElementById('x').remove();

    }

    location.reload();
    

})

document.getElementById('btn-formSet').addEventListener('click', () => {
    updateLocalStorage();
});

function updateLocalStorage() {
    let temp = [];
    let dataTemp = JSON.parse(saveBookToLocalStorage(true));
    temp = JSON.parse(localStorage.getItem(BOOK));

    for (const iterator of temp) {
        if (getUUIDByName(staticNameMiddle) === iterator.uuid) {
            iterator.author = dataTemp.author;
            iterator.year = dataTemp.year;
            iterator.isComplete = dataTemp.isComplete;
            iterator.note = dataTemp.note;
            iterator.title = dataTemp.title;


        }
    }


    localStorage.setItem(BOOK, JSON.stringify(temp));

}


function getUUIDByName(name) {
    let uuid = '';

    let data = document.querySelector('.gap-list').querySelectorAll('.contents-list');

    for (const cekUUID of data) {
        if (cekUUID.querySelector('p').innerText === name) uuid = cekUUID.querySelectorAll('p')[1].innerText; 
    }

    return uuid;
}

function getNameOfBooks() {
    if (localStorage.getItem(BOOK) !== null) return JSON.parse(localStorage.getItem(BOOK));
    else return [];
}

document.addEventListener(RENDER_BOOK_NAME, () => {
    const dataBook = getNameOfBooks();
    for (const nameBook of dataBook) {

        const div = document.createElement('div');
        div.setAttribute('class', 'contents-list');

        const img = document.createElement('img');
        img.setAttribute('width', '20px');
        img.setAttribute('height', '20px');
        img.setAttribute('src', 'assets/book.png');
        img.setAttribute('alt', 'buku');
        const p = document.createElement('p');
        p.textContent = nameBook.title;
        const pUUID = document.createElement('p');
        pUUID.innerText = nameBook.uuid;
        pUUID.setAttribute('hidden', 'hidden');

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(pUUID);

        textBuku.appendChild(div);
    }

})

function appearRightByDefault() {
    document.querySelectorAll('.right div')[0].removeAttribute('class', 'select');
    document.querySelectorAll('.right div')[0].setAttribute('hidden', 'hidden');

    document.querySelectorAll('.right div')[1].removeAttribute('hidden', 'hidden');
    document.querySelectorAll('.right div')[1].setAttribute('class', 'masukan-buku-baru');

}

function removeAppearRight() {
    document.querySelectorAll('.right div')[0].setAttribute('class', 'select');
    document.querySelectorAll('.right div')[0].removeAttribute('hidden', 'hidden');

    document.querySelectorAll('.right div')[1].setAttribute('hidden', 'hidden');
    document.querySelectorAll('.right div')[1].removeAttribute('class', 'masukan-buku-baru');
}

function appearRightToSet() {
    document.querySelectorAll('.right div')[0].removeAttribute('class', 'select');
    document.querySelectorAll('.right div')[0].setAttribute('hidden', 'hidden');

    document.querySelectorAll('.right div')[4].removeAttribute('hidden', 'hidden');
    document.querySelectorAll('.right div')[4].setAttribute('class', 'masukan-buku-baru');

    if (document.getElementById('plusplus') !== null) disableButtonNewBook();
}

function removeAppearRightSet() {
    document.querySelectorAll('.right div')[0].setAttribute('class', 'select');
    document.querySelectorAll('.right div')[0].removeAttribute('hidden', 'hidden');

    document.querySelectorAll('.right div')[4].setAttribute('hidden', 'hidden');
    document.querySelectorAll('.right div')[4].removeAttribute('class', 'masukan-buku-baru');

    turnButtonNewBookOn();
}

function appearMiddle() {


    const datas = getNameOfBooks();
    for (const data of datas) {
        const parent = document.querySelector('.box-list-of-books');
        const boxBooks = document.createElement('div');
        parent.appendChild(boxBooks);
        boxBooks.setAttribute('class', 'box-books');

        const contentsBook = document.createElement('div');
        contentsBook.setAttribute('class', 'contents-book');
        boxBooks.appendChild(contentsBook);

        const title = document.createElement('h1');
        title.setAttribute('class', 'title');
        contentsBook.appendChild(title);

        const descBook = document.createElement('div');
        descBook.setAttribute('class', 'desc-book');
        contentsBook.appendChild(descBook);

        const year = document.createElement('p');
        year.setAttribute('class', 'year');
        descBook.appendChild(year);

        const author = document.createElement('p');
        author.setAttribute('class', 'author');
        descBook.appendChild(author);

        
        title.innerText = data.title;
        year.innerText = data.year;
        author.innerText = data.author;
    }
}

function removeX() {
    document.getElementById('x').addEventListener('click', () => {
        removeJudulOnLeft();
        removeAppearRight();
        turnButtonNewBookOn();
    })
}

document.querySelector('.sudah-dibaca').addEventListener('click', () => {
    const datas = getNameOfBooks();
    removeMiddle();

    for (const data of datas) {
        if (data.isComplete) {
            const parent = document.querySelector('.box-list-of-books');
            const boxBooks = document.createElement('div');
            parent.appendChild(boxBooks);
            boxBooks.setAttribute('class', 'box-books');

            const contentsBook = document.createElement('div');
            contentsBook.setAttribute('class', 'contents-book');
            boxBooks.appendChild(contentsBook);

            const title = document.createElement('h1');
            title.setAttribute('class', 'title');
            contentsBook.appendChild(title);

            const descBook = document.createElement('div');
            descBook.setAttribute('class', 'desc-book');
            contentsBook.appendChild(descBook);

            const year = document.createElement('p');
            year.setAttribute('class', 'year');
            descBook.appendChild(year);

            const author = document.createElement('p');
            author.setAttribute('class', 'author');
            descBook.appendChild(author);

            title.innerText = data.title;
            year.innerText = data.year;
            author.innerText = data.author;
        }
    }

    clickMiddleToSet();
})

document.querySelector('.belum-dibaca').addEventListener('click', () => {
    const datas = getNameOfBooks();
    removeMiddle();

    for (const data of datas) {
        if (data.isComplete === false) {
            const parent = document.querySelector('.box-list-of-books');
            const boxBooks = document.createElement('div');
            parent.appendChild(boxBooks);
            boxBooks.setAttribute('class', 'box-books');

            const contentsBook = document.createElement('div');
            contentsBook.setAttribute('class', 'contents-book');
            boxBooks.appendChild(contentsBook);

            const title = document.createElement('h1');
            title.setAttribute('class', 'title');
            contentsBook.appendChild(title);

            const descBook = document.createElement('div');
            descBook.setAttribute('class', 'desc-book');
            contentsBook.appendChild(descBook);

            const year = document.createElement('p');
            year.setAttribute('class', 'year');
            descBook.appendChild(year);

            const author = document.createElement('p');
            author.setAttribute('class', 'author');
            descBook.appendChild(author);

            title.innerText = data.title;
            year.innerText = data.year;
            author.innerText = data.author;
        }
    }

    clickMiddleToSet();
})

document.querySelector('.campur').addEventListener('click', () => {
    removeMiddle();
    appearMiddle();
    clickMiddleToSet();
})

function removeMiddle() {
    const books = document.querySelectorAll('.box-books');
    for (const book of books) {
        book.remove();
    }
}


document.querySelector('.search').addEventListener('mouseenter', () => {

    document.querySelector('.logo').setAttribute('hidden', 'hidden');
    document.querySelector('.logo').removeAttribute('class', 'logo');
    document.querySelectorAll('.nav div')[1].removeAttribute('hidden', 'hidden');

})

document.querySelector('.nav').addEventListener('mouseleave', () => {
    document.querySelectorAll('.nav div')[1].setAttribute('hidden', 'hidden');
    document.querySelectorAll('.nav div')[0].setAttribute('class', 'logo');
})

document.getElementById('input-search-text').addEventListener('keyup', () => {
    let searchValue = document.getElementById('input-search-text').value;
    const datas = getNameOfBooks();

    removeMiddle();

    for (const data of datas) {

        let a = data.title.toLowerCase();

        if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
            const parent = document.querySelector('.box-list-of-books');
            const boxBooks = document.createElement('div');
            parent.appendChild(boxBooks);
            boxBooks.setAttribute('class', 'box-books');

            const contentsBook = document.createElement('div');
            contentsBook.setAttribute('class', 'contents-book');
            boxBooks.appendChild(contentsBook);

            const title = document.createElement('h1');
            title.setAttribute('class', 'title');
            contentsBook.appendChild(title);

            const descBook = document.createElement('div');
            descBook.setAttribute('class', 'desc-book');
            contentsBook.appendChild(descBook);

            const year = document.createElement('p');
            year.setAttribute('class', 'year');
            descBook.appendChild(year);

            const author = document.createElement('p');
            author.setAttribute('class', 'author');
            descBook.appendChild(author);

            title.innerText = data.title;
            year.innerText = data.year;
            author.innerText = data.author;


        }
    }

    clickMiddleToSet();    


})

document.querySelectorAll('.kembali')[0].addEventListener('click', () => {
    removeAppearRight();
    removeJudulOnLeft();
});



document.querySelectorAll('.kembali')[1].addEventListener('click', () => {
    removeAppearRightSet();
});


document.querySelector('.hapus').addEventListener('click', () => {
    let temp = [];
    let dataTemp = [];
    let dataEnterToStorage = [];
    temp = JSON.parse(localStorage.getItem(BOOK));
    dataTemp = JSON.parse(saveBookToLocalStorage(true));

    for (let i = 0; i < temp.length; i++) {
        if (getUUIDByName(staticNameMiddle) !== temp[i].uuid) {
            dataEnterToStorage.push(temp[i]);
        }
    }

    localStorage.setItem(BOOK, JSON.stringify(dataEnterToStorage));

    removeAppearRightSet();
    location.reload();
})