import Sequelize, { Model } from 'sequelize';

/* Model responsável em criar os atributos da classe e criar a model do banco. */
class RealEstateModel extends Model {
  static init(connection) {
    super.init(
      {
        idRealEstate: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cnpj: {
          type: Sequelize.STRING,
          unique: true,
        },
        name: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { sequelize: connection, tableName: 'real_state' }
    );
    return this;
  }
}

export default RealEstateModel;
