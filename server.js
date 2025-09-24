//importa os modulos necessarios

const express = require('express')
const mysql = require('mysql2')
const path= require('path')

const app = express();
const port = 3000;

//configura a conexão com o banco de dados mysql

const connection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'aula_nodejs' 
    }
)

//Conecta ao banco de dados

connection.connect(err => {
    if (err){
        console.error('Erro ao conectar ao banco de dados');
    return       
    }
    console.log('Conectado ao banco de dados MySQL');

}
)

//Middleware(express) para processar dados de formulário
app.use(express.urlencoded({extended: true}));

//Serve arquivos estaticos da pasta 'public'
app.use(express.static(path.join(_dirname, 'public')));

//Rota principal: serve o formulario HTML
app.get('/',(req , res)=>{
    res.sendFile(path.join(_dirname,'public','index.html'))
});

//Rota para processar o cadastro de usuario
app.post('/cadastrar', (req, res)=>{
    const{nome,email}=req.body;


//Comando SQL para inserir um novo usuario
const sql='INSERT INTO usuarios (nome,email) VALUES(?,?)';
connection.query(sql,[nome,email],(err,result)=>{
    if (err){
        console.error('Erro ao inserir ao banco de dados: ',err);
        return res.status(500).send('Erro ao cadastrar usuario. ');

    }
    console.log('Usuario cadastrado com sucesso! ');
    res.send('<h1>Usuario cadastrado com sucesso!</h1> <p><a href= "/"> Voltar</a></p>')

});
});

//Inicia o servidor
listen(port,() =>{
    console.log(`Servidor rodando em http://localhost:${port}`);

});