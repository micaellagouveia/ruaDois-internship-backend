import PropertyBase from '../Base/PropertyBase';
import treatError from '../utils/errorTreatment'

var CODE = 'code'

/* Controller responsável em fazer a conexão das rotas com a base.
Nela há os tratamentos de erro gerados por erros no banco, cada erro do banco possui um código,
que é tratado na função treatError, não expondo informações pertinentes do banco */
class PropertyController {
  async create(req, res) {
    try {
      const { isRented, isPublished } = req.body;

      // Condição para não criar imóvel se ele estiver alugado e publicado na aplicação
      if (isRented && isPublished) return res
      .status(422)
      .json({ message: 'Is not possible to publish rented properties.' })

      const property = await PropertyBase.create(req.body);

      return res.status(200).json(property);
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CODE) || error });
    }
  }

  async index(req, res) {
    const { minNumberRooms } = req.query

    try {
      if (minNumberRooms) {
        const filteredProperties = await PropertyBase.filterByRooms(minNumberRooms)
        return res.status(200).json(filteredProperties)
      }
      const allProperties = await PropertyBase.findAll()
      return res.status(200).json(allProperties)

    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CODE) || error });
    }
  }

  async getProperty(req, res) {
    const { idProperty } = req.params;

    try {
      const property = await PropertyBase.findOne(idProperty);

      if (!property) return res.status(404).json({ message: `Property ${idProperty} not found` });

      return res.status(200).json(property);
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CODE) || error });
    }
  }

  async removeProperty(req, res) {
    const { idProperty } = req.params;

    try {
      const property = await PropertyBase.destroy(idProperty);

      if (!property) return res.status(404).json({ message: `Property ${idProperty} not found.` })

      return res.status(200).json({ message: `Property ${idProperty} successfully deleted.` });
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CODE) || error });
    }
  }

  async updateProperty(req, res) {
    const { idProperty } = req.params;
    const { idRealEstate} = req.body;

    try {
      if(idRealEstate) return res.status(406).json({message: 'It is forbidden to pass the idRealEstate'})

      const property = await PropertyBase.findOne(idProperty)

      if (!property) return res.status(404).json({ message: `Property ${idProperty} not found` });

      const newProperty = await PropertyBase.update(req.body, property);

      return res.status(200).json({ message: newProperty });
    } catch (error) {
      return res
        .status(error.status || 400)
        .json({ message: treatError(error.parent.code, CODE) || error });
    }
  }
}

export default new PropertyController();
