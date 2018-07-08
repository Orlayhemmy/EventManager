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
        if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
          done();
        });
    });
    it('set center activities', done => {
      request
        .post('/api/v1/adminactivity')
        .set('x-access-token', userToken)
        .send({centerName: "Andela"})
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('success');
          if (err) throw err;
          done();
        });
    });
    it('set event activities', done => {
      request
        .post('/api/v1/activity')
        .set('x-access-token', userToken)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Activity added successfully');
          if (err) throw err;
          done();
        });
    });
    it('notifies admin', done => {
      request
        .post('/api/v1/notifyadmin')
        .set('x-access-token', userToken)
        .send({centerName: 1})
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('success');          
          if (err) throw err;
          done();
        });
    });

    it('notifies user', done => {
      request
        .post('/api/v1/notifyuser')
        .set('x-access-token', userToken)
        .send({eventTitle: 'Planning', isApproved: true, userId: 1 })
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('success');          
          if (err) throw err;
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
          if (err) throw err;
          done();
        });
    });

    

  doAfterTest();
});