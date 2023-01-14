import MainStoryFloor from "./MainStoryFloor";

class Instance {
  floor: MainStoryFloor;
  constructor() {
    this.floor = new MainStoryFloor(1, 1);
  }
}

export default Instance;
