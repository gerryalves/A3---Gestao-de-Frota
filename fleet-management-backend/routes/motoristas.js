const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');

router.post('/', motoristaController.create);
router.get('/', motoristaController.list);
router.get('/:id', motoristaController.get);
router.put('/:id', motoristaController.update);
router.delete('/:id', motoristaController.delete);

module.exports = router;
