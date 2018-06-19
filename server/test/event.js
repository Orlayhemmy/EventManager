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
          if (err) throw err;
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

      it('should return an error when eventTitle is empty', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: '',
            centerId: '1',
            description: 'Come have fun',
            dateArray: '12/12/2012'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message)
              .to.deep.equal('Event Name cannot be blank');
          });
      });

      it(
        'should return an error when eventTitle has less than 5 characters',
        () => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Fun',
              centerId: '1',
              description: 'Come have fun',
              dateArray: '12/12/2012'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.not.equal(null);
              expect(res.body.message)
                .to.deep.equal('The event Name must be more than 5 characters but less than 20'); //eslint-disable-line
            });
        }
      );

      it(
        'should return an error when eventTitle contains unacceptable characters', //eslint-disable-line
        () => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Fun$%dfg',
              centerId: '1',
              description: 'Come have fun',
              dateArray: '12/12/2012'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.not.equal(null);
              expect(res.body.message)
                .to.deep.equal('Event Name can only contain numbers and letters'); //eslint-disable-line
            });
        }
      );

      it('should return an error when description is empty', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Birthday Party',
            centerId: '1',
            description: '',
            dateArray: '12/12/2012'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message)
              .to.deep.equal('Event should have a description');
          });
      });

      it(
        'should return an error when description has less than 5 characters',
        () => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Funny Day',
              centerId: '1',
              description: 'Come',
              dateArray: '12/12/2012'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.not.equal(null);
              expect(res.body.message)
                .to.deep.equal('description must be greater than 5 but less than 1000 words'); //eslint-disable-line
            });
        }
      );

      it(
        'should return an error when description contains unacceptable characters', //eslint-disable-line
        () => {
          request
            .post('/api/v1/events')
            .set('x-access-token', userToken)
            .send({
              eventTitle: 'Fun Day',
              centerId: '1',
              description: 'Come have fun$##',
              dateArray: '12/12/2012'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.not.equal(null);
              expect(res.body.message)
                .to.deep.equal('description can not include symbols except comma and full stop'); //eslint-disable-line
            });
        }
      );

      it('should return an error when bookedDate is empty', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Birthday Party',
            centerId: '1',
            description: 'Come and have fun',
            dateArray: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).to.deep.equal('Date cannot be empty');
          });
      });

      it('should return an error when bookedDate is invalid', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Birthday Party',
            centerId: '1',
            description: 'Come and have fun',
            dateArray: '230/34/13243'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).to.deep.equal('Invalid Date');
          });
      });

      it('should return an error when center is empty', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Birthday Party',
            centerId: '',
            description: 'Come and have fun',
            dateArray: '23/12/2012'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).to.deep.equal('Please select a Center');
          });
      });

      it('should return an error when centerId is invalid', () => {
        request
          .post('/api/v1/events')
          .set('x-access-token', userToken)
          .send({
            eventTitle: 'Birthday Party',
            centerId: 'a',
            description: 'Come and have fun',
            dateArray: '23/12/2012'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).to.deep.equal('centerId must be a number');
          });
      });
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
          if (err) throw err;
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
          if (err) throw err;
          done();
        });
    });
  });

  describe('test for invalid inputs on event modification', () => {
    it('should return an error when eventTitle has less than 5 characters', () => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Fun',
          centerId: '1',
          description: 'Come have fun',
          dateArray: ['12/12/2012']
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('The event Name must be more than 5 characters but less than 20');
        });
    });

    it('should return an error when eventTitle contains unacceptable characters', () => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Fun$%dfg',
          centerId: '1',
          description: 'Come have fun',
          dateArray: '12/12/2012'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('Event Name can only contain numbers and letters');
        });
    });

    it('should return an error when description has less than 5 characters', () => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Funny Day',
          centerId: '1',
          description: 'Come',
          dateArray: ['12/12/2012']
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('description must be greater than 5 but less than 1000 words');
        });
    });

    it('should return an error when description contains unacceptable characters', () => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Fun Day',
          centerId: '1',
          description: 'Come have fun$##',
          dateArray: ['12/12/2012']
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('description can not include symbols except comma and full stop');
        });
    });

    // it('should return an error when bookedDate is invalid', () => {
    //   request
    //     .put('/api/v1/events/1')
    //     .set('x-access-token', userToken)
    //     .send({
    //       eventTitle: 'Birthday Party',
    //       centerId: '1',
    //       description: 'Come and have fun',
    //       dateArray: ['230']
    //     })
    //     .expect(400)
    //     .end((err, res) => {
    //       expect(res.body).to.have.property('message');
    //       expect(res.body.message).to.not.equal(null);
    //       expect(res.body.message).to.deep.equal('Invalid Date');
    //     });
    // });
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
          if (err) throw err;
          done();
        });
    });

    it('should return success when changes is applied successfully', (done) => {
      request
        .put('/api/v1/events/1')
        .set('x-access-token', userToken)
        .send({
          eventTitle: 'Funny Day',
          centerId: '1',
          description: 'Come and have fun',
          dateArray: ['2018-04-15']
        })
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.deep.equal('Changes Applied');
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
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
          if (err) throw err;
          done();
        });
    });
  });

  doAfterTest();
});
