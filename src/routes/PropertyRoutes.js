import express from 'express';
import PropertyController from '../controllers/PropertyController'

const routes = express.Router();

/* Rotas relacionadas à classe Property*/

const PATH = '/properties';

routes.post(PATH, PropertyController.create);

routes.get(
  PATH,
  PropertyController.index
);

routes.get(
  PATH + '/:idProperty',
  PropertyController.getProperty
);

routes.delete(
  PATH + '/:idProperty',
  PropertyController.removeProperty
);

routes.put(
  PATH + '/:idProperty',
  PropertyController.updateProperty
);

export default routes;
