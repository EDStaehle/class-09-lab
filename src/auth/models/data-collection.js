'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  createFood(record, id) {
    let created = {
        type: record.type,
        name: record.name,
        calories: record.calories,
        UserId: id
    }
    return this.model.create(created);
  }
  createDessert(record, id) {
    let created = {
      type: record.type,
      flavor: record.flavor,
      occasion: record.occasion,
      UserId: id
  }
  return this.model.create(created);
}

update(id, data) {
  return this.model.findOne({ where: { id } })
  .then(record => record.update(data));
}

delete(id) {
  return this.model.destroy({ where: { id }});
}

}


module.exports = DataCollection;
