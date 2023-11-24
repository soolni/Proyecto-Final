// Modules
const express = require('express');
const cors = require('cors');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cartRouter = require('./routes/cartRoutes'); 

const password = require('./sensitiveInfo');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', categoriesRoutes);
app.use('/api', productsRoutes);
app.use('/api', loginRoutes);

app.use('/api', cartRouter); 

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto:${PORT}`);
});