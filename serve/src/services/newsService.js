const newsTable = require('../models/newsTable');
const stateTable = require('../models/stateTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

class newsService {
  async all() {
    const data = await newsTable.where().find()
    if (!data) {
      const error = new Error(`news:${id} not found`);
      error.status = 404;
      throw error;
    }
    return data
  }
  async daily({ date, read, like }) {
    const data = await newsTable.where({
      time: date,
      read,
      like,
    }).find()
    if (!data) {
      const error = new Error(`news:${id} not found`);
      error.status = 404;
      throw error;
    }
    return data
  }
  async save({
    title,
    description,
    month,
    time,
    read,
    like,
    link
  }) {
    return await newsTable.save({
      title,
      description,
      month,
      time,
      read,
      like,
      link
    })
  }
  async state() {
    const data = await stateTable.where().findOne()
    console.log(data)
    return data
  }

}

// 导出 Service 的实例
module.exports = new newsService();
