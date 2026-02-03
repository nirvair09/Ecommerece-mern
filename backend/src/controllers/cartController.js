import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        cart = await Cart.create({ user: userId });
    }
    return cart;
};


export const getCart = async (req, res) => {

    const cart = await getOrCreateCart(req.user_id);
    await cart.populate("items.product");
    res.json(cart);
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    const cart = await getOrCreateCart(req.user._id);

    const itemIndex = cart.items.findIndex(
        (i) => i.product.toString() === productId
    );

    if (itemIndex > -1) {
        const newQty = cart.items[itemIndex].quantity + quantity;
        if (newQty > product.quantity) {
            return res.status(400).json({ message: "Stock exceeded" });
        }
        cart.items[itemIndex].quantity = newQty;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
};


export const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Product.findById(productId);

    if (!product || quantity > product.quantity) {
        return res.status(400).json({ message: "Invalid Stock" });
    }

    const cart = await getOrCreateCart(req.user_id);

    const itemIndex = cart.items.findIndex(
        (i) => i.product.toString() === productId
    );

    if (!itemIndex) {
        return res.status(400).json({ message: "Item not in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user_id);

    cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
};