const router = require('express').Router();
const path = require('path');

const {
    getCategory,
    getCategoryById,
    postCategory,
    putCategoryById,
    deleteCategoryById
} = require('../controllers/words.controllers');


router.get('/', getCategory);

router.get('/:id', getCategoryById);

router.post('/', postCategory);

router.put('/:id', putCategoryById);

router.delete('/:id', deleteCategoryById);


module.exports = router;