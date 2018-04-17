/**
  * API Endpoint Tests for database
  */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

const request = supertest(app);

let token;
const invalidToken = 'invalidToken';

describe('tests for application', () => {
  describe('test for invalid routes', () => {
    it('should fail to get invalid route', (done) => {
      request.get('/api/v1/5')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Route does not exist' });
          if (err) throw err;
          done();
        });
    });
  });

  
});
