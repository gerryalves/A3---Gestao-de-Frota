const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');

router.post('/', carroController.create);
router.get('/', carroController.list);
router.get('/:id', carroController.get);
router.put('/:id', carroController.update);
router.delete('/:id', carroController.delete);

module.exports = router;
