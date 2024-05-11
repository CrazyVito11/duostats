import express, { Application } from 'express';
import apiRoutes from './routes/api';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';


const app: Application = express();
const port = process.env.PORT || 8000;


app.use('/api', apiRoutes);

app.use(errorHandlerMiddleware);


app.listen(port, () => {
  console.log(`Server is ready at http://localhost:${port}`);
});
