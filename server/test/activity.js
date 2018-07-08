/* eslint-disable */
import supertest from 'supertest';
import { expect } from 'chai';
import models from '../models';
import app from '../app';

let userToken;
const request = supertest(app);

const { Events, Users, Centers } = models;

const doAfterTest = () => {
  after((done) => {
    Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    Centers.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    Events.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};
describe('test for valid signin', () => {
  it('should return a success message', (done) => {
    request
      .post('/api/v1/users/login')
      .set('Accept', 'application/json')
      .send({
        loginEmail: 'admin@test.com',
        loginPassword: '1234567890'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.not.equal(null);
        expect(res.body.message).equal('You are now logged In');
        userToken = res.body.token;
        
        done();
      });
  });
});

describe('tests for activities', () => {
    it('get activities', done => {
      request
        .get('/api/v1/activity')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('success');
          
          done();
        });
    });
    it('get admin activities', done => {
      request
        .get('/api/v1/adminactivity')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('success');
          
          done();
        });
    });
    it('delete event activities', done => {
      request
        .delete('/api/v1/activity/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Activity Deleted');
          
          done();
        });
    });

    

  doAfterTest();
});