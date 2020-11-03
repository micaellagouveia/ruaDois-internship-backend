import Base from './Base';
import PropertyModel from '../models/Property';
import Sequelize from 'sequelize'

/* Classe que herda da classe base, tendo acesso ao seus métodos e podendo configurá-los para suas ocasiões,
 além de poder adicionar novos métodos */
class PropertyBase extends Base {
  constructor() {
    super(PropertyModel);
  }

  async create(propertyInfo) {
    const property = await super.create(propertyInfo);
    return property;
  }

  async listAll() {
    const property = await super.findAll();
    return property;
  }

  async findOne(idProperty) {
    const realEstate = await super.findOne({ where: { idProperty } });
    return realEstate;
  }

  async destroy(idProperty) {
    const property = await super.destroy({ where: { idProperty } });
    return property;
  }

  async update(data, where) {
    if (!where) return 'Property not found';

    const { idProperty, isPublished: oldIsPublished } = where

    let { code,
      type, numberRooms,
      isPublished, isRented } = data

    // Condição para retirar a publicação do imóvel caso ele seja alugado
    if (isRented || isRented && oldIsPublished) isPublished = false

    const property = await super.update({ code, type, numberRooms, isPublished, isRented },
      { where: { idProperty } });

    return property ? `Property ${idProperty} updated` : `Property ${idProperty} not updated`;
  }

  async filterByRooms(numberMin) {

    const Op = Sequelize.Op;
    const properties = await super.findWhere({
      where: {
        numberRooms: {
          [Op.gte]: numberMin
        }
      }
    });
    return properties;
  }
}

export default new PropertyBase();
