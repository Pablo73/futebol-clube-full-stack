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

chai.use(chaiHttp);

const { expect } = chai;

describe('User Router', () => {
  describe('Testa get/user/role', () => {
    describe('Testa se o token é valido', () => {
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
   
      });
    })
  })
});

 
