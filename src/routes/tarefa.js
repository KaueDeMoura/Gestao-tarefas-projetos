const express = require('express');
const router = express.Router();
//const tarefaController = require('../api/tarefa');
const TarefaApi = require('../api/tarefa');



router.post('/', TarefaApi.createTarefa)
router.put('/:id', TarefaApi.updateTarefa)
router.get('/', TarefaApi.findTarefas)
router.delete('/:id', TarefaApi.deleteTarefa)

module.exports = router;