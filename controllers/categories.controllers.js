const Categories = require('../models/Cateogries');
const ctrlCategories = {};

ctrlCategories.getCategories = async (req, res) => {
    try {
        const categories = await Categories.find().sort({ name: 1 });

        return res.json(categories);
    } catch (error) {
        console.log('Error al obtener las palabras: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlCategories.getCategoryById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const category = await Categories.findById(id);

        return res.json(category);
    } catch (error) {
        console.log('Error al obtener la categoría: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlCategories.postCategory = async (req, res) => {
    const { name, ...otherData } = req.body;

    if (!name) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        const newCategory = new Categories({ name: name.toLowerCase() });
        const category = await newCategory.save();

        return res.status(201).json({
            msg: 'Categoría agregada satisfactoriamente.',
            category
        });
    } catch (error) {
        console.log('Error al crear categoría: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlCategories.putCategoryById = async (req, res) => {
    const { name, ...otherData } = req.body;
    const { id } = req.params;
    if (!name || !id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        await Categories.findByIdAndUpdate(id, { name: name.toLowerCase() });

        return res.status(200).json({
            msg: 'Categoría actualizada con éxito'
        });
    } catch (error) {
        console.log('Error al actualizar categoría: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};

ctrlCategories.deleteCategoryById = async (req, res) => {
    const { id, ...otherData } = req.params;

    if (!id) return res.status(400).json({
        msg: 'Todos los campos son necesarios'
    });

    try {
        await Categories.findByIdAndDelete(id);

        return res.json({
            msg: 'Categoría eliminada con éxito.'
        });
    } catch (error) {
        console.log('Error al eliminar categoría: ', error);
        return res.status(500).json({
            msg: 'Error internal server'
        })
    }
};



module.exports = ctrlCategories;