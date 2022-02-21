import assert from 'assert';
import request from 'supertest';

describe('GET /', () => {
  it('should return 200 status code with a massage', (done) => {
    request('http://localhost:8000')
      .get('/')
      .expect(200)
      .then((response) => {
        assert(response.body, 'hello world!');
        done();
      });
  });
});

describe('GET /api', () => {
  it('should return 200 status code with a gretting massage', (done) => {
    request('http://localhost:8000')
      .get('/api')
      .expect(200)
      .then((response) => {
        assert(response.body, 'hello from main api route');
        done();
      });
  });
});

describe('GET /api/images', () => {
  it('without query params', (done) => {
    request('http://localhost:8000').get('/api/images').expect(404, done);
  });

  it('with valid filename, width and height', (done) => {
    const filename = 'fjord';
    const width = 500;
    const height = 500;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(200, done);
  });
  it('with invalid filename', (done) => {
    const filename = '';
    const width = 500;
    const height = 500;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(404, done);
  });

  it('with negative width and height', (done) => {
    const filename = 'fjord';
    const width = -1;
    const height = -1;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(500, done);
  });
  it('with zero width and zero height', (done) => {
    const filename = 'fjord';
    const width = 0;
    const height = 0;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(500, done);
  });
  it('with zero width', (done) => {
    const filename = 'fjord';
    const width = 0;
    const height = 500;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(500, done);
  });
  it('with zero height', (done) => {
    const filename = 'fjord';
    const width = 500;
    const height = 0;

    request('http://localhost:8000')
      .get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
      .expect(500, done);
  });
});
