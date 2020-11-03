import RealEstateBase from '../Base/RealEstateBase';
import treatError from '../utils/errorTreatment';
import cnpjValidator from '../utils/cnpjValidator';

var CNPJ = 'cnpj'

/* Controller responsável em fazer a conexão das rotas com a base.
Nela há os tratamentos de erro gerados por erros no banco, cada erro do banco possui um código,
que é tratado na função treatError, não expondo informações pertinentes do banco. */
class RealEstateController {
  async create(req, res) {
    try {
      const { cnpj } = req.body;
      if (cnpj) {
        req.body.cnpj = cnpjValidator(cnpj);

        if (!req.body.cnpj) return res.status(422).json({ message: 'Invalid CNPJ.' })
      }
      const realEstate = await RealEstateBase.create(req.body);

      return res.status(200).json(realEstate);
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CNPJ) || error });
    }
  }

  async index(req, res) {
    try {
      const realEstate = await RealEstateBase.listAll();
      return res.json(realEstate);
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CNPJ) || error });
    }
  }

  async getRealEstate(req, res) {
    const { idRealEstate } = req.params;

    try {
      const realEstate = await RealEstateBase.findOne(idRealEstate);

      if (!realEstate) return res.status(404).json({ message: `Real Estate ${idRealEstate} not found` })

      return res.status(200).json(realEstate);
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CNPJ) || error });
    }
  }

  async removeRealEstate(req, res) {
    const { idRealEstate } = req.params;

    try {
      const realEstate = await RealEstateBase.destroy(idRealEstate);

      if (!realEstate) return res.status(404).json({ message: `Real Estate ${idRealEstate} not found.` })

      return res.status(200).json({ message: `Real Estate ${idRealEstate} successfully deleted.` });
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CNPJ) || error });
    }
  }

  async updateRealEstate(req, res) {
    const { idRealEstate } = req.params;
    const { cnpj } = req.body;

    try {
      const realEstate = await RealEstateBase.findOne(idRealEstate);

      if (!realEstate) return res.status(404).json({ message: `Real Estate ${idRealEstate} not found` });

      if (cnpj) {
        req.body.cnpj = cnpjValidator(cnpj);

        if (!req.body.cnpj) return res.status(422).json({ message: 'Invalid CNPJ.' })
      }

      const newRealEstate = await RealEstateBase.update(req.body, realEstate);

      return res.status(200).json({ message: newRealEstate });
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CNPJ) || error });
    }
  }
}

export default new RealEstateController();
