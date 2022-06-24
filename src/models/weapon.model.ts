import client from "../database";

export type Weapon = {
  id?: number;
  name: string;
  type: string;
  weight: number;
};

export const WeaponStore = class {
  createWeapon = async (weapon: Weapon): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql =
        "INSERT INTO weapons (name, type, weight) VALUES ($1, $2, $3) RETURNING *";
      const result = await con.query(sql, [
        weapon.name,
        weapon.type,
        weapon.weight,
      ]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create weapon ${error}`);
    }
  };

  getAllWeapons = async (): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM weapons";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  };

  getOneWeapon = async (id: number): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM weapons WHERE id = $1";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapon ${error}`);
    }
  };

  updateWeapon = async (weapon: Weapon): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql =
        "UPDATE weapons SET name = $1, type = $2, weight = $3 WHERE id = $4 RETURNING *;";
      const result = await con.query(sql, [
        weapon.name,
        weapon.type,
        weapon.weight,
        weapon.id,
      ]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot update weapon ${error}`);
    }
  };

  deleteWeapon = async (id: number): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql = "DELETE FROM weapons WHERE id = $1";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete weapon ${error}`);
    }
  };
};
