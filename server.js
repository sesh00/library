const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/books');
const readerRouter = require('./routes/readers');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const libraryData = require('./data/library.json');

app.use('/books', bookRouter(libraryData));
app.use('/readers', readerRouter(libraryData));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('layout');
});
app.listen(3000, () => console.log('Server is running on port 3000'));
