import Product from "../models/Product";

export const createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body;

    const product = await Product.create({
        name,
        description,
        price,
        quantity,
        seller: req.user._id,
    });

    res.status(201).json({ product });
};


export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate(
        "seller",
        "name email"
    );

    res.status(200).json({ products });
};

