import MainStoryFloor from "./MainStoryFloor";

class Instance {
  floor: MainStoryFloor;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.floor = new MainStoryFloor(1, 1);
  }
}

export default Instance;
