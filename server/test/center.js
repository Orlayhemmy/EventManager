import supertest from 'supertest';
import { expect } from 'chai';
import model from '../models';
import app from '../app';

let token;
const request = supertest(app);

const { Centers } = model;

const doBeforeAll = () => {
  before((done) => {
    Centers.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

describe('tests for post, update, delete and get center processes ', () => {
  doBeforeAll();

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

  describe('test for undefined or invalid inputs', () => {
    // it('should return error when user is not admin', (done) => {
    //   request.post('/api/v1/centers')
    //     .set('x-access-token', invalidToken)
    //     .send({
    //       centerName: 'Five Points',
    //       description: 'A world class event center',
    //     })
    //     .expect(401)
    //     .end((err, res) => {
    //       expect(res.body).to.have.property('message');
    //       expect(res.body.message).to.not.equal(null);
    //       expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
    //       if (err) throw err;
    //       done();
    //     });
    // });


    it('should return error message when all or some fields are undefined', (done) => {
      request.post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
          // No facility and location field
          centerName: 'Five Points',
          description: 'A world class event center',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'All or Some Fields are Undefined' });
          if (err) throw err;
          done();
        });
    });

    it('should return success message when center is created', (done) => {
      request.post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('center');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).deep.equal('Successfully created a center');
          if (err) throw err;
          done();
        });
    });

    it('should return error message when center already exist', (done) => {
      request.post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage',
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Five Points already exist' });
          if (err) throw err;
          done();
        });
    });

    it('should return error message when all or some fields are empty', (done) => {
      request.post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
        // Empty facility and location field
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: '',
          location: '',
          capacity: '500',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities: 'Center should have at least one facility',
            location: 'Center should have an Address',
          });
          if (err) throw err;
          done();
        });
    });

    it('should return error message invalid input characters are entered', (done) => {
      request.post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
          // Invalid characters
          centerName: 'Five Points #1',
          description: 'A world class event center/Hotel',
          facilities: 'Projector & Stage Lights, ^2 Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName: 'Center Name can only contain numbers and letters',
            description: 'description can not include symbols except comma and full stop',
            facilities: 'Facilities can not include symbols except comma which you should use to separate the faciities',
          });
          done();
        });
    });

    it('should return error when center is not found', (done) => {
      request.put('/api/v1/centers/0')
        .set('x-access-token', token)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Center not Found' });
          if (err) throw err;
          done();
        });
    });

    it('should return error when center is not found', (done) => {
      request.delete('/api/v1/centers/0')
        .set('x-access-token', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Center does not exist' });
          if (err) throw err;
          done();
        });
    });

    it('should return success when center updates', (done) => {
      request.put('/api/v1/centers/1')
        .set('x-access-token', token)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Successfully updated center' });
          if (err) throw err;
          done();
        });
    });

    // it('should return status 200', (done) => {
    //   request.delete('/api/v1/centers/1')
    //     .set('x-access-token', token)
    //     .expect(200)
    //     .end((err, res) => {
    //       expect(res.body).to.not.equal(null);
    //       expect(res.body).deep.equal({ message: 'Center Deleted' });
    //       if (err) throw err;
    //       done();
    //     });
    // });
  });
});
