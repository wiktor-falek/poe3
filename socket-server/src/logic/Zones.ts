import MainStoryZone from "./MainStoryZone";

export const mainStoryFloorsData = [
  { id: 0, name: "Old cellar", ilvl: 1 },
  { id: 1, name: "TODO", ilvl: 2 },
  { id: 2, name: "TODO", ilvl: 3 },
  { id: 3, name: "TODO", ilvl: 4 },
  { id: 4, name: "TODO", ilvl: 5 },
];

export const _someOtherContent = [{ id: 100, name: "TODO", ilvl: 80 }];

// TODO: Refactor this
// This needs a function that creates a new Floor instance
// this.mainStoryFloors is actually unnecessary, as mainStoryFloorsData will be used for emit
class Zones {
  mainStoryFloors: Array<MainStoryZone>;
  // someOtherContent: Array<any>;
  constructor() {
    this.mainStoryFloors = mainStoryFloorsData.map(
      (zoneData) =>
        new MainStoryZone(zoneData.id, zoneData.name, zoneData.ilvl)
    );
  }

  getZoneById(id: number): MainStoryZone | undefined {
    return this.mainStoryFloors[id];
  }

  public get basicMainStoryData(): any {
    const data = this.mainStoryFloors.map((zone) => {
      return { name: zone.name, ilvl: zone.ilvl };
    });
    console.log(data);
    return data;
  }
}

export default new Zones();
