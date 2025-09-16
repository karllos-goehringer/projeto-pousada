import express, { json } from 'express';
import getRoutes from './get.js';
import createRoutes from './create.js';
import updateRoutes from './update.js';
import deleteRoutes from './delete.js';
import testRoutes from './test.js';

const app = express();
app.use(json());

app.use(getRoutes);
app.use(createRoutes);
app.use(updateRoutes);
app.use(deleteRoutes);
app.use(testRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
