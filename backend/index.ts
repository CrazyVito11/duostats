import express, { Application } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

// TODO: Remove .env support, as it doesn't seem to be neccesary
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


app.use('/api', apiRoutes);

app.use(errorHandlerMiddleware);


app.listen(port, () => {
  console.log(`Server is ready at http://localhost:${port}`);
});
