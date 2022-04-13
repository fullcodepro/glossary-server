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
const { validar_jwt } = require('../middlewares/validar_jwt');
const { validarCampos } = require('../middlewares/validar_campos');
const { check } = require('express-validator');


router.get('/', [
    validar_jwt,
    validarCampos
], getWords);

router.get('/:id', [
    validar_jwt,
    check('id', 'La petición no contiene un identificador válido')
    .isMongoId,
    validarCampos
], getWordById);

router.post('/', [
    validar_jwt,
    validarCampos
], postWord);

router.put('/:id', [
    validar_jwt,
    // check('id', 'La petición no contiene un identificador válido')
    // .isMongoId,
    validarCampos
], putWordById);

router.delete('/:id', [
    validar_jwt,
    validarCampos
], deleteWordById);


module.exports = router;