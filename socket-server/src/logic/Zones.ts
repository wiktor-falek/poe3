import MainStoryZone from "./MainStoryZone";

class Zones {
  mainStoryData: Array<any>;
  _someOtherContent: Array<any>;
  constructor() {
    this.mainStoryData = [
      { id: 0, name: "Old cellar", ilvl: 1 },
      { id: 1, name: "TODO", ilvl: 2 },
      { id: 2, name: "TODO", ilvl: 3 },
      { id: 3, name: "TODO", ilvl: 4 },
      { id: 4, name: "TODO", ilvl: 5 },
    ];

    this._someOtherContent = [{ id: 100, name: "TODO", ilvl: 80 }]
  }

  getZoneDataById(id: number): MainStoryZone | undefined {
    return this.mainStoryData[id];
  }

  createZone(id: number): MainStoryZone | null {
    const zoneData = this.getZoneDataById(id);
    if (!zoneData) return null;
    const zone = new MainStoryZone(zoneData.id, zoneData.name, zoneData.ilvl);
    return zone;
  }
}

export default new Zones();
