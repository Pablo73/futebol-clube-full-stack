import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModel from '../database/models/matchesModel';
import { MatchesServices } from '../services';
import { matches, newMatch, newMatchError } from './mocha/matcheSericesMocha';
import { BadRequestException, NotFoundException } from '../exections';
import TeamsModel from '../database/models/teamsModel';
import { teams } from './mocha/teamsServiceMocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida arquivo matchesServices', () => {

  afterEach(sinon.restore);

  it('Testa o metodo getAll com retorn vazio', async () => {

    sinon.stub(MatchesModel, 'findAll').resolves([]);

    const result = await MatchesServices.getAll();
    
    expect(result).to.be.deep.equal([]);

  });

  it('Testa o metodo getAll com retorn populado', async () => {

    const matchesInstances = matches.map((matche) => MatchesModel.build(matche));

    sinon.stub(MatchesModel, 'findAll').resolves(matchesInstances);

    const result = await MatchesServices.getAll();
    
    expect(result).to.be.deep.equal(matchesInstances);

  });

  it('Testa o metodo getAllMatches for diferente de true ou false retorna erro', async () => {

    const params = 'notBoolen';
    sinon.stub(MatchesModel, 'findAll').resolves(undefined);
  
    try {
        await MatchesServices.getAllMatches(params);
 
    } catch (error) {
  
      expect(error).to.be.instanceOf(BadRequestException);
      expect((error as BadRequestException).message).to.equal('Bad request');
    }

  });


  it('Testa o metodo getAllMatches com partidas true', async () => {

    const matchesInstances = matches.map((matche) => MatchesModel.build(matche));
    const teamInstances = teams.map((team) => TeamsModel.build(team));

    sinon.stub(MatchesModel, 'findAll').resolves(matchesInstances);
    sinon.stub(TeamsModel, 'findAll').resolves(teamInstances);

    const result = await MatchesServices.getAllMatches('true');
    
    expect(result).to.be.deep.equal(matchesInstances);

  });

  it('Testa o metodo getAllMatches com partidas false', async () => {

    const matchesInstances = matches.map((matche) => MatchesModel.build(matche));
    const teamInstances = teams.map((team) => TeamsModel.build(team));

    
    sinon.stub(MatchesModel, 'findAll').resolves(matchesInstances);
    sinon.stub(TeamsModel, 'findAll').resolves(teamInstances);
    
    const result = await MatchesServices.getAllMatches('false');
    
    expect(result).to.be.deep.equal(matchesInstances);

});

  it('Testa o metodo MatchesFinish', async () => {

    const updateStub = sinon.stub(MatchesModel, 'update').resolves([1]);
    
    const result = await MatchesServices.MatchesFinish(1);

    expect(updateStub.calledOnce).to.be.true;
    expect(updateStub.calledWith({ inProgress: false }, { where: { id: 1 } })).to.be.true;
    
    expect(result).to.equal('Finished');
});

it('Testa o metodo MatchesUpdateGoals', async () => {

const gols = {
    homeTeamGoals: 2,
    awayTeamGoals: 3,
}

    const updateStub = sinon.stub(MatchesModel, 'update').resolves([1]);
    
    const result = await MatchesServices.MatchesUpdateGoals(1, gols);

    expect(updateStub.calledOnce).to.be.true;
    expect(updateStub.calledWith(  { homeTeamGoals: 2, awayTeamGoals: 3 },
      { where: { id: 1 } },)).to.be.true;
    
    expect(result).to.equal('updated Goals');
});

it('Testa o metodo createMatches', async () => {

    const createStub = sinon.stub(MatchesModel, 'create').resolves(new MatchesModel(newMatch));

    const result = await MatchesServices.createMatches(newMatch);

    expect(createStub.calledOnceWith(newMatch)).to.be.true;
    expect(result).to.deep.equal(new MatchesModel(newMatch));

    });

    it('testa se al tentar crear uma partida com times que não estão cadastrados gera um erro', async () => {
    
        sinon.stub(MatchesModel, 'create').throws();

        let error: Error | undefined;

        try {
          await MatchesServices.createMatches(newMatchError);
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundException);
            expect((error as NotFoundException).message).to.equal('There is no team with such id!');
        }
    
      });

});