export const placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.products"
    );

    if (!cart || cart.item.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
        if (item.quantity > item.quantity.number) {
            return res.status(400).json({
                message: `Insufficient stock for ${item.products.name}`
            });
        }
    }

    for (const item of cart.items) {
        const product = await Product.findById(item.product._id);

        product.quantity -= item.quantity;

        await product.save();

        totalAmount += product.price * item.quantity;

        orderItems.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            seller: product.seller,
        });
    }

    const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        totalAmount,

    });

    cart.items = [];

    await cart.save();

    res.status(201).json({
        message: "Order placed successfully",
        order,
    });
}


export const getMyOrders = async (req, res) => {
    const order = await Order.find({ req: req.user._id }).sort({
        createdAt: -1
    });

    res.status(200).json({
        message: "Orders fetched successfully",
        order,
    });
}

