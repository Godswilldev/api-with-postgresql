import { config } from "dotenv";
import bcrypt, { hash } from "bcrypt";
import client from "../database";
config();

const { BCRYPT_PASSWORD, SALT_ROUNDS, PEPPER } = process.env;

export interface UsersModelProps {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
}

export const UserStore = class {
  createUser = async (user: UsersModelProps): Promise<UsersModelProps[]> => {
    try {
      const pepper = PEPPER !== undefined ? PEPPER : "";
      const saltRounds = SALT_ROUNDS !== undefined ? SALT_ROUNDS : 10;

      const conn = await client.connect();

      const sql =
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1,$2,$3,$4) RETURNING *";

      const hash = await bcrypt.hash(user.password + pepper, 10);

      console.log(hash);

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hash,
      ]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create user ${error}`);
    }
  };

  login = async (user: UsersModelProps): Promise<UsersModelProps | string> => {
    try {
      const pepper = PEPPER !== undefined ? PEPPER : "";

      const conn = await client.connect();

      const sql = "SELECT * FROM users WHERE email=($1)";

      const result = await conn.query(sql, [user.email]);

      if (result.rowCount != 0) {
        // meaning email was found in the database
        const validUser = result.rows[0];

        // check if password is valid
        const validPassword = await bcrypt.compare(
          user.password + pepper,
          validUser.password
        );

        return validPassword ? validUser : "Incorrect password";
      } else {
        // meaning email wasn't found in the database
        return "Email not found in the database";
      }
    } catch (error) {
      throw new Error(`Couldn't login ${error}`);
    }
  };
};
