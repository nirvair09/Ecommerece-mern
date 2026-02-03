import Cart from "../models/Cart";

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        cart = await Cart.create({ user: userId });
    }
    return cart;
};


export const getCart = async (req, res) => {
    const { userId } = req.params || req.body;
    const cart = await getOrCreateCart(userId);
    res.status(200).json(cart);
};




