
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require("./book.model");

var db = 'mongodb://localhost/newDb';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.send("<h1>happy to be here </h1>")
})

app.get("/books", async (req, res) => {
    console.log("getting all books");
    Book.find({}).exec(function (err, books) {
        if (err) {
            res.send("error has occured");
        } else {
            console.log(books);
            res.json(books);
        }
    })
})

app.get("book/:id", async (req, res) => {
    console.log("getting one book");
    Book.findOne({
        _id: req.params.id
    })
        .exec((_err, book) => {
            if (Err) {
                res.send("error occured");
            } else {
                console.log(book);
                res.json(book);
            }
        })
})
app.post('/book', async (req, res) => {
    var newBook = new Book();

    newBook.title = req.body.title,
        newBook.author = req.body.author,
        newBook.category = req.body.category

    await newBook.save((err, book) => {
        if (err) {
            res.send("error saving book");
        } else {
            console.log(book);
            res.send(book);
        }
    })
})
app.post("/book2", async (req, res) => {
    await Book.create(req.body, (err, book) => {
        if (err) {
            res.send("error saving book")
        } else {
            console.log(book);
            res.send(book)
        }
    })

})
app.put("/book/:id", async (req, res) => {
    await Book.findOneAndUpdate({
        _id: req.params.id
    },
        { $set: { title: req.body.title } },
        { upsert: true },
        function (err, newBook) {
            if (err) {
                console.log("error occured");
            } else {
                console.log(newBook);
                res.send(newBook);
            }

        }
    )
})

app.delete("/book/:id", async (req, res) => {
    await Book.findOneAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
            res.send("error deleting")
        } else {
            console.log(book);
            res.send(book)
        }
    }

    )
})



port = 8080


// app.get("/", function (req, res) {
//     res.render("<h1>hello buddy ..</h1>");
// });

app.listen(port, function () {
    console.log('app is listening on port ', port);
})