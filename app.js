// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() {
}
// Add Book To List
UI.prototype.addBookToList = function (book) {
    var list = document.getElementById('book-list');
    // Create tr element
    var row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = "\n    <td>" + book.title + "</td>\n    <td>" + book.author + "</td> \n    <td>" + book.isbn + "</td>\n    <td><a href=\"#\" class=\"delete\">X<a></td>\n    ";
    list.appendChild(row);
};
// Show Alert
UI.prototype.showAlert = function (message, className) {
    // Create div
    var div = document.createElement('div');
    // Add classes
    div.className = "alert " + className;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    var container = document.querySelector('.container');
    // Get Form
    var form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);
    // Clear After three seconds
    setTimeout(function () {
        document.querySelector('.alert')
            .remove();
    }, 3000);
};
// Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};
// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};
// Event Listeners For Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
    //Get Form Values
    var title = document.getElementById('title').value, author = document.getElementById('author').value, isbn = document.getElementById('isbn').value;
    // Instantiate Book
    var book = new Book(title, author, isbn);
    // Instantiate UI
    var ui = new UI();
    // Validate
    if (title === '' || author === '' || isbn === '') {
        //Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        // Add Book To List
        ui.addBookToList(book);
        // Show success
        ui.showAlert('Book Added', 'success');
        // Clear fields 
        ui.clearFields();
    }
    e.preventDefault();
});
// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    var ui = new UI();
    // Delete Book
    ui.deleteBook(e.target);
    //Show Message
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});
