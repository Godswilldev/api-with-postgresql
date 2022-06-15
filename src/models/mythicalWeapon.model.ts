import Client from "../database";

export interface Weapon {
  id: Number;
  name: string;
  weight: number;
  type: string;
}
export class MythicalWeaponStore {
  public async index(): Promise<Weapon[]> {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM mythical_worlds";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }
}
