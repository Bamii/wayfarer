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
})
