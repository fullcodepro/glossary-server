const Words = require("../models/Words");
const Categories = require('../models/Cateogries');
const Users = require('../models/Users');
const ctrlWords = {};

ctrlWords.getWords = async (req, res) => {
    try {
        const words = await Words.find()
            .populate('categoryId')
            .populate('createdFor', ['firstName', 'lastName'])
            .sort({ wordName: 1 });

        return res.json(words);
    } catch (error) {
        console.log('Error al obtener las palabras: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlWords.getWordById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const words = await Words.findById(id);

        return res.json(words);
    } catch (error) {
        console.log('Error al obtener la palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlWords.postWord = async (req, res) => {

    const { wordName, definition, categoryId, ...otherData } = req.body;

    if (!wordName || !definition || !categoryId) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const data = {
            wordName: wordName.toLowerCase(),
            definition, categoryId,
            date: new Date(),
            createdFor: req.user._id,
            modifiedFor: req.user._id
        }
        const newWord = new Words(data);
        const word = await newWord.save()

        const result = await Words.findById(word._id)
            .populate('categoryId')
            .populate('createdFor')
            .sort({ wordName: 1 });

        return res.status(201).json({
            msg: 'Item agregado satisfactoriamente.',
            word: result
        });
    } catch (error) {
        console.log('Error al crear palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }

};

ctrlWords.putWordById = async (req, res) => {
    const { wordName, definition, categoryId, ...otherData } = req.body;
    const { id } = req.params;
    if (!wordName || !definition || !id || !categoryId) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        toUpdateWord = {
            wordName: wordName.toLowerCase(),
            definition,
            categoryId: [categoryId],
            modifiedFor: req.user._id
        }
        const wordUpdated = await Words.findByIdAndUpdate(id, toUpdateWord, { new: true })
            .populate('categoryId')
            .populate('createdFor')
            .sort({ wordName: 1 });

        return res.status(200).json({
            msg: 'Item actualizado con éxito',
            wordUpdated
        });
    } catch (error) {
        console.log('Error al actualizar palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

// TODO: Reemplazar eliminación física por lógica (ej: { active: false })
ctrlWords.deleteWordById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const wordToDelete = await Words.findById(id);
        if (!wordToDelete) return res.status(400).json({
            msg: 'El item que desea eliminar no existe'
        });
    } catch (error) {
        console.log('Error el intentar eliminar un item: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }

    try {
        const deletedWorld = await Words.findByIdAndDelete(id);

        return res.json({
            msg: 'Item eliminado con éxito.',
            deletedWorld
        });
    } catch (error) {
        console.log('Error al eliminar palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};



module.exports = ctrlWords;