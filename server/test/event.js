/* eslint-disable */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

let userToken;
const request = supertest(app);

describe('test for post, update, get and delete event processes', () => {
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

  describe(
    'test for undefined, empty and invalid inputs on event creation',
    () => {
      it('should return an error when some fields are undefined', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'birthday party',
            centerId: '1'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message)
              .to.deep.equal('All or Some Fields are Undefined');
          });
      });

      it('should return an error when fields are enpty', (done) => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: '',
            centerId: '',
            description: '',
            dateArray: []
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.eventTitle)
            .to.deep.equal('Event Name cannot be blank');
          expect(res.body.centerId).equal('Please select a Center');
          expect(res.body.dateArray).equal('Date cannot be empty');
          expect(res.body.description).equal('Event should have a description');
            
                done();
          });
      });   

      it(
        'should return an error',
        (done) => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Fun',
              centerId: 'A',
              description: 'Come',
              dateArray: ['12-2012']
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body).to.not.equal(null);
              expect(res.body.eventTitle)
                .to.deep.equal('The event Name must be more than 5 characters but less than 20');
              expect(res.body.centerId).equal('centerId must be a number');
              expect(res.body.dateArray).equal('Invalid Date');
              expect(res.body.description).equal('description must be greater than 5 but less than 1000 words');
                
                done();
              });
        }
      );

      it(
        'should return an error when fields contains unacceptable characters', //eslint-disable-line
        (done) => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Fun$%dfg',
              centerId: '1',
              description: 'Come have fun***',
              dateArray: ['12/12/2012']
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.eventTitle)
              .to.deep.equal('Event Name can only contain numbers and letters');
            expect(res.body.description).equal('description can not include symbols except comma and full stop');
             
            done();   
          });
        }
      );

    });

  describe('test for successful event creation', () => {
    it('should return success when event is created', (done) => {
      request
        .post('/api/v1/events')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Funny Day',
          centerId: '1',
          description: 'Come and have fun',
          dateArray: ['2018-04-15']
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('Event booked Successfully');
          
          done();
        });
    });
  });

  describe('test for unsuccessful event creation', () => {
    it('should return error when event date is already booked', (done) => {
      request
        .post('/api/v1/checkDate')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Seminar',
          centerId: '1',
          description: 'Come and be exposed',
          bookedDate: ['2018-04-15']
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('The date chosen is booked, Please select another day or center');
          
          done();
        });
    });
  });

  describe('test for invalid inputs on event modification', (done) => {
    it(
      'should return an error',
      (done) => {
        request
          .put('/api/v1/events/1')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Fun',
            description: 'Come',
            bookedDate: ['12-2012'],
            centerId: 'a'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body.eventTitle)
              .to.deep.equal('The event Name must be more than 5 characters but less than 20');
            expect(res.body.bookedDate).equal('Invalid Date');
            expect(res.body.centerId).equal('centerId must be a number');
            expect(res.body.description).equal('description must be greater than 5 but less than 1000 words');
              
              done();
            });
      }
    );

    it(
      'should return an error when fields contains unacceptable characters', //eslint-disable-line
      (done) => {
        request
          .put('/api/v1/events/1')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Fun$%dfg',
            centerId: '1',
            description: 'Come have fun***',
            bookedDate: ['12/12/2012']
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.eventTitle)
            .to.deep.equal('Event Name can only contain numbers and letters');
          expect(res.body.description).equal('description can not include symbols except comma and full stop');
           
          done();   
        });
      }
    );

    it(
      'check for null value',
      (done) => {
        request
          .put('/api/v1/events/1')
          .set('x-access-token', userToken)
          .send({
            eventTitle: '',
            centerId: 'a'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.centerId).equal('centerId must be a number');
           
          done();   
        });
      }
    );
  });

  describe('test for result on event modification', () => {
    it('should return error when event is not found', (done) => {
      request
        .put('/api/v1/events/2')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Birthday',
          centerId: '1',
          description: 'Come and have fun',
          dateArray: ['2018-04-15']
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('Event does not exist');
          
          done();
        });
    });

    it('should return success when changes is applied successfully', (done) => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({})
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('Changes Applied');
          
          done();
        });
    });
  });

  describe('test for getting events', () => {
    it('should return all events booked by all users', (done) => {
      request
        .get('/api/v1/events')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Event found');
          
          done();
        });
    });

    it('should return all events booked in a center', (done) => {
      request
        .get('/api/v1/centerEvents/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Center events found');
          
          done();
        });
    });

    it('should return all events booked by the user', (done) => {
      request
        .get('/api/v1/userEvents/0')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('User events found');
          
          done();
        });
    });

    it('should return a single event booked by the user', (done) => {
      request
        .get('/api/v1/events/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Event Found');
          
          done();
        });
    });

    it('should return a success when event is approved', (done) => {
      request
        .put('/api/v1/approveEvent/1')
        .set('x-access-token', userToken)
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Event Approved');
          
          done();
        });
    });

    it('should return a success when event is approved', (done) => {
      request
        .put('/api/v1/approveEvent/1')
        .set('x-access-token', userToken)
        .send({eventTitle: 'Planning', isApproved: true, userId: 1 })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Event Approved');
          
          done();
        });
    });

    it('should return a success when event count is gotten', (done) => {
      request
        .get('/api/v1/eventsbookedcount/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Events found');
          
          done();
        });
    });
  });

  describe('test for delete actions', () => {
    it('should return status 200 when event has been deleted', (done) => {
      request
        .delete('/api/v1/events/1')
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).equal('Event Deleted');
          
          done();
        });
    });
  });
});
