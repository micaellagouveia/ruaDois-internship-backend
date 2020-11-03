/* Classe Decorator responsável em fazer um template das funções relacionadas ao banco Sequelize */
class Base {
  constructor(modelBase) {
    this.modelBase = modelBase;
  }

  async create(data) {
    const response = await this.modelBase.create(data);
    return response;
  }

  async findOne(data) {
    const response = await this.modelBase.findOne(data);
    return response;
  }

  async findAll() {
    const response = await this.modelBase.findAll();
    return response;
  }

  async findWhere(where) {
    const response = await this.modelBase.findAll(where);
    return response;
  }

  async update(data, where) {
    const response = await this.modelBase.update(data, where);
    return response;
  }

  async destroy(data) {
    const response = await this.modelBase.destroy(data);
    return response;
  }
}

export default Base;
