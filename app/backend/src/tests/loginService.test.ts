import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UsersModel from '../database/models/userModel';
import { UsersService } from '../services';
import { LoginBody } from '../types/typeUsers';
import Token from '../utils/token';
import { NotUnauthorizedException } from '../exections';
import { dbUser } from './mocha/userServiceMocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida arquivo loginServices', () => {

  afterEach(sinon.restore);

  it('Testa o metodo validPassoword passando um email e password validos', async () => {
    const value: LoginBody = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };

      const user = {
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      };

      sinon.stub(UsersModel, 'findOne').resolves(user as any);
      sinon.stub(Token, 'generateToken').returns('validToken');

      const result = await UsersService.validPassoword(value);

      expect(result).to.equal('validToken');
  });
  
  it('Testa o metodo validPassoword passando um email invalido', async () => {
    const value: LoginBody = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    };

      sinon.stub(UsersModel, 'findOne').resolves(null);

      try {
        await UsersService.validPassoword(value);
        
      } catch (error) {
    
        expect(error).to.be.instanceOf(NotUnauthorizedException);
        expect((error as NotUnauthorizedException).message).to.equal('Invalid email or password');
      }
    });

    it('Testa o metodo validPassoword passando um password invalido', async () => {
      const value: LoginBody = {
          email: 'invalid@invalid.com',
          password: 'invalid_password',
        };

        const user = {
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        };
  
        sinon.stub(UsersModel, 'findOne').resolves(user as any);
  
        try {
          await UsersService.validPassoword(value);
          
        } catch (error) {
      
          expect(error).to.be.instanceOf(NotUnauthorizedException);
          expect((error as NotUnauthorizedException).message).to.equal('Invalid email or password');
        }
      });

it('Testa o metodo getRole com valores validos', async () => {

  sinon.stub(UsersModel, 'findOne').resolves(dbUser[0] as any);

  const tokenMoch = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpbnNzdWVkIjoxNjgzOTgyMjQ3MDA0fQ.Bwn7hP0aGm3-7JtoZntig7SUfbzPWZi-IGXF2h9z61I'

  const result = await UsersService.getRole(tokenMoch);

  expect(result).to.deep.equal('SuperAdmin');


  });

  it('Testa o metodo getRole com valores invalidos', async () => {

    sinon.stub(UsersModel, 'findOne').resolves(null);
  
    const tokenMoch = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpbnNzdWVkIjoxNjgzOTgyMjQ3MDA0fQ.Bwn7hP0aGm3-7JtoZntig7SUfbzPWZi-IGXF2h9z61I'
  
    try {
      const result = await UsersService.getRole(tokenMoch);
      
    } catch (error) {
  
      expect(error).to.be.instanceOf(NotUnauthorizedException);
      expect((error as NotUnauthorizedException).message).to.equal('Token must be a valid token');
    }
    });
});