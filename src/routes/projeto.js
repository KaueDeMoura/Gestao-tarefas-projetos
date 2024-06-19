const express = require('express');
const ProjetoApi = require('../api/projeto');

const router = express.Router();

router.post('/', ProjetoApi.createProjeto)
router.put('/:id', ProjetoApi.updateProjeto)
router.get('/', ProjetoApi.findProjetos)
router.delete('/:id', ProjetoApi.deleteProjeto)

module.exports = router;