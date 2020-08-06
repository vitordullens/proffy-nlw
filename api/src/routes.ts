import express from 'express';
import { createClasses, indexClasses } from './controllers/ClassesController';
import { createConnections, indexConnections } from './controllers/ConnectionsController';

const routes = express.Router();

routes.post('/classes', createClasses);
routes.get('/classes', indexClasses);

routes.post('/connections', createConnections);
routes.get('/connections', indexConnections);

export default routes;
