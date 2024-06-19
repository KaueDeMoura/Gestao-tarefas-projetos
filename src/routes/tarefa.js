const express = require('express');
const TarefaApi = require('../api/tarefa');

const router = express.Router();

router.post('/', TarefaApi.createTarefa)
router.put('/:id', TarefaApi.updateTarefa)
router.get('/', TarefaApi.findTarefas)
router.delete('/:id', TarefaApi.deleteTarefa)

module.exports = router;