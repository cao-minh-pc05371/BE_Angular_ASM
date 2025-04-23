const PaymentModel = require('../models/paymentModel');
const OrderModel = require('../models/orderModel');

class PaymentController {

    // Lấy danh sách tất cả giao dịch (chỉ admin)
    static async get(req, res) {
        try {
            const payments = await PaymentModel.findAll({
                include: [{ model: OrderModel, as: 'order' }]
            });
            res.status(200).json({
                message: 'Lấy danh sách thanh toán thành công',
                data: payments
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy thanh toán theo order_id (chỉ admin hoặc chủ đơn hàng)
    static async getByOrder(req, res) {
        try {
            const { order_id } = req.params;

            const order = await OrderModel.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
            }

            if (req.user.id !== order.user_id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Bạn không có quyền xem thanh toán đơn hàng này' });
            }

            const payment = await PaymentModel.findOne({ where: { order_id } });
            if (!payment) {
                return res.status(404).json({ message: 'Không tìm thấy thông tin thanh toán' });
            }

            res.status(200).json({ data: payment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Tạo thanh toán mới
    static async add(req, res) {
        try {
            const { order_id, amount, payment_method, status } = req.body;

            const order = await OrderModel.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
            }

            const existing = await PaymentModel.findOne({ where: { order_id } });
            if (existing) {
                return res.status(400).json({ message: 'Đơn hàng đã có thanh toán' });
            }

            const newPayment = await PaymentModel.create({
                order_id,
                amount,
                payment_method,
                status
            });

            res.status(201).json({
                message: 'Tạo thanh toán thành công',
                payment: newPayment
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Cập nhật thanh toán
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payment = await PaymentModel.findByPk(id);
            if (!payment) {
                return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
            }

            await payment.update(req.body);
            res.status(200).json({
                message: 'Cập nhật thanh toán thành công',
                payment
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Xoá thanh toán
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const payment = await PaymentModel.findByPk(id);
            if (!payment) {
                return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
            }

            await payment.destroy();
            res.status(200).json({ message: 'Xoá thanh toán thành công' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PaymentController;
