import { MythicalWeaponStore } from "../../models/mythicalWeapon.model";

const store = new MythicalWeaponStore();

describe("Mythical Weapons Model", () => {
  beforeAll(async () => {
    console.log(process.env.ENV);
  });
  it("should have a getAllWeapons method", () => {
    expect(store.getAllWeapons).toBeDefined();
  });

  it("should have a getOneWeapon method", () => {
    expect(store.getOneWeapon).toBeDefined();
  });
  it("should have a deleteWeapon method", () => {
    expect(store.deleteWeapon).toBeDefined();
  });
  it("should have a updateWeapon method", () => {
    expect(store.updateWeapon).toBeDefined();
  });
  it("should have a createWeapon method", () => {
    expect(store.createWeapon).toBeDefined();
  });

  it("should create a new weapon", async () => {
    const result = await store.createWeapon({
      name: "Edet",
      type: "Godswill",
      weight: 20,
    });
    expect(result).toEqual([
      {
        id: 1,
        name: "Edet",
        type: "Godswill",
        weight: 20,
      },
    ]);
  });

  it("should return a list of weapons", async () => {
    const result = await store.getAllWeapons();
    expect(result).toEqual([
      {
        id: 1,
        name: "Edet",
        type: "Godswill",
        weight: 20,
      },
    ]);
  });

  it("should return one product", async () => {
    const result = await store.getOneWeapon(1);
    expect(result).toEqual([
      { id: 1, name: "Astrakhan", type: "Earth", weight: 1 },
    ]);
  });

  it("should delete a weapon", async () => {
    const result = await store.deleteWeapon(1);
    expect(result).toEqual([]);
  });
});
