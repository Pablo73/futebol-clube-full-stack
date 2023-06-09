import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { response } from 'express';
import { NotUnauthorizedException } from '../exections';
import ValidateToke from '../middlewares/validationToken';
import { UsersService } from '../services';
import { UsersController } from '../controller';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Router', () => {
  describe('Testa get/user/role', () => {
    describe('Testa se o token é valido', () => {

      afterEach(sinon.restore);

      it('Se o token não for informado Erro 401 com a mensagem Token not found', async () => {
        try {
        const response = await chai.request(app)
        .get('/login/role');
  
      } catch (error) {
        expect(error).to.be.instanceOf(NotUnauthorizedException);
        expect((error as NotUnauthorizedException).message).to.equal('Token not found');
        expect(response.status).to.be.equal(401);
      }
      });

      it('Se o token não for valido Erro 401 com a mensagem Token must be a valid token', async () => {
        try {
        const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'token-invalid');
  
      } catch (error) {
        expect(error).to.be.instanceOf(NotUnauthorizedException);
        expect((error as NotUnauthorizedException).message).to.equal('Token must be a valid token');
        expect(response.status).to.be.equal(401);
      }
      });

      it('Se o token for válido deve retornar a role do usuario', async () => {
        sinon.stub(UsersService, 'getRole').resolves('SuperAdmin');

        const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'token-valid');

        const res = {};
        const req = {
          params: {},
          body: {},
          query: {},
          headers: {},
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        const result = await UsersController.getRole(req, res);

        expect(result).to.deep.equal({ role: 'SuperAdmin' });

   
      });
    })
  })
});

 
