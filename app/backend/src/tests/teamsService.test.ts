import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamsService from '../services';
import TeamsModel, { TeamsAtributes } from '../database/models/teamsModel';
import { teams, team } from './mocha/teamsServiceMocha'
import NotFoundException from '../exections/NotFound';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida pasta teamsService', () => {

  afterEach(sinon.restore);

  it('Testa o metodo getAll com retorn vazio', async () => {

    sinon.stub(TeamsModel, 'findAll').resolves([]);

    const result = await TeamsService.getAll();
    
    expect(result).to.be.deep.equal([]);

  });

  it('Testa o metodo getById com retorno populado', async () => {

    const teamInstances = teams.map((team) => TeamsModel.build(team));

    sinon.stub(TeamsModel, 'findAll').resolves(teamInstances);

    const result = await TeamsService.getAll();
    
    expect(result).to.deep.equal(teamInstances);

  });

  it('Testa o metodo getById que não existe', async () => {

    const nonExistentId = 100;
    sinon.stub(TeamsModel, 'findOne').resolves(null);
  
    try {
      await TeamsService.getById(nonExistentId);
      
    } catch (error) {
  
      expect(error).to.be.instanceOf(NotFoundException);
      expect((error as NotFoundException).message).to.equal('Team not found!');
    }

  });

  it('Testa o metodo getById', async () => {

    const teamInstance = TeamsModel.build(team);

    sinon.stub(TeamsModel, 'findOne').resolves(teamInstance);

    const result = await TeamsService.getById(3);
    
    expect(result).to.deep.equal(teamInstance);

  });

});
