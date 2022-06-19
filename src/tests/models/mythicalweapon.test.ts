import { MythicalWeaponStore } from "../../models/mythicalWeapon.model";

const store = new MythicalWeaponStore();

describe("Mythical Weapons Model", () => {
  it("should have a getAllWeapons method", () => {
    expect(store.getAllWeapons).toBeDefined();
  });

  it("should return a list of products", async () => {
    const result = await store.getAllWeapons();
    expect(result).toEqual([
      { id: 1, name: "Astrakhan", type: "Earth", weight: 1 },
    ]);
  });
});
