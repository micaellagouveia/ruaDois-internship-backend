import Base from './Base';
import RealEstateModel from '../models/RealEstate';

/* Classe que herda da classe base, tendo acesso ao seus métodos e podendo configurá-los para suas ocasiões,
 além de poder adicionar novos métodos */
class RealEstateBase extends Base {
  constructor() {
    super(RealEstateModel);
  }

  async create(realEstateInfo) {
    const realEstate = await super.create(realEstateInfo);
    return realEstate;
  }

  async findOne(idRealEstate) {
    const realEstate = await super.findOne({ where: { idRealEstate } });
    return realEstate
  }

  async listAll() {
    const realEstates = await super.findAll();
    return realEstates;
  }

  async destroy(idRealEstate) {
    const realEstate = await super.destroy({ where: { idRealEstate } });
    return realEstate
  }

  async update(data, where) {
    const { idRealEstate } = where

    const realEstate = await super.update(data, { where: { idRealEstate } });
    return realEstate ? `Real State ${idRealEstate} updated` : `Real State ${idRealEstate} not updated`;
  }

}

export default new RealEstateBase();
