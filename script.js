// TODO :
// Optional: Implement cloud storage (google login)

// Local Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static editBook(thisTitle, title, author, totalPages, pagesRead, readStatus) {
        const books = Store.getBooks();
        if (!books.some((book) => book.title === thisTitle)) {
            books.forEach((book) => {
                if (book.title === thisTitle) {
                    book.title = title.value;
                    book.author = author.value;
                    book.totalPages = totalPages.value;
                    book.pagesRead = pagesRead.value;
                    book.readStatus = readStatus.value;
                }
            });
        } else return alert('title already exist');
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

const addBookBtn = document.querySelector('.btn-add');
let myLibrary = Store.getBooks();

myLibrary.forEach((book) => renderBook(book));
addBookBtn.addEventListener('click', showAddBookPopup);

// Button animation
addBookBtn.addEventListener('mouseenter', () => {
    document.querySelector('.text').classList.add('hover');
});

addBookBtn.addEventListener('mouseleave', () => {
    document.querySelector('.text').classList.remove('hover');
});

function Book(title, author, totalPages, pagesRead, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.pagesRead = pagesRead;
    this.readStatus = readStatus;
    this.info = function () {
        return `${title} by ${author}. ${totalPages} pages. ${read}.`;
    };
}

Book.prototype.edit = editBook();
Book.prototype.remove = removeBook();

function renderBook(book) {
    const app = document.getElementById('app');
    const div = document.createElement('div');

    div.classList.add('book-card');
    div.innerHTML = `
        <div class="book">
            <p class="book-title" data-title>${book.title}</p>
            <p class="book-author" data-author>${book.author}</p>
        </div>
        <div class="book-information">
            <p>Total pages : <span data-total-pages>${book.totalPages}</span></p>
            <p>Pages read : <span data-pages-read>${book.pagesRead}</span></p>
            <p>Read status : <span data-read-status>${book.readStatus}</span></p>
            <div class="book-information-btn">
                <button class="btn btn-edit">Edit Book</button>
                <button class="btn btn-remove">Remove Book</button>
            </div>
        </div>
    `;
    app.appendChild(div);
}

function removeBook() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-remove')) {
            for (let i = 0; i < myLibrary.length; i++) {
                const thisTitle = getThisValue(e.target, 'title').textContent;

                if (myLibrary[i].title === thisTitle) {
                    myLibrary.splice(i, 1);
                    Store.removeBook(thisTitle);
                }
            }
            e.target.parentNode.parentNode.parentNode.remove();
        }
    });
}

function editBook() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-edit')) {
            const thisTitle = getThisValue(e.target, 'title').textContent;
            const thisAuthor = getThisValue(e.target, 'author').textContent;
            const thisTotalPages = getThisValue(e.target, 'total-pages').textContent;
            const thisPagesRead = getThisValue(e.target, 'pages-read').textContent;
            const thisReadStatus = getThisValue(e.target, 'read-status').textContent;
            showEditBookPopup(e.target, thisTitle, thisAuthor, thisTotalPages, thisPagesRead, thisReadStatus);
        }
    });
}

function getThisValue(element, props) {
    const parent = element.parentNode.parentNode.parentNode;
    return parent.querySelector(`[data-${props}]`);
}

function showAddBookPopup() {
    const body = document.querySelector('body');
    const section = document.createElement('section');
    const formTitle = document.createElement('h2');

    section.classList.add('popup');
    section.innerHTML = getPopupComponent();
    body.appendChild(section);

    const closeBtn = document.querySelector('.btn-close');
    const form = document.querySelector('.add-book-form');
    const addBtn = document.querySelector('.btn-add-popup');

    addBtn.textContent = 'Add Book';
    formTitle.textContent = 'Add New Book';
    form.prepend(formTitle);

    closeBtn.addEventListener('click', () => section.remove());
    form.addEventListener('submit', (e) => {
        // Prevent default submit event which automatically reloading the page
        e.preventDefault();

        // Get the input value
        const title = document.getElementById('get-title').value;
        const author = document.getElementById('get-author').value;
        const totalPages = document.getElementById('get-total-pages').value;
        const pagesRead = document.getElementById('get-pages-read').value;
        const readStatus = document.getElementById('get-read-status').value;

        if (!myLibrary.some((book) => book.title === title)) {
            console.log('title available');
            // Add new book
            const book = new Book(title, author, totalPages, pagesRead, readStatus);

            myLibrary.push(book);
            Store.addBook(book);
            renderBook(book);
        } else return alert('Title already exist');

        // Remove the form popup
        section.remove();
    });
}

function showEditBookPopup(targetEvent, thisTitle, thisAuthor, thisTotalPages, thisPagesRead, thisReadStatus) {
    const body = document.querySelector('body');
    const section = document.createElement('section');
    const formTitle = document.createElement('h2');

    section.classList.add('popup');
    section.innerHTML = getPopupComponent();
    body.appendChild(section);

    const closeBtn = document.querySelector('.btn-close');
    const form = document.querySelector('.add-book-form');
    const addBtn = document.querySelector('.btn-add-popup');

    addBtn.textContent = 'Save';
    formTitle.textContent = 'Edit Book';
    form.prepend(formTitle);

    const title = document.getElementById('get-title');
    const author = document.getElementById('get-author');
    const totalPages = document.getElementById('get-total-pages');
    const pagesRead = document.getElementById('get-pages-read');
    const readStatus = document.getElementById('get-read-status');

    title.value = thisTitle;
    author.value = thisAuthor;
    totalPages.value = thisTotalPages;
    pagesRead.value = thisPagesRead;
    readStatus.value = thisReadStatus;

    closeBtn.addEventListener('click', () => section.remove());
    form.addEventListener('submit', (e) => {
        // Prevent default submit event which automatically reloading the page
        e.preventDefault();

        // Update this book key value
        Store.editBook(thisTitle, title, author, totalPages, pagesRead, readStatus);

        // Update the UI
        const books = Store.getBooks();
        if (!books.some((book) => book.title === thisTitle)) {
            getThisValue(targetEvent, 'title').textContent = title.value;
            getThisValue(targetEvent, 'author').textContent = author.value;
            getThisValue(targetEvent, 'total-pages').textContent = totalPages.value;
            getThisValue(targetEvent, 'pages-read').textContent = pagesRead.value;
            getThisValue(targetEvent, 'read-status').textContent = readStatus.value;
        }
        // Remove the form popup
        section.remove();
    });
}

function getPopupComponent() {
    return `
    <div class="popup-content popup-add-book">
        <button class="btn-close">x</button>
        <form class="add-book-form">
            <div class="input-container">
                <input type="text" id="get-title" autocomplete="off" placeholder=" " required />
                <label for="get-title" class="label-input"><span class="span-text">Title</span></label>
            </div>
            <div class="input-container">
                <input type="text" id="get-author" autocomplete="off" placeholder=" " required />
                <label for="get-author" class="label-input"><span class="span-text">Author</span></label>
            </div>
            <div class="input-container">
                <input type="number" id="get-total-pages" autocomplete="off" placeholder=" " required />
                <label for="get-total-pages" class="label-input"><span class="span-text">Total Pages</span></label>
            </div>
            <div class="input-container">
                <input type="number" id="get-pages-read" autocomplete="off" placeholder=" " required />
                <label for="get-pages-read" class="label-input"><span class="span-text">Pages Read</span></label>
            </div>
            <div class="input-container">
                <p><label for="get-read-status">Read Status</label></p>
                <select id="get-read-status">
                    <option value="Completed">Completed</option>
                    <option value="Not completed yet">Not completed yet</option>
                </select>
            </div>
            <div>
                <button class="btn-add-popup" type="submit" /></button>
            </div>
        </form>
    </div>
    `;
}
