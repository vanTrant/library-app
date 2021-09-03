// TODO :
// 1. Add edit functionality
// 2. Implement local storage
// Optional: Implement cloud storage (google login)
// 3. Add media query for small device and large monitor

const addBookBtn = document.querySelector('.btn-add');
let myLibrary = [];

addBookBtn.addEventListener('click', showFormPopup);

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

function renderBook(book) {
    const app = document.getElementById('app');
    const div = document.createElement('div');

    div.classList.add('book-card');
    div.innerHTML = `
        <div class="book">
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
        </div>
        <div class="book-information">
            <p>Total pages : ${book.totalPages}</p>
            <p>Pages read : ${book.pagesRead}</p>
            <p>Read status : ${book.readStatus}</p>
            <div class="book-information-btn">
                <button class="btn btn-edit">Edit Book</button>
                <button class="btn btn-remove">Remove Book</button>
            </div>
        </div>
    `;
    app.appendChild(div);

    const bookTitle = document.querySelectorAll('.book-title');
    // Remove book
    removeBook();
}

function removeBook() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-remove')) {
            const thisTitle = getThisTitle(e.target);

            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].title === thisTitle) {
                    myLibrary.splice(1, 1);
                    // At this point, the loop keep iterating and I don't know why. But the splice is working as i want it to be
                    // Things that i have tried to prevent this (which isn't working) are:
                    // Using break statement
                    // Create a new variable to store boolean with initial value of false and set it to true after the if statement condition is met else break
                }
            }

            e.target.parentNode.parentNode.parentNode.remove();
        }
    });
}

function getThisTitle(element) {
    const parent = element.parentNode.parentNode.parentNode;
    const childBook = parent.querySelector('.book-title');
    return childBook.textContent;
}

function showFormPopup() {
    const body = document.querySelector('body');
    const section = document.createElement('section');
    section.classList.add('popup');
    section.innerHTML = `
        <div class="popup-content popup-add-book">
            <button class="btn-close">x</button>
            <form class="add-book-form">
                <h2>Add new book</h2>
                <div>
                    <p><label for="get-title">Title</label></p>
                    <input type="text" id="get-title" required />
                </div>
                <div>
                    <p><label for="get-author">Author</label></p>
                    <input type="text" id="get-author" required />
                </div>
                <div>
                    <p><label for="get-total-pages">Total Pages</label></p>
                    <input type="number" id="get-total-pages" required />
                </div>
                <div>
                    <p><label for="get-pages-read">Pages Read</label></p>
                    <input type="number" id="get-pages-read" required />
                </div>
                <div>
                    <p><label for="get-read-status">Read Status</label></p>
                    <select id="get-read-status">
                        <option value="Completed">Completed</option>
                        <option value="Not completed yet">Not completed yet</option>
                    </select>
                </div>
                <div>
                    <button class="btn-add-popup" type="submit" />Add Book</button>
                </div>
            </form>
        </div>
    `;
    body.appendChild(section);

    const closeBtn = document.querySelector('.btn-close');
    const form = document.querySelector('.add-book-form');

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

        // Add new book
        const book = new Book(title, author, totalPages, pagesRead, readStatus);
        myLibrary.push(book);
        renderBook(book);

        // Remove the form popup
        section.remove();
    });
}
