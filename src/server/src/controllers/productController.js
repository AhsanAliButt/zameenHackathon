const ProductModel = require("../models/product");

const ProductsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json({
        status: "Status Success",
        message: "Products found",
        products: products,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, description, stock, price, category, imageUrl } = req.body;
      if (!name || !description || !price || !category || !imageUrl || !stock) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        const product = new ProductModel({
          user: req.user._id,
          name: name,
          description: description,
          price: price,
          category: category,
          imageUrl: imageUrl,
          createdAt: Date.now(),
          stock: stock,
        });
        await product.save();
        res.status(200).json({
          status: "Status Success",
          message: "Product created",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category, imageUrl } = req.body;
      console.log("NAME", name);
      // update only provided fields
      if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
          return res.status(400).json({
            status: "Status Failed",
            message: "Product not found",
          });
        } else {
          product.name = name;
          product.description = description;
          product.price = price;
          product.category = category;
          product.imageUrl = imageUrl;
          await product.save();
          res.status(200).json({
            status: "Status Success",
            message: "Product updated",
            product: product,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          deletedProduct: product,
        });
        await product.remove();
        res.status(200).json({
          status: "Status Success",
          message: "Product deleted",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByName: async (req, res) => {
    try {
      const product = await ProductModel.find({ name: req.params.name });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByCategory: async (req, res) => {
    try {
      const product = await ProductModel.find({
        category: req.params.category,
      });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductBySearch: async (req, res) => {
    try {
      const product = await ProductModel.find({
        $text: { $search: req.params.search },
      });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByPrice: async (req, res) => {
    try {
      const product = await ProductModel.find({
        price: { $gte: req.params.price },
      });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
};

module.exports = ProductsController;
