const CategoryModel = require('../models/categoryModel');

class CategoryController {

    // Lấy danh sách tất cả danh mục
    static async get(req, res) {
        try {
            const categorys = await CategoryModel.findAll();
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách danh mục thành công",
                data: categorys
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy danh mục theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id danh mục không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Tạo danh mục mới
    static async create(req, res) {
        try {
            const newCategory = await CategoryModel.create(req.body);
            res.status(201).json({
                message: "Tạo danh mục mới thành công",
                category: newCategory
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Cập nhật danh mục
    static async update(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id danh mục không tồn tại" });
            }

            await category.update(req.body);

            res.status(200).json({
                message: "Cập nhật danh mục thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Xoá danh mục
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id danh mục không tồn tại" });
            }

            await category.destroy();

            res.status(200).json({ message: "Xoá danh mục thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;
