import Client from "../database";

export interface Weapon {
  id: Number;
  name: string;
  weight: number;
  type: string;
}

export const MythicalWeaponStore = class {
  createWeapon = async (weapon: Weapon): Promise<Weapon[]> => {
    try {
      const con = await Client.connect();
      const sql =
        "INSERT INTO mythical_worlds (name, weight, type) VALUES ($1, $2, $3) RETURNING *";
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
      const con = await Client.connect();
      const sql = "SELECT * FROM mythical_worlds";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  };

  getOneWeapon = async (id: string): Promise<Weapon[]> => {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM mythical_worlds WHERE id = $1";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapon ${error}`);
    }
  };

  updateWeapon = async (weapon: Weapon): Promise<Weapon[]> => {
    try {
      const con = await Client.connect();
      const sql =
        "UPDATE mythical_worlds SET name = $1, weight = $2, type = $3 WHERE id = $4 RETURNING *";
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

  deleteWeapon = async (id: string): Promise<Weapon[]> => {
    try {
      const con = await Client.connect();
      const sql = "DELETE FROM mythical_worlds WHERE id = $1 RETURNING *";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete weapon ${error}`);
    }
  };
};
