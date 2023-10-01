const express = require('express');
const router = express.Router();

module.exports = (libraryData) => {


    router.get('/add', function(req, res, next) {
        res.render('addBook');
    });

    router.post('/add', (req, res) => {
        const { title, author, releaseDate, imageURL } = req.body;

        const usedIds = libraryData.books.map(book => book.id);
        const newBookId = Array.from({ length: usedIds.length + 2 }, (_, i) => i + 1).find(id => !usedIds.includes(id));

        const newBook = {
            id: newBookId,
            title,
            author,
            releaseDate,
            imageURL,
            isAvailable: true,
            borrower: null,
            returnDate: null,
        };

        libraryData.books.push(newBook);

        res.redirect(`/books`);
    });


    router.delete('/:id', (req, res) => {
        const bookId = parseInt(req.params.id);
        const bookIndex = libraryData.books.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            libraryData.books.splice(bookIndex, 1);
            res.sendStatus(204); // Отправляем ответ с кодом 204
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    });

    router.get('/', (req, res) => {
        res.render('books', { books: libraryData.books });
    });

    router.get('/:id', (req, res) => {
        const bookId = parseInt(req.params.id);
        const book = libraryData.books.find(book => book.id === bookId);
        res.render('bookCard', { book });
    });

    router.get('/edit/:id', (req, res) => {
        const bookId = parseInt(req.params.id);
        const book = libraryData.books.find(book => book.id === bookId);
        res.render('editBook', { book });
    });

    router.post('/edit/:id', (req, res) => {
        const bookId = parseInt(req.params.id);
        const book = libraryData.books.find(book => book.id === bookId);

        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;

        res.redirect(`/books/${book.id}`);
    });


    router.post('/:id/issue', (req, res) => {
        const bookId = parseInt(req.params.id);
        const book = libraryData.books.find(book => book.id === bookId);

        book.isAvailable = false;
        book.borrower = req.body.borrower;
        book.returnDate = req.body.returnDate;

        const borrowerName = req.body.borrower;
        const returnDate = req.body.returnDate;

        const borrowerIndex = libraryData.borrowers.findIndex(reader => reader.name === borrowerName);

        if (borrowerIndex === -1) {
            libraryData.borrowers.push({ name: borrowerName, books: [{ id: bookId, title: book.title, returnDate }] });
        } else {
            libraryData.borrowers[borrowerIndex].books.push({ id: bookId, title: book.title, returnDate });
        }

        res.redirect(`/books/${book.id}`);
    });



    router.post('/:id/return', (req, res) => {
        const bookId = parseInt(req.params.id);

        const book = libraryData.books.find(book => book.id === bookId);

        if (book) {
            const borrower = book.borrower;

            if (borrower) {
                const borrowerIndex = libraryData.borrowers.findIndex(reader => reader.name === borrower);

                if (borrowerIndex !== -1) {
                    libraryData.borrowers[borrowerIndex].books = libraryData.borrowers[borrowerIndex].books.filter(book => book.id !== bookId);
                    if (libraryData.borrowers[borrowerIndex].books.length === 0) {
                        libraryData.borrowers.splice(borrowerIndex, 1);
                    }
                }

                book.borrower = null;
                book.returnDate = null;
                book.isAvailable = true;

                res.redirect(`/books/${bookId}`);
            } else {
                res.status(400).json({ message: 'Book is not borrowed' });
            }
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    });


    return router;
};
