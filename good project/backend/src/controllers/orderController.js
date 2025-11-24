import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import { emitNewOrder, emitOrderUpdate } from '../services/socketService.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, phone, specialInstructions } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || !menuItem.available) {
        return res.status(400).json({
          message: `Item ${item.name || menuItem?.name} is not available`
        });
      }

      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      });

      // Update popularity
      menuItem.popularity += item.quantity;
      await menuItem.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      phone,
      specialInstructions
    });

    await order.populate('items.menuItem', 'name image');
    await order.populate('user', 'name email'); // Populate user for notification

    // Notify admins
    emitNewOrder(order);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.menuItem', 'name image')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .populate('items.menuItem', 'name image')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.menuItem', 'name image description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Manually populate to handle deleted references
    await order.populate('user', 'name email').catch(() => { });
    await order.populate('items.menuItem', 'name image').catch(() => { });

    // Notify user only if user reference still exists
    if (order.user && order.user._id) {
      emitOrderUpdate(order.user._id, order);
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

