import HttpException from './HttpException';

export default class NotUnauthorizedException extends HttpException {
  private static status = 401;

  constructor(message?: string) {
    super(NotUnauthorizedException.status, message || 'Unauthorized');
  }
}
