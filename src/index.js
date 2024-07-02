const express = require('express');
const cors = require('cors');
const database = require('./database/db');
const UserApi = require('./api/user');
const UserRouter = require('./routes/user');
const ProjetoRouter = require('./routes/projeto');
const TarefaRouter = require('./routes/tarefa'); // Adicionar a rota de tarefa
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Set use cors
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

// Rotas sem token
app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/user', UserApi.createUser);

// Middleware para validar token
app.use(UserApi.validateToken);

// Rotas com token
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/projeto', ProjetoRouter); // Corrigir para 'projeto' em vez de 'post'
app.use('/api/v1/tarefa', TarefaRouter); // Adicionar a rota de tarefa

// Sincronizar banco de dados
database.db.sync({ })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Erro ao inicializar o banco de dados ${e}`)
    })

    module.exports = app;