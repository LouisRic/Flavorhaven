const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');


// Ambil semua menu
router.get('/', menuController.getMenus);
// Ambil semua best menu
router.get('/best', menuController.getBestMenus);
// Ambil semua menu promo
router.get('/promo', menuController.getPromoMenus);
// Ambil semua food menu
router.get('/food', menuController.getFoodMenus);
// Ambil semua drink menu
router.get('/drink', menuController.getDrinkMenus);
// Tambah menu baru
router.post('/', menuController.createMenu);
// Update menu
router.put('/:id', menuController.updateMenu);
// Hapus menu
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
