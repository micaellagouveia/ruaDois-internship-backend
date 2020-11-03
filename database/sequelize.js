import Sequelize from 'sequelize';
import databaseConfig from './config';
import RealEstateModel from '../src/models/RealEstate';
import PropertyModel from '../src/models/Property';

const nodeEnv = process.env.NODE_ENV || 'development';
const models = [
    RealEstateModel,
    PropertyModel,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig[nodeEnv]);
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
