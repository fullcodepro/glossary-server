const router = require('express').Router();
const path = require('path');
const Visits = require('../models/Visits');


const {
    getWords,
    getWordById,
    postWord,
    putWordById,
    deleteWordById
} = require('../controllers/words.controllers');


router.get('/', getWords);

router.get('/:id', getWordById);

router.post('/', postWord);

router.put('/:id', putWordById);

router.delete('/:id', deleteWordById);


module.exports = router;