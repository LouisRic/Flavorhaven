// Ambil semua best menu
exports.getBestMenus = async (req, res) => {
  try {
    const bestMenus = await Menu.find({ isBestMenu: true });
    res.json(bestMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ambil semua menu promo
exports.getPromoMenus = async (req, res) => {
  try {
    const promoMenus = await Menu.find({ isPromo: true });
    res.json(promoMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ambil semua food menu
exports.getFoodMenus = async (req, res) => {
  try {
    const foodMenus = await Menu.find({ category: 'food' });
    res.json(foodMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ambil semua drink menu
exports.getDrinkMenus = async (req, res) => {
  try {
    const drinkMenus = await Menu.find({ category: 'drink' });
    res.json(drinkMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const Menu = require("../models/Menu");

// Ambil semua menu
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah menu baru

exports.createMenu = async (req, res) => {
  try {
    const { name, desc, img, price, category, isPromo, discountPercentage, promoDesc, isBestMenu } = req.body;
    const menu = new Menu({
      name,
      desc,
      img,
      price,
      category,
      isPromo: isPromo || false,
      discountPercentage: discountPercentage || 0,
      promoDesc: promoDesc || '',
      isBestMenu: isBestMenu || false,
    });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update menu

exports.updateMenu = async (req, res) => {
  try {
    const updateFields = {};
    const allowedFields = [
      "name",
      "desc",
      "img",
      "price",
      "isPromo",
      "discountPercentage",
      "isBestMenu",
      "category",
      "promoDesc"
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });
    const menu = await Menu.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });
    if (!menu) return res.status(404).json({ error: "Menu not found" });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hapus menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: "Menu not found" });
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
