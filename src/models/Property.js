import Sequelize, { Model } from 'sequelize';

/* Model responsável em criar os atributos da classe e criar a model do banco. */
class PropertyModel extends Model {
  static init(connection) {
    super.init(
      {
        idProperty: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idRealEstate: Sequelize.INTEGER,
        code: {
          type: Sequelize.INTEGER,
          unique: true,
        },
        type: Sequelize.ENUM('apartamento', 'casa', 'galpão', 'sala comercial'),
        numberRooms: Sequelize.INTEGER,
        isPublished: Sequelize.BOOLEAN,
        isRented: Sequelize.BOOLEAN,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { sequelize: connection, tableName: 'residential_property' }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.RealEstateModel, {
      foreignKey: 'idRealEstate',
      as: 'Real State',
    });
  }
}

export default PropertyModel;
