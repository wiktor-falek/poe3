import MainStoryFloor from "./MainStoryFloor";

const mainStoryFloorsData = [
  { id: 0, name: "Old cellar", ilvl: 1 },
  { id: 1, name: "TODO", ilvl: 2 },
  { id: 2, name: "TODO", ilvl: 3 },
  { id: 3, name: "TODO", ilvl: 4 },
  { id: 4, name: "TODO", ilvl: 5 },
];

const someOtherContent = [{ id: 100, name: "TODO", ilvl: 80 }];

class Floors {
  mainStoryFloors: Array<MainStoryFloor>;
  // someOtherContent: Array<any>;
  constructor() {
    this.mainStoryFloors = mainStoryFloorsData.map(
      (floorData) =>
        new MainStoryFloor(floorData.id, floorData.name, floorData.ilvl)
    );
    // this.someOtherContent = someOtherContent.map(floorData => new MainStoryFloor(idx, floorData.ilvl));
  }

  getFloorById(id: number): MainStoryFloor | undefined {
    return this.mainStoryFloors[id];
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
