var express = require('express');
var router = express.Router();
var Product = require('./../db/models/product');

/**
 * Home page: loading all product
 */
router.get('/', (req, res) => {
    Product.find({})
        .then(products => {
            res.send(products);
            // res.render('home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            res.status(500).send(err);
            throw err;
        })
});

/**
 * Go to Add Product page
 */
router.get('/add-product', (req, res) => {
    // res.render('add-product');
});

/**
 * Add new Product
 */
router.post('/', (req, res) => {
    let newProduct = new Product({
        name: req.body.productName,
        type: req.body.productType
    });

    newProduct.save()
        .then(doc => {
            res.send(doc);
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send(err);
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Update Product page
 */
router.get('/update-product/:productId', async (req, res) => {
    try {
        let product = await Product.findById(req.params.productId).exec();
        res.send(product);
        // res.render('update-product', { product: product });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Delete product
 */
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

/**
 * Update product
 */
router.post('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/')
        })
});

module.exports = router;