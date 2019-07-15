const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect, assert, request } = chai;
const baseURI = '/api/v1/auth';

let should = chai.should();
chai.use(chaiHttp);

const mockData = {
  signup: {
    email: 'bzepmi@ffsaa.com',
    password: 'random-string',
    first_name: 'ayobami',
    last_name: 'salami',
    is_admin: false
  },
  signin: {
    email: 'cbhgs@dfd.com',
    password: 'random-string'
  }
};

describe('User', function() {
  describe('/POST /auth/signin', function() {
    it.skip('it should sign the user in', done => {
      chai
        .request(server)
        .post(`${baseURI}/signin`)
        .send(mockData.signin)
        .end((err, res) => {
          const { status, data } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('object');
          should.exist(data.token);
          should.exist(data.user_id);
          data.token.should.be.a('string');
          data.user_id.should.be.a('number');
          done();
        });
    });

    it.skip('it should not sign the user in if there are ANY fields missing.', done => {
      const mockDataClone = Object.assign({}, mockData.signin);
      delete mockDataClone.email;

      chai
        .request(server)
        .post(`${baseURI}/signin`)
        .send(mockDataClone)
        .end((err, res) => {
          const { status, error, missingFields } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          error.should.be.a('string');
          error.should.equal('1 field(s) are missing!');
          should.exist(status);
          status.should.equal('error');
          should.exist(missingFields);
          missingFields.should.be.an('array');
          done();
        });
    });
  });

  describe('/POST /auth/signup', function() {
    it.skip('should register a new user', done => {
      chai
        .request(server)
        .post(`${baseURI}/signup`)
        .send(mockData.signup)
        .end((err, res) => {
          const { status, data } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');

          status.should.eql('success');
          should.exist(data);
          data.should.be.an('object');
          should.exist(data.token);
          data.token.should.be.a('string');
          should.exist(data.user_id);
          data.user_id.should.be.a('number');
          done();
        });
    });

    it.skip('it should not register the user if there are ANY missing fields.', done => {
      let mockDataClone = Object.assign({}, mockData.signup);
      const randomKey = Math.floor(Math.random() * Object.keys(mockDataClone).length);
      delete mockDataClone[Object.keys(mockDataClone)[randomKey]];

      chai
        .request(server)
        .post(`${baseURI}/signup`)
        .send(mockDataClone)
        .end((err, res) => {
          const { status, error, missingFields } = res.body;

          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');

          status.should.eql('error');
          should.exist(error);
          should.exist(missingFields);
          error.should.be.a('string');
          error.should.eql('1 field(s) are missing!');
          missingFields.should.be.an('array');
          done();
        });
    });

    it.skip("it should not register the user if there's a user with the same email on the system", done => {
      chai
        .request(server)
        .post(`${baseURI}/signup`)
        .send(mockData.signup)
        .end((err, res) => {
          const { status, error } = res.body;

          should.not.exist(err);
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('application/json');
          res.status.should.eql(200);

          status.should.eql('error');
          should.exist(error);
          error.should.be.a('string');
          error.should.equal('This email exists already in our database.');
          done();
        });
    });
  });
});
