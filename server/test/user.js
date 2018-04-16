import supertest from 'supertest';
import { expect } from 'chai';
import model from '../models';
import app from '../app';

const request = supertest(app);

let token;
let invalidToken;
const { Users } = model;

const doBeforeAll = () => {
  before((done) => {
    Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

describe('tests for user', () => {
  // doBeforeAll();
  describe('tests for Signup processes', () => {
    describe('test for valid signup', () => {
      it('should create a new user', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: `ola${Math.random()}@test.com`,
            password: 'good password',
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('You are now Signed Up');
            if (err) throw err;
            done();
          });
      });
    });

    describe('test for invalid signup', () => {
      it('should return error message when all or some fields are undefined', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'good password',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'All or some fields are not defined' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'ola#test.com',
            password: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body).deep.equal({ email: 'Email is invalid' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message user already exist', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'admin@test.com',
            password: '1234567890',
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('admin@test.com already exist');
            if (err) throw err;
            done();
          });
      });
    });
  });

  describe('tests for Signin processes', () => {
    describe('test for invalid signin', () => {
      it('should return error message when all or some fields are undefined', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginPassword: 'verygood',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Email or Password is undefined' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'ola#test.com',
            loginPassword: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('loginEmail');
            expect(res.body.loginEmail).to.not.equal(null);
            expect(res.body).deep.equal({ loginEmail: 'Type a valid email' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message for new email', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'absent@test.com',
            loginPassword: 'very good',
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('User not found, Please sign up if you are a new user');
            done();
          });
      });

      it('should return error message for incorrect email or password', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'admin@test.com',
            loginPassword: 'bad password',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('Invalid email or password');
            done();
          });
      });
    });

    describe('test for valid signin', () => {
      it('should return a success message', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'admin@test.com',
            loginPassword: '1234567890',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).equal('You are now logged In');
            token = res.body.token;
            if (err) throw err;
            done();
          });
      });
    });

    describe('test for undefined or invalid token', () => {
      it('should return error when token is undefined', (done) => {
        request.post('/api/v1/centers')
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
          })
          .expect(403)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Access denied. You are not logged in' });
            if (err) throw err;
            done();
          });
      });
    
      it('should return error when token is invalid', (done) => {
        invalidToken = token.slice(10);
        request.post('/api/v1/centers')
          .set('x-access-token', invalidToken)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
          })
          .expect(498)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
            if (err) throw err;
            done();
          });
      });
    });
  });
});

