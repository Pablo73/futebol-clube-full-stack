import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

type users = {
  email: string;
  inssued: number;
};

const configJWT = {
  expiresIn: '8d',
  algorithm: 'HS256',
} as SignOptions;

const secretKey = process.env.JWT_SECRET || 'secret';

class Token {
  public static generateToken(payload: users): string {
    const generate = jwt.sign(payload, secretKey, configJWT);
    return generate as string;
  }

  public static validateToken(valueToken: string): string {
    const valid = jwt.verify(valueToken, secretKey);
    return valid as string;
  }

  public static decoderToken(valueToken: string): users {
    const valid = jwt.decode(valueToken);
    return valid as users;
  }
}

export default Token;
