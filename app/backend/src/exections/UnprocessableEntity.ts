import HttpException from './HttpException';

export default class UnprocessableEntity extends HttpException {
  private static status = 422;

  constructor(message?: string) {
    super(UnprocessableEntity.status, message || 'Unauthorized');
  }
}
