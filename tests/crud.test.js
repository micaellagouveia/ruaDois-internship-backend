import request from 'supertest';
import app from '../src/app.js';

describe('Endpoints Tests', () => {

    it('should return endpoints', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    })
});

describe('Real Estates Tests', () => {

    it('should create Real estate', async () => {
        const mockRealEstate = {
            cnpj: "83.214.562/0001-65",
            name: "Imobiliária 1"
        }
        const res = await request(app).post('/realEstates').send(mockRealEstate);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('idRealEstate');
    })

    it('should show all Real estates', async () => {
        const res = await request(app).get('/realEstates');
        expect(res.statusCode).toEqual(200);
    })

    it('should specific Real estate', async () => {
        const res = await request(app).get(`/realEstates/1`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('idRealEstate');
    })
    it('should update Real estate', async () => {
        const mockRealEstate = {
            name: "Imobiliária 2"
        }
        const res = await request(app).put('/realEstates/1').send(mockRealEstate);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Real State 1 updated" })
    })
});

describe('Properties Tests', () => {

    it('should create Property', async () => {
        const mockProperty = {
            idRealEstate: 1,
            code: 1112345,
            type: "galpão",
            numberRooms: 6,
            isPublished: true,
            isRented: false
        }
        const res = await request(app).post('/properties').send(mockProperty);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('idProperty');
    })

    it('should show all Properties', async () => {
        const res = await request(app).get('/properties');
        expect(res.statusCode).toEqual(200);
    })

    it('should return Properties with minNumberRooms filter', async () => {
        const res = await request(app).get('/properties?minNumberRooms=3');
        expect(res.statusCode).toEqual(200);
    })

    it('should specific Property', async () => {
        const res = await request(app).get(`/properties/1`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('idProperty');
    })
    it('should update Property', async () => {
        const mockProperty = {
            name: "Imobiliária 2"
        }
        const res = await request(app).put('/properties/1').send(mockProperty);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Property 1 updated" })
    })
});

describe('Real Estates Errors Cases', () => {

    it('should return Missing Parameters on create Real estate', async () => {
        const mockRealEstate = {
            name: "Imobiliária 1"
        }
        const res = await request(app).post('/realEstates').send(mockRealEstate);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: "Missing parameter." })
    })

    it('should return Invalid CNPJ on create Real estate', async () => {
        const mockRealEstate = {
            cnpj: "83.214.562/0001-67",
            name: "Imobiliária 1"
        }
        const res = await request(app).post('/realEstates').send(mockRealEstate);
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Invalid CNPJ.'})
    })

    it('should return CNPJ already exists on create Real estate', async () => {
        const mockRealEstate = {
            cnpj: "83.214.562/0001-65",
            name: "Imobiliária 1"
        }
        const res = await request(app).post('/realEstates').send(mockRealEstate);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: "Object with this cnpj already exists." })
    })

    it('should return Real Estate not found on get Real Estate', async () => {
        const res = await request(app).get('/realEstates/10');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Real Estate 10 not found'})
    })

    it('should return Invalid CNPJ on update Real estate', async () => {
        const mockRealEstate = {
            cnpj: "83.214.562/0001-56",
            name: "Imobiliária 1"
        }
        const res = await request(app).put('/realEstates/1').send(mockRealEstate);
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Invalid CNPJ.'})
    })

    it('should return Real Estate not found on update Real Real Estate', async () => {
        const mockRealEstate = {
            cnpj: "83.214.562/0001-56",
            name: "Imobiliária 1"
        }
        const res = await request(app).put('/realEstates/10').send(mockRealEstate);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Real Estate 10 not found'})
    })

    it('should return Real Estate not found on delete Real Real Estate', async () => {
        const res = await request(app).delete('/realEstates/10');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    })

    it('should fail on delete Real case because the have related property', async () => {
        const res = await request(app).delete('/realEstates/1');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    })
});

describe('Properties Errors Cases', () => {

    it('should return Missing Parameters on create Property', async () => {
        const mockRealEstate = {
            idRealEstate: 1,
            code: 1112345,
            type: "galpão",
            isPublished: true,
            isRented: false
        }
        const res = await request(app).post('/properties').send(mockRealEstate);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    })

    it('should return Invalid(s) Parameter(s) on create Property', async () => {
        const mockProperty = {
            idRealEstate: 1,
            code: 1112345,
            type: "casas",
            numberRooms: 4,
            isPublished: true,
            isRented: false
        }
        const res = await request(app).post('/properties').send(mockProperty);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: "Invalid(s) parameter(s)." })
    })

    it('should return Not published rented properties on create Property', async () => {
        const mockProperty = {
            idRealEstate: 1,
            code: 1112345,
            numberRooms: 2,
            type: "galpão",
            isPublished: true,
            isRented: true
        }
        const res = await request(app).post('/properties').send(mockProperty);
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('message');
    })

    it('should return Code already exists on create Property', async () => {
        const mockProperty = {
            idRealEstate: 1,
            code: 1112345,
            numberRooms: 2,
            type: "galpão",
            isPublished: true,
            isRented: false
        }
        const res = await request(app).post('/properties').send(mockProperty);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    })

    it('should return Real Estate not found on create Property', async () => {
        const mockProperty = {
            idRealEstate: 10,
            code: 11123457789,
            numberRooms: 2,
            type: "galpão",
            isPublished: true,
            isRented: false
        }
        const res = await request(app).post('/properties').send(mockProperty);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    })

    it('should return Property not found on get Property Estate', async () => {
        const res = await request(app).get('/properties/10');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Property 10 not found'})
    })

    it('should return Property not found on update Property Estate', async () => {
        const res = await request(app).put('/properties/10');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Property 10 not found'})
    })

    it('should return Forbidden pass idRealEstate on update Property Estate', async () => {
        const mockProperty = {
            idRealEstate: 10,
        }
        const res = await request(app).put('/properties/1').send(mockProperty);
        expect(res.statusCode).toEqual(406);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'It is forbidden to pass the idRealEstate'})
    })

    it('should return Property not found on delete Property Estate', async () => {
        const res = await request(app).delete('/properties/10');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Property 10 not found.'})
    })
});

describe('Delete Tests', () => {

    it('should delete property', async () => {
        const res = await request(app).delete('/properties/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Property 1 successfully deleted.'})
    })

    it('should delete real Estate', async () => {
        const res = await request(app).delete(`/realEstates/1`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({ message: 'Real Estate 1 successfully deleted.'})
    })
});