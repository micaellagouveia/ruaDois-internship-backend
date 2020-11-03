import RealEstateRoutes from './RealEstateRoutes'
import PropertyRoutes from './PropertyRoutes'
import endpoints from '../utils/endpoints'

/* Tipo de fachada para as rotas, ao invés de usá-las em um mesmo arquivo, criei uma fachada que chama
os outros arquivos que possuem as rotas declaradas. */
export default function SetRoutes(app) {
    app.use([RealEstateRoutes]);
    app.use([PropertyRoutes]);
    app.use('/', (req, res) => {
        return res.json(endpoints());
      });
}