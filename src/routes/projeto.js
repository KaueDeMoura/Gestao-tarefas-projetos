const express = require('express');
const ProjetoApi = require('../api/projeto');

const router = express.Router();

router.post('/', ProjetoApi.createProjeto)
router.get('/', ProjetoApi.findProjetos)
router.put('/:id', ProjetoApi.updateProjeto)
router.delete('/:id', ProjetoApi.deleteProjeto)

module.exports = router;