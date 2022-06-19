import client from "../database";

export type Weapon = {
  id?: number;
  name: string;
  weight: number;
  type: string;
};

export const MythicalWeaponStore = class {
  createWeapon = async (weapon: Weapon): Promise<Weapon[]> => {
    try {
      const con = await client.connect();
      const sql =
        "INSERT INTO mythical_weapons (name, weight, type) VALUES ($1, $2, $3) RETURNING *";
      const result = await con.query(sql, [
        weapon.name,
        weapon.weight,
        weapon.type,
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
      const sql = "SELECT * FROM mythical_weapons";
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
      const sql = "SELECT * FROM mythical_weapons WHERE id = $1";
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
        "UPDATE mythical_weapons SET name = $1, weight = $2, type = $3 WHERE id = $4 RETURNING *";
      const result = await con.query(sql, [
        weapon.name,
        weapon.weight,
        weapon.type,
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
      const sql = "DELETE FROM mythical_weapons WHERE id = $1 RETURNING *";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete weapon ${error}`);
    }
  };
};
