import * as app from '../../../src/index';
import { agent, Response } from 'supertest';
import { expect } from 'chai';

describe('Vehicle Controller', () => {
  it('should return examples list', done => {
    agent(app.default)
      .get('/api/vehicles/')
      .expect((res: Response) => {
        expect(res.status).to.equal(200);
      })
      .end(done);
  });

  it('should load data from a valid CSV file', done => {
    agent(app.default)
      .post('/api/vehicles/uploadProviderCsv')
      .send({
        provider: 'provider1',
      })
      .expect((res: Response) => {
        expect(res.status).to.equal(200);
      })
      .end(done);
  });

  it('should load data from a valid CSV file', done => {
    agent(app.default)
      .post('/api/vehicles/uploadProviderCsv')
      .send({
        provider: 'provider1',
      })
      .expect((res: Response) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('err');
        expect(res.body.err).to.equal(
          'Error uploading CSV File - New CSV file for provider: provider1 was not found'
        );
      })
      .end(done);
  });

  it('should load data from a valid CSV file', done => {
    agent(app.default)
      .post('/api/vehicles/uploadProviderCsv')
      .send({
        provider: 'provider5',
      })
      .expect((res: Response) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('err');
        expect(res.body.err).to.equal(
          'Error uploading CSV File - CSV setup for provider: provider5 was not found'
        );
      })
      .end(done);
  });

  it('should load data from a valid CSV file', done => {
    agent(app.default)
      .post('/api/vehicles/uploadProviderCsv')
      .send({})
      .expect((res: Response) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('err');
        expect(res.body.err).to.equal(
          'Must provide the provider for upload the CSV file'
        );
      })
      .end(done);
  });
});
