import express from 'express';
import { createClasses, indexClasses } from './controllers/ClassesController';

const routes = express.Router();

routes.post('/classes', createClasses);
routes.get('/classes', indexClasses);

export default routes;
