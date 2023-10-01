function deleteBook(id) {
    const confirmation = confirm("Are you sure you want to delete this book?");
    if (!confirmation) {
        return;
    }

    fetch(`/books/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Book deleted successfully');
            window.location.href = '/books';
        })
        .catch(error => {
            console.error('Error deleting book:', error);
        });
}

function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.showModal();
    }
}

function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.close();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersButton = document.getElementById('applyFilters');
    applyFiltersButton.addEventListener('click', applyFilters);
});

function applyFilters() {
    const availableCheckbox = document.querySelector('input[name="available"]');
    const overdueCheckbox = document.querySelector('input[name="overdue"]');

    const filters = {
        available: availableCheckbox.checked,
        overdue: overdueCheckbox.checked,
    };

    fetch('/books/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    })
        .then(response => response.json())
        .then(data => {

            const bookGrid = document.querySelector('.book-grid');
            bookGrid.innerHTML = '';

            data.books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');

                const img = document.createElement('img');
                img.src = book.imageURL;
                img.alt = book.title;

                const title = document.createElement('h4');
                const titleLink = document.createElement('a');
                titleLink.href = `/books/${book.id}`;
                titleLink.textContent = book.title;
                title.appendChild(titleLink);

                const author = document.createElement('p');
                author.textContent = book.author;

                bookItem.appendChild(img);
                bookItem.appendChild(title);
                bookItem.appendChild(author);

                bookGrid.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error:', error));
}
