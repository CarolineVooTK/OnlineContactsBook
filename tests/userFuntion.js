/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/User');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

// let user1 = User.create({
//   email: 'abc@hotmail.com',
//   password: '123456789'
// });

describe('Users', () => {
  after(async () => {
    await User.deleteMany();
  });

  describe('POST /api/login', () => {
    it('should return a token and status success', done => {
      const user = {
        email: 'abc@hotmail.com',
        password: '123456789'
      };
      chai
        .request(server)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.article.should.have.property('token');
          done();
        });
    });
  });
});
