import request from 'supertest';

describe('An Example suite', () => {
  it('GET / responds with ', (done) => {
    request('https://pokeapi.co/api/v2/')
      .get('pokemon/ditto')
      .expect('Content-Type', /json/, done);
  });
});
