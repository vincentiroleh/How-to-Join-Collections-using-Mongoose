const router = require('express').Router();
const db = require('../models');

// Home route. Currently just to make sure app is running returns hello message.
router.get("/", (req, res) => {
    res.send("Hello from demo app!");
});

// Route to get all products
router.get("/products", (req, res) => {
    db.Product.find({})
        .then((dbProducts) => {
            res.json(dbProducts);
        }).catch(err => res.json(err));
});

// Route to get all reviews
router.get("/reviews", (req, res) => {
    db.Review.find({})
        .then(function (dbReviews) {
            res.json(dbReviews);
        })
        .catch(function (err) {
            res.json(err);
        })
});


// Route for creating a new Product
router.post("/product", (req, res) => {
    db.Product.create(req.body)
        .then(function (dbProduct) {
            // If we were able to successfully create a Product, send it back to the client
            res.json(dbProduct);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


// Route for creating a new Review and updating Product "review" field with it
router.post("/product/:id", (req, res) => {
    // Create a new note and pass the req.body to the entry
    db.Review.create(req.body)
        .then((dbReview) => {
            // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
            // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Product.findOneAndUpdate({ _id: req.params.id },
                { review: dbReview._id }, { new: true });
        })
        .then((dbProduct) => {
            // If we were able to successfully update a Product, send it back to the client 
            res.json(dbProduct);
        })
        .catch((err) => { res.json(err) });
});


// Route for retrieving a Product by id and populating it's Review.
router.get("/products/:id", (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Product.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("review")
        .then((dbProduct) => {
            // If we were able to successfully find an Product with the given id, send it back to the client
            res.json(dbProduct);
        })
        .catch(err => res.json(err));

})

module.exports = router;