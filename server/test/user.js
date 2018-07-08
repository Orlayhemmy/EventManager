/* eslint-disable */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

const request = supertest(app);

let userToken;
let userToken2;

describe('tests for user', () => {
  describe('tests for Signup processes', () => {
    describe('test for valid signup', () => {
      it('should create a new user', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: `ola${Math.random()}@test.com`,
            password: 'good password'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('You are now Signed Up');
            userToken2 = res.body.token;
            done();
          });
      });
    });

    describe('test for invalid signup', () => {
      it('should return error message when all or some fields are undefined', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'good password'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({
              message: 'All or some fields are not defined'
            });
            
            done();
          });
      });
      it('fullname length error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'good password',
            fullname: 'John'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('fullname');
            expect(res.body.fullname).to.not.equal(null);
            expect(res.body.fullname).deep.equal(
              'Fullname must be more than 5 characters but less than 20'
            );
            
            done();
          });
      });

      it('fullname length error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'good password',
            fullname: '5555hjbsg'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('fullname');
            expect(res.body.fullname).to.not.equal(null);
            expect(res.body.fullname).deep.equal(
              'Fullname can only contain numbers and letters'
            );
            
            done();
          });
      });

      it('fullname error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'good password',
            fullname: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('fullname');
            expect(res.body.fullname).to.not.equal(null);
            expect(res.body.fullname).deep.equal(
              'Fullname cannot be blank'
            );
            
            done();
          });
      });
      it('email error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: '',
            password: 'good password',
            fullname: 'Hohn doe'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body.email).deep.equal(
              'Email is required'
            );
            
            done();
          });
      });

      it('email error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'wew@wdef.com',
            password: 'ord',
            fullname: 'Hohn doe'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('password');
            expect(res.body.password).to.not.equal(null);
            expect(res.body.password).deep.equal(
              'Password length must be between 5 and 20'
            );
            
            done();
          });
      });

      it('email error', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            email: 'wew@wdef.com',
            password: '',
            fullname: 'Hohn doe'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('password');
            expect(res.body.password).to.not.equal(null);
            expect(res.body.password).deep.equal(
              'Password is required'
            );
            
            done();
          });
      });
      it('should return error message invalid input characters are entered', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'ola#test.com',
            password: 'very good'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body).deep.equal({ email: 'Email is invalid' });
            
            done();
          });
      });

      it('should return error message user already exist', done => {
        request
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'admin@test.com',
            password: '1234567890'
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('admin@test.com already exist');
            
            done();
          });
      });
    });
  });

  describe('tests for Signin processes', () => {
    describe('test for invalid signin', () => {
      it('should return error message when all or some fields are undefined', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginPassword: 'verygood'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({
              message: 'Email or Password is undefined'
            });
            
            done();
          });
      });

      it('loginEmail is invalid', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginPassword: 'verygood',
            loginEmail: 'badasss'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('loginEmail');
            expect(res.body.loginEmail).to.not.equal(null);
            expect(res.body.loginEmail).deep.equal(
              'Type a valid email'
            );
            
            done();
          });
      });

      it('loginPassword is empty', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginPassword: '',
            loginEmail: 'badassguy@test.com'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('loginPassword');
            expect(res.body.loginPassword).to.not.equal(null);
            expect(res.body.loginPassword).deep.equal(
              'Password is required'
            );
            
            done();
          });
      });

      it('should return error message invalid input characters are entered', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'ola#test.com',
            loginPassword: 'very good'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('loginEmail');
            expect(res.body.loginEmail).to.not.equal(null);
            expect(res.body).deep.equal({ loginEmail: 'Type a valid email' });
            
            done();
          });
      });

      it('should return error message for new email', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'absent@test.com',
            loginPassword: 'very good'
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal(
              'User not found, Please sign up if you are a new user'
            );
            done();
          });
      });

      it('should return error message for incorrect email or password', done => {
        request
          .post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'admin@test.com',
            loginPassword: 'bad password'
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
      it('should return a success message', done => {
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

    describe('test for undefined or invalid token', () => {
      it('should return error when token is undefined', done => {
        request
          .post('/api/v1/centers')
          .set('x-access-token', userToken2)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center'
          })
          .expect(403)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({
              message: 'You are not permitted to view this page'
            });
            
            done();
          });
      });

      it('should return error when token is undefined', done => {
        request
          .post('/api/v1/events')
          .send({
            eventTitle: 'Five Points',
            description: 'A world class event center'
          })
          .expect(403)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).equal('Access denied. You are not logged in');     
            done();
          });
      });

      it('should return error when token is invalid', done => {
        request
          .post('/api/v1/events')
          .set('x-access-token', 'userToken')
          .send({
            eventTitle: 'Five Points',
            description: 'A world class event center'
          })
          .expect(498)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.status).equal(498);
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('Token is Invalid or Expired');          
            done();
          });
      });
    });
  });

  describe('test for GET', () => {
    it('should return success when user details found', done => {
      request
        .get('/api/v1/users')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('User Details Found');
          
          done();
        });
    });

    it('should return success when user email found', done => {
      request
        .get('/api/v1/userEmail/2')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Email Found');
          
          done();
        });
    });

    it('should return success when user email found', done => {
      request
        .get('/api/v1/userEmail/99')
        .set('x-access-token', userToken)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('No user Found');
          
          done();
        });
    });
  });

  describe('test for recover password', () => {
    it('recover password', done => {
      request
        .post('/api/v1/passrecovery')
        .send({ email: 'admin@test.com' })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('User found!');
          
          done();
        });
    });

    it('should return failure when user email is not found', done => {
      request
        .post('/api/v1/passrecovery')
        .send({ email: 'admin@teest.com' })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal(
            'Email is incorrect or not registered'
          );
          
          done();
        });
    });
  });

  describe('test for updating user', () => {
    it('successful update', done => {
      request
        .put('/api/v1/users')
        .set('x-access-token', userToken)
        .send({
          email: 'admin@test.com',
          newPassword: '1234567890',
          fullname: 'John doe'
        })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Changes Applied Successfully');
          
          done();
        });
    });

    it('failed update', done => {
      request
        .put('/api/v1/users')
        .set('x-access-token', userToken)
        .send({
          email: 'admin@tesst.com',
          password: '1234567890',
          fullname: 'John doe'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('User not found');
          
          done();
        });
    });
  });

  describe('test for updating password', () => {
    it('successful update', done => {
      request
        .put('/api/v1/newpassword')
        .send({
          email: 'admin@test.com',
          newPassword: '1234567890'
        })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Changes Applied Successfully');
          
          done();
        });
    });

    it('email and fullname update error', done => {
      request
        .put('/api/v1/users')
        .set('x-access-token', userToken)
        .send({
          email: 'wewdef.com',
          newPassword: 'hhj',
          retypePass: '3343543636',
          fullname: 'Hohn'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.email).equal('Email is invalid')
          expect(res.body.newPassword).equal('Password length must be between 5 and 20')
          expect(res.body.retypePass).equal('Password must match')
          expect(res.body.fullname).equal('Fullname must be more than 5 characters but less than 20');
          
          done();
        });
    });
    it('fullname update error', done => {
      request
        .put('/api/v1/users')
        .set('x-access-token', userToken)
        .send({
          fullname: 'Ho56576hn*&&',
          email: '',
          newPassword: '34242424'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.fullname).equal('Fullname can only contain numbers and letters');
          done();
        });
    });
    

    it('failed update', done => {
      request
        .put('/api/v1/newpassword')
        .send({
          email: 'admin@tesst.com',
          fullname: '',
          newPassword: '',
          retypePass: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('test for checking password', () => {
    it('successful', done => {
      request
        .post('/api/v1/passwordcheck')
        .set('x-access-token', userToken)
        .send({
          id: '1',
          oldPassword: '1234567890'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Password Match');
          
          done();
        });
    });

    it('failure', done => {
      request
        .post('/api/v1/passwordcheck')
        .set('x-access-token', userToken)
        .send({
          id: '1',
          oldPassword: '12347890'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Wrong Password');
          
          done();
        });
    });
    it('empty email on recovery', done => {
      request
        .post('/api/v1/passrecovery')
        .send({
          email: 'efwe.fdfd'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.not.equal(null);
          expect(res.body.email).deep.equal('Type a valid email');
          
          done();
        });
    });
    it('email undefined on recovery', done => {
      request
        .post('/api/v1/passrecovery')
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Email is required');
          
          done();
        });
    });
  });
});
