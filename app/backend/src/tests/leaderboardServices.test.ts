import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import sequelize from '../database/models';
import LeaderBoardService from '../services/leaderboardServices';
import { QueryTypes } from 'sequelize';
import getTeamsHome from '../services/query/queryGetTeamsHome';
import { homeTeamMocha } from './mocha/LeaderBoardServiceMocha';
import getAllAway from '../services/query/queryGetAllTeamsAway';
import getAll from '../services/query/queryGetAll';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida arquivo LeaderBoardService', () => {

  afterEach(sinon.restore);

  it('Testa o metodo getAllHome', async () => {

    const mockQuery = sinon.stub(sequelize, 'query').resolves(homeTeamMocha as any) 

    const result = await LeaderBoardService.getAllHome();

    expect(mockQuery.calledWith(getTeamsHome, { type: QueryTypes.SELECT })).to.be.true;
    expect(result).to.be.deep.equal(homeTeamMocha);

  });

  it('Testa o metodo getAllAway', async () => {

    const mockQuery = sinon.stub(sequelize, 'query').resolves(homeTeamMocha as any) 

    const result = await LeaderBoardService.getAllAway();

    expect(mockQuery.calledWith(getAllAway, { type: QueryTypes.SELECT })).to.be.true;
    expect(result).to.be.deep.equal(homeTeamMocha);

  });

  it('Testa o metodo getAll', async () => {

    const mockQuery = sinon.stub(sequelize, 'query').resolves(homeTeamMocha as any) 

    const result = await LeaderBoardService.getAll();

    expect(mockQuery.calledWith(getAll, { type: QueryTypes.SELECT })).to.be.true;
    expect(result).to.be.deep.equal(homeTeamMocha);

  });

});