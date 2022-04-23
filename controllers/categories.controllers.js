const Categories = require('../models/Cateogries');
const ctrlCategories = {};

ctrlCategories.getCategories = async (req, res) => {
    try {
        const entries = await Categories.find({}).sort({ name: 1 });

        return res.json({entries});
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

    const categoryExist = await Categories.findOne({ name: name.toLowerCase() });

    if(categoryExist){
        return res.status(400).json({
            error: {
                message: 'La categoría ya existe',
            }
        })
    }

    try {
        const newCategory = new Categories({ name: name.toLowerCase() });
        const entry = await newCategory.save();

        return res.status(201).json({
            message: 'Categoría agregada satisfactoriamente.',
            entry
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
        error: {
            message: 'Todos los campos son necesarios'
        }
    });

    try {
        await Categories.findByIdAndUpdate(id, { name: name.toLowerCase() });

        return res.status(200).json({
            message: 'Categoría actualizada con éxito'
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
        error:{
            message: 'Todos los campos son necesarios'
        }
    });

    try {
        const toDelete = await Categories.findById(id);
        if(!toDelete) {
            return res.status(403).json({
                error: {message: 'El ítem no existe o fue eliminado'}
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {message: 'Error internal server'}
        })
    }

    try {
        await Categories.findByIdAndDelete(id);

        return res.json({
            message: 'Categoría eliminada con éxito.'
        });
    } catch (error) {
        console.log('Error al eliminar categoría: ', error);
        return res.status(500).json({
            error:{
                message: 'Error internal server'
            }
        })
    }
};



module.exports = ctrlCategories;