import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UsersModel from '../database/models/userModel';
import { UsersService } from '../services';
import { LoginBody } from '../types/typeUsers';
import Token from '../utils/token';


chai.use(chaiHttp);

const { expect } = chai;

describe('Valida pasta loginServices', () => {

  afterEach(sinon.restore);

  it('Testa o metodo validPassoword', async () => {

    const value: LoginBody = {
        email: 'test@example.com',
        password: 'password',
      };

      const user = {
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      sinon.stub(UsersModel, 'findOne').resolves(user as any);
      sinon.stub(Token, 'generateToken').returns('validToken');

      const result = await UsersService.validPassoword(value);

      expect(result).to.equal('validToken');

  });

});