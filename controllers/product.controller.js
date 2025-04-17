const ProductModel = require('../models/productsModel');
const CategoryModel = require('../models/categoryModel');
const BrandModel = require('../models/brandsModel');

class ProductController {

  // Lấy tất cả sản phẩm
  static async get(req, res) {
    try {
      const products = await ProductModel.findAll({
        include: [
          { model: CategoryModel, as: 'category', attributes: ['id', 'name'] },
          { model: BrandModel, as: 'brand', attributes: ['id', 'name', 'logo'] },
        ]
      });

      res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công',
        data: products
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lấy sản phẩm theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id, {
        include: [
          { model: CategoryModel, as: 'category', attributes: ['id', 'name'] },
          { model: BrandModel, as: 'brand', attributes: ['id', 'name', 'logo'] },
        ]
      });

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Thêm sản phẩm mới
  static async add(req, res) {
    try {
      const { image, ...rest } = req.body; // image là tên file hoặc URL

      const product = await ProductModel.create({
        ...rest,
        image
      });

      res.status(201).json({
        message: 'Thêm sản phẩm thành công',
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cập nhật sản phẩm
  static async update(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      const { image, ...rest } = req.body;

      await product.update({
        ...rest,
        image: image || product.image // Nếu không truyền mới thì giữ nguyên
      });

      res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Xóa sản phẩm
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      await product.destroy();
      res.status(200).json({ message: 'Xoá sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;