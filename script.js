//DOM Elements
const bookList = document.getElementById("box-list");
const newBookButton = document.getElementById("new-book-button");
const dialog = document.getElementById("new-book-pop");
const addButton = document.getElementById("add-book-button");

//Form Input Elements
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Add info method to Book prototype
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "has been read." : "not read yet."}`;
}

//Add toggleRead method to Book prototype
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

//Initial Array
let books = [
    new Book("The Hobbit", "J.R.R. Tolkien", "295", false),
    new Book("1984", "George Orwell", "328", true),
    new Book("To Kill a Mockingbird", "Harper Lee", "281", false),
    new Book("Pride and Prejudice", "Jane Austen", "432", true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", false)
];

// Function to update the book list
function updateBookList() {
    bookList.innerHTML = ""; // Clear the current list
    books.forEach((book, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${book.info()} 
            <button class="delete-button" data-index="${index}">Delete</button>
            <button class="toggle-read-button" data-index="${index}">${book.read ? "Mark as Unread" : "Mark as Read"}</button>`;
        bookList.appendChild(li);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            books.splice(index, 1);
            updateBookList();
        });
    });

    // Add event listeners to toggle-read buttons
    const toggleReadButtons = document.querySelectorAll(".toggle-read-button");
    toggleReadButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            books[index].toggleRead();
            updateBookList();
        });
    });
}

// Initial update of the book list
updateBookList();

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

addButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    let title = titleInput.value.trim();
    let author = authorInput.value.trim();
    let pages = pagesInput.value.trim();
    let read = readInput.checked;

    if (title && author && pages) { // Ensure inputs are not empty
        let book = new Book(title, author, pages, read);
        books.push(book);
        updateBookList();
        dialog.close();
    } else {
        alert("Please fill in all required fields.");
    }
});
