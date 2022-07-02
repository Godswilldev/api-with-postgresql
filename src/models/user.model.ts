import { config } from "dotenv";
import bcrypt from "bcrypt";
import client from "../database";
import { AppError } from "../utils/appError";
config();

const { BCRYPT_PASSWORD, SALT_ROUNDS, PEPPER } = process.env;

export interface UsersModelProps {
  firstname?: string | null;
  lastname?: string | null;
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

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hash,
      ]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot create user ${error}`, 400);
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
      throw new AppError(`Couldn't login ${error}`, 401);
    }
  };

  getAllUsers = async () => {
    try {
      const conn = await client.connect();
      const sql = "SELECT id, firstname, lastname, email FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Couldn't get users ${error}`, 500);
    }
  };

  getUser = async (userId: string) => {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT id, firstname, lastname, email FROM users WHERE id=($1)";
      const res = await conn.query(sql, [userId]);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new AppError(`Cannot get User ${error}`, 400);
    }
  };

  editUser = async (
    id: string,
    { firstname, lastname, email }: UsersModelProps
  ) => {
    const conn = await client.connect();

    let sql =
      "UPDATE users SET firstname = ($2), lastname = ($3), email=($4) WHERE id=($1) RETURNING id, firstname, lastname, email";

    let result = await conn.query(sql, [id, firstname, lastname, email]);

    conn.release();

    return result.rows;
  };

  deleteUser = async (userId: string) => {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const res = await conn.query(sql, [userId]);
      conn.release();

      return res.rowCount === 0 ? "User no longer exists" : res.rows;
    } catch (error) {
      throw new AppError(`Cannot DELETE User ${error}`, 400);
    }
  };
};
