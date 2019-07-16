const chai = require('chai');
const chaiHttp = require('chai-http');
const debug = require('debug')('app:booking_test');
const server = require('../server');

const baseURI = '/api/v1/bookings';

let should = chai.should();
chai.use(chaiHttp);

const mockData = {
  createBooking: {
    "trip_id": 3
  },
  signin: {
    email: 'cbhgs@dfd.com',
    password: 'random-string'
  },
  admin: {
    "email": "b@d.com",
    "password": "random-string",
  },
  patchData: {
    "seat_no": 10
  }
}

let token;
let na_token; // non-admin
let id;

describe.skip('Booking', function () {
  this.beforeAll('first_hook', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(mockData.admin)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
    
  this.beforeAll('second_hook', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(mockData.signin)
      .end((err, res) => {
        na_token = res.body.data.token;
        done();
      });
  });

  describe('POST /bookings', () => {
    it('it should create a new booking for the user', done => {
      chai
        .request(server)
        .post(`${baseURI}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(mockData.createBooking)
        .end((err, res) => {
          const { status, data } = res.body;
          const { trip_id, bus_id, origin, destination, fare, booking_id, seat_no, user_id  } = data;

          id = booking_id;
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('object');

          trip_id.should.be.a('number');
          bus_id.should.be.a('number');
          origin.should.be.a('string');
          destination.should.be.a('string');
          fare.should.be.a('number');
          booking_id.should.be.a('number');
          seat_no.should.be.a('number');
          user_id.should.be.a('number');
          done();
        });
    });

    it('it should not succeed if ANY of the required fields are not present', done => {
      const cloneMockData = Object.assign({}, mockData.createBooking);
      delete cloneMockData.trip_id;

      chai
        .request(server)
        .post(`${baseURI}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(cloneMockData)
        .end((err, res) => {
          const { status, error, missingFields } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('error');
          should.exist(error);
          should.exist(missingFields);
          error.should.be.a('string');
          error.should.eql('1 field(s) are missing!');
          missingFields.should.be.an('array');
          done();
        });
    });

    after((done) => {
      chai
        .request(server)
        .delete(`/api/v1/bookins/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          done();
        });
    });
  });

  describe('GET /bookings', () => {
    this.beforeAll((done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send(mockData.createBooking)
        .end((err, res) => {
          done();
        });
    });

    it('for admin, it should return all the bookings on the system', done => {
      chai
        .request(server)
        .get(`${baseURI}/`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { status, data } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('array');
          // data.array.length.should.be(4);
          // data.array.length.should.be(1);
          done();
        });
    });

    it("for non-admin, it should return only the user's bookings", done => {
      chai
        .request(server)
        .get(`${baseURI}/`)
        .set('Authorization', `Bearer ${na_token}`)
        .end((err, res) => {
          const { status, data } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('array');
          // data.array.length.should.be(0);
          done();
        });
    });
  });

  describe('DELETE /bookings/:bookingId', () => {
    it('it should delete the booking if the user has a booking with that id', done => {
      done();
    });

    it('it should not delete the booking if the user does not have a booking with that id', done => {
      done();
    });
  })

  describe('PATCH /bookings/:bookindId', () => {
    it.skip('it should change the users seat on the booking if the booking id is valid', done => {
      chai
        .request(server)
        .patch(`${baseURI}/bookings/`)
        .set('Authorization', `Bearer ${na_token}`)
        .end((err, res) => {
          const { status, data } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('array');
          data.array.length.should.be(0);
          done();
        });
    });

    it("it should not change the seat number is the booking ID is invalid or doesn't belong to the user", done => {
      chai
        .request(server)
        .delete(`${baseURI}/100000000`)
        .set('Authorization', `Bearer ${na_token}`)
        .end((err, res) => {
          const { status, error } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(401);

          status.should.eql('error');
          should.exist(error);
          error.should.be.a('string');
          error.should.eql('You have no booking with this ID on our system!')
          done();
        });
    });

    it("it should not succeed if ANY of the required values are missing", done => {
      const cloneMockData = Object.assign({}, mockData.patchData);
      delete cloneMockData.seat_no;

      chai
        .request(server)
        .patch(`${baseURI}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send(cloneMockData)
        .end((err, res) => {
          const { status, error, missingFields } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('error');
          should.exist(error);
          should.exist(missingFields);
          error.should.be.a('string');
          error.should.eql('1 field(s) are missing!');
          missingFields.should.be.an('array');
          done();
        });
    })
  });
})
