import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  static encode(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static compare(db_password: string, login_password: string): boolean {
    return bcrypt.compareSync(login_password, db_password);
  }
}
