const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect, assert, request } = chai;
const baseURI = '/api/v1/auth';

let should = chai.should();
chai.use(chaiHttp);

describe('Trip', function() {
  describe('POST /trips', () => {
    it('it should create a new trip if the user is an admin', done => {
      done();
    });

    it('it should not create a new trip if the user is not admin', done => {
      done();
    });

    it('it should not succeed if ANY of the required fields are not present', done => {
      done();
    });
  });

  describe('GET /trips', () => {
    it('it should return all the trips on the system', done => {
      done();
    });

    it('it should not return an error if the user is not signed in', done => {
      done();
    });
  });

  describe('PATCH /trips/:tripsId', () => {
    it('it should cancel the trip if the user is an admin', done => {
      done();
    });

    it('it should not cancel the trip if the user is not an admin', done => {
      done();
    });

    it('it should return an error if the the Trip ID does not exist in the db', done => {
      done();
    })
  });

  describe('GET /destination/:destination', () => {
    it('it should return all the trips with the target destination', done => {
      done();
    });
  })

  describe('GET /origin/:origin', () => {
    it('it should return all the trips with the target origin', done => {
      done();
    });
  })
})
