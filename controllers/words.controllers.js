const Words = require("../models/Words");

const ctrlWords = {};

ctrlWords.getWords = async (req, res) => {
    try {
        const words = await Words.find();

        return res.json(words);
    } catch (error) {
        console.log('Error al obtener las palabras: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlWords.getWordById = async (req, res) => {
    const { id: _id } = req.params;

    if (!id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const words = await Words.findById(_id);

        return res.json(words);
    } catch (error) {
        console.log('Error al obtener la palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlWords.postWord = async (req, res) => {

    const { name, definition, ...otherData } = req.body;

    if (!name || !definition) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const newWord = new Words({ name: name.toLowerCase(), definition });
        const word = await newWord.save();

        return res.json(word);
    } catch (error) {
        console.log('Error al crear palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }

};

ctrlWords.putWordById = async (req, res) => {
    const { name, definition, ...otherData } = req.body;
    const { id: _id } = req.params;
    if (!name || !definition || !_id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const wordUpdated = await Words.findByIdAndUpdate(_id, { name: name.toLowerCase(), definition }, { new: true });

        return res.json(wordUpdated);
    } catch (error) {
        console.log('Error al actualizar palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlWords.deleteWordById = async (req, res) => {
    const { id: _id, ...otherData } = req.body;

    if (!_id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const wordDeleted = await Words.findByIdAndDelete(_id, { new: true });

        return res.json(wordDeleted);
    } catch (error) {
        console.log('Error al actualizar palabra: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};



module.exports = ctrlWords;