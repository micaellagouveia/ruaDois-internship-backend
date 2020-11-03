/* Função para retornar as endpoints das rotas da aplicação, explicitando as parâmetros que devem ser passados. */
export default function endpoints() {
  const realEstate = '/realEstates';
  const property = '/properties';

  const endpoints = [
    {
      realEstate: [
        {
          type: 'POST',
          endpoint: `${realEstate}`,
          body: {
            cnpj: 'STRING',
            name: 'STRING',
          },
          description: 'Creates new real estate.',
        },
        {
          type: 'GET',
          endpoint: `${realEstate}/:idrealEstate`,
          params: {
            idrealEstate: 'INTEGER',
          },
          description: 'Get specific real estate.',
        },
        {
          type: 'GET',
          endpoint: `${realEstate}`,
          description: 'Get all real estates.',
        },
        {
          type: 'DELETE',
          endpoint: `${realEstate}/:idrealEstate`,
          params: {
            idrealEstate: 'INTEGER',
          },
          description: "Remove specific real estate. Only works if this real estate doesn't have properties.",
        },
        {
          type: 'PUT',
          endpoint: `${realEstate}/:idrealEstate`,
          params: {
            idRealEstate: 'INTEGER',
          },
          body: {
            cnpj: 'INTEGER',
            name: 'STRING',
          },
          description: 'Update specific real estate.',
        }
      ],
    },
    {
      property: [
        {
          type: 'POST',
          endpoint: `${property}`,
          body: {
            idRealEstate: 'INTEGER',
            code: 'STRING',
            type: 'STRING',
            numberRooms: 'INTEGER',
            isPublished: 'BOOLEAN',
            isRented: 'BOOLEAN',
          },
          description: 'Creates new property from specific real estate.',
        },
        {
          type: 'GET',
          endpoint: `${property}/:idProperty`,
          params: {
            idProperty: 'INTEGER',
          },
          description: 'Get specific property.',
        },
        {
          type: 'GET',
          endpoint: `${property}?minNumberRooms`,
          query: {
            minNumberRooms: 'INTEGER'
          },
          description: 'Get all properties. You can filter by minimum number of rooms.',
        },
        {
          type: 'DELETE',
          endpoint: `${property}/:idProperty`,
          params: {
            idProperty: 'INTEGER',
          },
          description: 'Remove a specific property.',
        },
        {
          type: 'PUT',
          endpoint: `${property}/:idProperty`,
          params: {
            idProperty: 'INTEGER'
          },
          description: 'Update a specific property. Unable to update related real estate.',
        },
      ],
    },
  ]
  return endpoints;
}