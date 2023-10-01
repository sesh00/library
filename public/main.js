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
            // Убираем обработку JSON-ответа, так как сервер отправляет пустой ответ
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