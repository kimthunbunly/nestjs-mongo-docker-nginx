import 'dotenv/config';

export class AppConfig {
  static readonly APP_PORT = process.env.APP_PORT || 3000;
  static readonly MONGODB_URL = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?serverSelectionTimeoutMS=2000&authSource=admin`;
  static readonly JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
}
