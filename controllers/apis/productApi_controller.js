const {Product} = require('../../database/models');
const {User} = require('../../database/models');

const getAllProducts = async (req, res) => {
    try {
        let query = {
            include: [
                { association: "categoria", attributes: ["name"] },
                { association: "images", attributes: ["name"] }
            ],
            order: [["id", "ASC"]],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }

        const products = await Product.findAll(query);
        
        res.status(200).json({
            meta: {
                status: 200,
                total: products.length,
                message: "Los queremos Eric y Juli. Gracias por tanto, perdón por tan poco"
            },
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: 'Error recibiendo los productos', error });
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        let {category} = req.params;
        category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        const products = await Product.findAll({
            order: [["id", "ASC"]],
            include: [
                {
                    association: "categoria",
                    attributes: ["name"],
                    where: { name: category } 
                },
                { 
                    association: "images",
                    attributes: ["name"] 
                }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    message: "No se encontraron productos en esta categoría"
                }
            });
        }

        res.status(200).json(products);


    } catch (error) {
        res.status(500).json({ message: 'Error recibiendo los productos', error });
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: 'El id es requerido' });
        }

        if (isNaN(+id)) {
            return res.status(402).json({ message: 'El id debe ser un número válido' });
        }

        if (id < 1) {
            return res.status(401).json({ message: 'El id debe ser mayor a 0' });
        }

        const product = await Product.findByPk(id, {
            include: [
                { association: "categoria", attributes: ["name"] },
                { association: "images", attributes: ["name"] }
            ]
        });

        if (product.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error recibiendo el producto', error });
    }
}

const getProductByManufacturer = async (req, res) => {
    try {
        const {name} = req.params;
        const product = await Product.findAll({
            where: { name },
            include: [
                { association: "categoria", attributes: ["name"] },
                { association: "images", attributes: ["name"] }
            ]
        });

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error recibiendo el producto', error });
    }
}

const getUser = async (req, res) => {
    try {
        const response = await User.findByPk(req.params.id)
        if (!response) {
            throw new Error('Error en la peticion')
        }

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ message: 'Error cargando usuarios', error})
    }
} 

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.session.usuario?.id; // o req.session.userId, según lo tengas

        if (!userId) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

module.exports = {getAllProducts, getProductsByCategory, getProductById, getProductByManufacturer,getCurrentUser , getUser}