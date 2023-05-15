import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { UsersService } from '../services';
import Token from '../utils/token';

chai.use(chaiHttp);

const { expect } = chai;

const tokenMoch = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpbnNzdWVkIjoxNjgzOTgyMjQ3MDA0fQ.Bwn7hP0aGm3-7JtoZntig7SUfbzPWZi-IGXF2h9z61I'

describe('Valida token', () => {

  afterEach(sinon.restore);

  it('Testa o metodo generateToken', async() => {

    const tokenValid = await Token.generateToken({email: 'user@user.com', inssued: 1683982247004})
    const include = tokenValid.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')

    expect(include).to.be.equal(true);
  });

  it('Testa o metodo validateToken', async() => {

    const generateToken = await Token.generateToken({email: 'user@user.com', inssued: 1683982247004})

    const tokenValids = await Token.validateToken(generateToken)
   
    expect(tokenValids).to.be.contain({email: 'user@user.com', inssued: 1683982247004});
  });

  it('Testa o metodo decoderToken', async() => {

    const tokenValid = await Token.decoderToken(tokenMoch)

    expect(tokenValid.email).to.be.equal('user@user.com');
  });
});
