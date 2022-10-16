import Items from "../Items.js";


class Item {
  constructor(db) {
    this.bases = db.collection("bases")
  }

  /**
   * 
   * @param {number} baseId 
   * @returns Object | null
   */
   getBaseById(baseId) {
      const base = this.bases.findOne({
        "_id": baseId
      });

      return base;
  }
}

export default new Item(Items.db);
