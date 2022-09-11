const Concert = require('../../../models/concert.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ id: 1, performer: 'John Doe', genre: 'Rock', price: 10, day: 1, image: 'image' });
    await testConcertOne.save();

    const testConcertTwo = new Concert({ id: 2, performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: 'image' });
    await testConcertTwo.save();
  });

  it('/performer/:performer should return concert by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('/genre/:genre should return concert by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/R&B');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('/price/:price_min/:price_max should return concert by choosen price', async () => {
    const res = await request(server).get('/api/concerts/price/5/20');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('/day/:day should return concert by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);
  });

  after(async () => {
    await Concert.deleteMany({});
  });
});