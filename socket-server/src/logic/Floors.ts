import MainStoryFloor from "./MainStoryFloor";

const mainStoryFloorsData = [
  { name: "Old cellar", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
  { name: "TODO", ilvl: 1 },
];

const someOtherContent = [{ name: "TODO", ilvl: 80 }];

class Floors {
  mainStoryFloors: Array<MainStoryFloor>;
  // someOtherContent: Array<any>;
  constructor() {
    this.mainStoryFloors = mainStoryFloorsData.map(
      (floorData, idx) =>
        new MainStoryFloor(idx, floorData.name, floorData.ilvl)
    );
    // this.someOtherContent = someOtherContent.map((floorData, idx) => new MainStoryFloor(idx, floorData.ilvl));
  }

  getFloorById(id: number): MainStoryFloor | null {
    return this.mainStoryFloors.find((floor) => {
      floor.id === id;
    }) || null;
  }

  public get basicMainStoryData(): any {
    const data = this.mainStoryFloors.map((floor) => {
      return { name: floor.name, ilvl: floor.ilvl };
    });
    console.log(data);
    return data;
  }
}

export default new Floors();
