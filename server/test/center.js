/* eslint-disable */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

let userToken;
const request = supertest(app);

describe('tests for post, update, delete and get center processes ', () => {
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

    it('should return error message when all or some fields are undefined', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', 'token')
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          cost: '900000',
          imageUrl: 'https://wwww.image.com/centerImage'
        })
        .expect(498)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.status).to.equal(498);
          expect(res.body).deep.equal({
            message: 'Token is Invalid or Expired'
          });
          if (err) throw err;
          done();
        });
    });
    it('should return error message when all or some fields are undefined', (done) => {
      request
        .post('/api/v1/centers')
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          cost: '900000',
          imageUrl: 'https://wwww.image.com/centerImage'
        })
        .expect(403)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.status).to.equal(403);
          expect(res.body).deep.equal({
            message: 'Access denied. You are not logged in'
          });
          if (err) throw err;
          done();
        });
    });
    it('should return error message when all or some fields are undefined', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body).deep.equal({
            message: 'All or Some Fields are Undefined'
          });
          if (err) throw err;
          done();
        });
    });

    it('should return success message when center is created', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          cost: '900000',
          imageUrl: 'https://wwww.image.com/centerImage'
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
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          cost: '900000',
          imageUrl: 'https://wwww.image.com/centerImage'
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
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Empty facility and location field
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: '',
          location: '',
          capacity: '500',
          cost: '70000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities: 'Center should have at least one facility',
            location: 'Center should have an Address'
          });
          if (err) throw err;
          done();
        });
    });

    it('should return error message invalid input characters are entered', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Points #1',
          description: 'A world class event center/Hotel',
          facilities: 'Projector & Stage Lights, ^2 Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName: 'Center Name can only contain numbers and letters',
            description:
              'description can not include symbols except comma and full stop',
            facilities:
              'Facilities can not include symbols except comma which you should use to separate the faciities' // eslint-disable-line
          });
          done();
        });
    });

    it('centername is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'The Center Name must be more than 5 characters but less than 20'
          });
          done();
        });
    });

    it('centername is less than 5', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'The Center Name must be more than 5 characters but less than 20'
          });
          done();
        });
    });

    it('capcity must be number', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500E',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            capacity:
              'Center capacity can only contain numbers'
          });
          done();
        });
    });
    it('capcity must be number', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500E',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            capacity:
              'Center capacity can only contain numbers'
          });
          done();
        });
    });

    it('cost must be number', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '6000E0',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            cost:
              'Center cost can only contain numbers'
          });
          done();
        });
    });

    it('cost must be number', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '6000E0',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            cost:
              'Center cost can only contain numbers'
          });
          done();
        });
    });

    it('cost is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            cost:
              'Center must have cost'
          });
          done();
        });
    });

    it('capacity is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            capacity:
              'Center capacity cannot be blank'
          });
          done();
        });
    });

    it('centername is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: '',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '4999',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'Center Name cannot be blank'
          });
          done();
        });
    });

    it('centername is missing', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Me#23dsfs',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '4999',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'Center Name can only contain numbers and letters'
          });
          done();
        });
    });

    it('facilities is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tip',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities:
              'facilities must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('facilities is less than 5', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tip',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities:
              'facilities must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('image url is not valid', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'imag'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            imageUrl:
              'The url is not valid'
          });
          done();
        });
    });

    it('image url is not valid', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'imag'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            imageUrl:
              'The url is not valid'
          });
          done();
        });
    });

    it('image url is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            imageUrl:
              'The center must have an image'
          });
          done();
        });
    });

    it('description is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'description must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('description is less than 5', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'description must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('description is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: '',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'Center should have a description'
          });
          done();
        });
    });

    it('location is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekk',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location must be greater than 5 but less than 100 words'
          });
          done();
        });
    });

    it('location is less than 5', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekk',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location must be greater than 5 but less than 100 words'
          });
          done();
        });
    });

    it('location is invalid', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki%%^%^, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location can not include symbols except comma'
          });
          done();
        });
    });

    it('should return error message invalid input characters are entered', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Points #1',
          description: 'A world class event center/Hotel',
          facilities: 'Projector & Stage Lights, ^2 Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName: 'Center Name can only contain numbers and letters',
            description:
              'description can not include symbols except comma and full stop',
            facilities:
              'Facilities can not include symbols except comma which you should use to separate the faciities' // eslint-disable-line
          });
          done();
        });
    });

    it('should return error message invalid input characters are entered', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Points 1',
          description: 'A world class event center/Hotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'description can not include symbols except comma and full stop',
          });
          done();
        });
    });

    it('should return error message invalid input characters are entered', (done) => {
      request
        .put('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Points',
          description: 'A world class event center Hotel',
          facilities: 'Projector & Stage Lights, ^2 Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities:
              'Facilities can not include symbols except comma which you should use to separate the faciities' // eslint-disable-line
          });
          done();
        });
    });

    it('centername is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'The Center Name must be more than 5 characters but less than 20'
          });
          done();
        });
    });

    it('capcity must be number', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500E',
          cost: '60000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            capacity:
              'Center capacity can only contain numbers'
          });
          done();
        });
    });

    it('cost must be number', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '6000E0',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            cost:
              'Center cost can only contain numbers'
          });
          done();
        });
    });

    it('cost is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '500',
          cost: '',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            cost:
              'Center must have cost'
          });
          done();
        });
    });

    it('capacity is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            capacity:
              'Center capacity cannot be blank'
          });
          done();
        });
    });

    it('centername is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: '',
          description: 'A world class event centerHotel',
          facilities: 'Projector & Stage Lights, Sound',
          location: 'Lekki, Lagos',
          capacity: '4999',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            centerName:
              'Center Name cannot be blank'
          });
          done();
        });
    });

    it('facilities is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tip',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            facilities:
              'facilities must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('image url is not valid', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'imag'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            imageUrl:
              'The url is not valid'
          });
          done();
        });
    });

    it('image url is missing', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            imageUrl:
              'The center must have an image'
          });
          done();
        });
    });

    it('description is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'description must be greater than 5 but less than 1000 words'
          });
          done();
        });
    });

    it('description is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: '',
          facilities: 'tiptoe carpet',
          location: 'Lekki, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            description:
              'Center should have a description'
          });
          done();
        });
    });

    it('location is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekk',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location must be greater than 5 but less than 100 words'
          });
          done();
        });
    });

    it('location is less than 5', (done) => {
      request
        .post('/api/v1/centers')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki%%^%^, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location can not include symbols except comma'
          });
          done();
        });
    });

    it('location is less than 5', (done) => {
      request
        .put('/api/v1/centers/1')
        .set('x-access-token', userToken)
        .send({
          // Invalid characters
          centerName: 'Five Star',
          description: 'A world class event centerHotel',
          facilities: 'tiptoe carpet',
          location: 'Lekki%%^%^, Lagos',
          capacity: '55656',
          cost: '50000',
          imageUrl: 'image@image.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({
            location:
              'location can not include symbols except comma'
          });
          done();
        });
    });

    it('should return error when center is not found', (done) => {
      request
        .put('/api/v1/centers/0')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage'
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Center not Found');
          if (err) throw err;
          done();
        });
    });

    it('should return error when center is not found', (done) => {
      request
        .delete('/api/v1/centers/0')
        .set('x-access-token', userToken)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Center does not exist');
          if (err) throw err;
          done();
        });
    });

    it('should return success when center updates', (done) => {
      request
        .put('/api/v1/centers/1')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          facilities: 'Stage light',
          location: 'Ikeja',
          capacity: '500',
          imageUrl: 'https://wwww.image.com/centerImage'
        })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Successfully updated center');
          if (err) throw err;
          done();
        });
    });


    it('should return success when center updates', (done) => {
      request
        .put('/api/v1/centers/1')
        .set('x-access-token', userToken)
        .send({
          centerName: 'Five Points',
          description: 'A world class event center',
          location: 'Ikeja',
        })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Successfully updated center');
          if (err) throw err;
          done();
        });
    });

    it('should update center status', (done) => {
      request
        .put('/api/v1/centerStatus/1')
        .set('x-access-token', userToken)
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('ok');
          if (err) throw err;
          done();
        });
    });

    it('should return success when all centers are found', (done) => {
      request
        .get('/api/v1/centers')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Centers found');
          if (err) throw err;
          done();
        });
    });

    it('search center', (done) => {
      const query = {
        location: 'Ikeja',
        capacity: '200',
        capacityType: 'greater',
        facilities: 'car park'
      };
      request
        .get('/api/v1/centers')
        .send(query)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Centers found');
          if (err) throw err;
          done();
        });
    });
    it('search center', (done) => {
      const query = {
        location: 'Ikeja',
        capacity: '2000',
        capacityType: 'lesser',
        facilities: 'car park'
      };
      request
        .get('/api/v1/centers')
        .send(query)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Centers found');
          if (err) throw err;
          done();
        });
    });
    it('search center', (done) => {
      const query = {
        location: 'Ikeja',
        capacity: '2000',
        capacityType: 'equal',
        facilities: 'car park'
      };
      request
        .get('/api/v1/centers')
        .send(query)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Centers found');
          if (err) throw err;
          done();
        });
    });
    it('search center', (done) => {
      const query = {
        location: 'Ikeja',
        capacity: '2000',
        capacityType: 'between',
        facilities: 'car park',
        btwValue: '5000'
      };
      request
        .get('/api/v1/centers')
        .send(query)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Centers found');
          if (err) throw err;
          done();
        });
    });

    it('should return 400 when a center cannot be found', (done) => {
      request
        .get('/api/v1/centers/20')
        .set('x-access-token', userToken)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('No Center Found');
          if (err) throw err;
          done();
        });
    });

    it('should return 200 when a center is found', (done) => {
      request
        .get('/api/v1/centers/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body.message).deep.equal('Center found');
          if (err) throw err;
          done();
        });
    });

    it('should return status 200 when center is deleted', (done) => {
      request
        .delete('/api/v1/centers/2')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Center Deleted' });
          if (err) throw err;
          done();
        });
    });
  });
});
