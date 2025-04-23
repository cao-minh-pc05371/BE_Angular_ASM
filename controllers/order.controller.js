const OrderModel = require('../models/orderModel');
const User = require('../models/usersModel');
const Address = require('../models/addressModel');

class OrderController {
  // Lấy danh sách đơn hàng
  static async get(req, res) {
    try {
      const orders = await OrderModel.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Address, as: 'address' }
        ]
      });
      res.status(200).json({
        message: 'Lấy danh sách đơn hàng thành công',
        data: orders
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lấy đơn hàng theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findByPk(id, {
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
          { model: Address, as: 'address' }
        ]
      });

      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      res.status(200).json({ data: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lấy đơn hàng theo user
  static async getByUser(req, res) {
    const { user_id } = req.params;

    if (parseInt(user_id) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập đơn hàng này.' });
    }

    try {
      const orders = await OrderModel.findAll({
        where: { user_id },
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Address, as: 'address' }
        ]
      });
      res.status(200).json({ message: 'Lấy đơn hàng của bạn thành công', data: orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tạo đơn hàng mới
  static async create(req, res) {
    try {
      const { user_id, address_id, order_date, status, note } = req.body;

      const newOrder = await OrderModel.create({
        user_id,
        address_id,
        order_date,
        status,
        note
      });

      res.status(201).json({
        message: 'Tạo đơn hàng thành công',
        order: newOrder
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cập nhật đơn hàng
  static async update(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      await order.update(req.body);
      res.status(200).json({
        message: 'Cập nhật đơn hàng thành công',
        order
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cập nhật trạng thái đơn hàng sang "shipped"
  static async markAsShipped(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Chỉ có thể cập nhật đơn hàng đang ở trạng thái pending' });
      }

      order.status = 'shipped';
      await order.save();

      res.status(200).json({
        message: 'Cập nhật trạng thái đơn hàng sang \"Đã chuẩn bị hàng\" thành công',
        order
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Xoá đơn hàng
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      await order.destroy();
      res.status(200).json({ message: 'Xoá đơn hàng thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
