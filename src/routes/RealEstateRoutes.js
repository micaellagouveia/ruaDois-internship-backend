import express from 'express';
import RealEstateController from '../controllers/RealEstateController'

const routes = express.Router();

/* Rotas relacionadas à classe Real Estate*/

const PATH = '/realEstates';

routes.post(PATH, RealEstateController.create);

routes.get(
  PATH ,
  RealEstateController.index
);

routes.get(
  PATH + '/:idRealEstate',
  RealEstateController.getRealEstate
);

routes.delete(
  PATH + '/:idRealEstate',
  RealEstateController.removeRealEstate
);

routes.put(
  PATH + '/:idRealEstate',
  RealEstateController.updateRealEstate
);

export default routes;
