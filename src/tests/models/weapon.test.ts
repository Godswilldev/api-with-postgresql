import { WeaponStore } from "../../models/weapon.model";

const store = new WeaponStore();

describe("Weapons Model", () => {
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
      name: "AK47",
      type: "GUN",
      weight: 20,
    });
    expect(result).toEqual([
      {
        id: 1,
        name: "AK47",
        type: "GUN",
        weight: 20,
      },
    ]);
  });

  it("should return a list of weapons", async () => {
    const result = await store.getAllWeapons();
    expect(result).toEqual([
      {
        id: 1,
        name: "AK47",
        type: "GUN",
        weight: 20,
      },
    ]);
  });

  it("should return one weapon", async () => {
    const result = await store.getOneWeapon(1);
    expect(result).toEqual([
      {
        id: 1,
        name: "AK47",
        type: "GUN",
        weight: 20,
      },
    ]);
  });

  it("should update a weapon", async () => {
    const result = await store.updateWeapon({
      id: 1,
      name: "Sniper",
      type: "Long Gun",
      weight: 30,
    });
    expect(result).toEqual([
      {
        id: 1,
        name: "Sniper",
        type: "Long Gun",
        weight: 30,
      },
    ]);
  });

  it("should delete a weapon", async () => {
    const result = await store.deleteWeapon(1);
    expect(result).toEqual([]);
  });
});
