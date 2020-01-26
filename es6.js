var Book = /** @class */ (function () {
    function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    return Book;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.addBookToList = function (book) {
        var list = document.getElementById('book-list');
        // Create tr element
        var row = document.createElement('tr');
        // Insert cols
        row.innerHTML = "\n        <td>" + book.title + "</td>\n        <td>" + book.author + "</td>\n        <td>" + book.isbn + "</td>\n        <td><a href=\"#\" class=\"delete\">X<a></td>\n      ";
        list.appendChild(row);
    };
    UI.prototype.showAlert = function (message, className) {
        // Create div
        var div = document.createElement('div');
        // Add classes
        div.className = "alert " + className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        var container = document.querySelector('.container');
        // Get form
        var form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);
        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    };
    UI.prototype.deleteBook = function (target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    };
    UI.prototype.clearFields = function () {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
    return UI;
}());
// Local Storage Class
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.getBooks = function () {
        var books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    };
    Store.displayBooks = function () {
        var books = Store.getBooks();
        books.forEach(function (book) {
            var ui = new UI;
            // Add book to UI
            ui.addBookToList(book);
        });
    };
    Store.addBook = function (book) {
        var books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    };
    Store.removeBook = function (isbn) {
        var books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    };
    return Store;
}());
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    var title = document.getElementById('title').value, author = document.getElementById('author').value, isbn = document.getElementById('isbn').value;
    // Instantiate book
    var book = new Book(title, author, isbn);
    // Instantiate UI
    var ui = new UI();
    console.log(ui);
    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        // Add book to list
        ui.addBookToList(book);
        // Add to LS
        Store.addBook(book);
        // Show success
        ui.showAlert('Book Added!', 'success');
        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
});
// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    var ui = new UI();
    // Delete book
    ui.deleteBook(e.target);
    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message
    ui.showAlert('Book Removed!', 'success');
    e.preventDefault();
});
