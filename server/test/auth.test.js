const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication and Authorization Tests', () => {
  let token = '';

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'testpass' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('username', 'testuser');
        expect(res.body).to.have.property('email', 'test@example.com');
        done();
      });
  });

  it('should login with valid credentials', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'testpass' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        token = res.body.token; // Save token for future requests
        done();
      });
  });

  it('should access protected route with valid token', (done) => {
    chai.request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.includes('Welcome');
        done();
      });
  });

  // more test cases as needed
});
