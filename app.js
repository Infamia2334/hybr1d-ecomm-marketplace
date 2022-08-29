require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const { I18n } = require('i18n');

const app = express();
require('./db');

const i18n = new I18n({
    locales: ['en'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
});

app.use(i18n.init);
app.use(bodyParser.json({
    limit: '10mb',
    parameterLimit: 1000000
})); 
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 1000000
})); 

app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 3000;      //if not specified port is 3000



app.listen(PORT,()=>{
    console.log(`Server Listning on Port ${PORT}`);
});