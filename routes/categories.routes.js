const router = require('express').Router();
const path = require('path');

const {
    getCategories,
    getCategoryById,
    postCategory,
    putCategoryById,
    deleteCategoryById
} = require('../controllers/categories.controllers');


router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.post('/', postCategory);

router.put('/:id', putCategoryById);

router.delete('/:id', deleteCategoryById);


module.exports = router;