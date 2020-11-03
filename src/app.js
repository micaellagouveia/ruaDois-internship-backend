import express from 'express';
import setRoutes from './routes/routes';
import '../database/sequelize';

class App {
  constructor() {
    this.app = express();
    this.init();
    this.routes();
  }

  init() {
    this.app.use(express.json());
  }

  routes() {
    setRoutes(this.app);
  }
}

export default new App().app;
