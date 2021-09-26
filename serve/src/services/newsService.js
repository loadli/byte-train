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
    let set = []
    const filterData = Array.from(data).filter(items => {
      let time = (new Date(items.time)).toLocaleDateString()
      if (set.includes(time)) {
        return false
      } else {
        set.push(time)
        return true
      }
    })
    return filterData
  }
  async daily({ date, read, like }) {
    const data = await newsTable.where().find()
    if (!data) {
      const error = new Error(`news:${id} not found`);
      error.status = 404;
      throw error;
    }
    let wantDate = (new Date(date)).toLocaleDateString()
    const filterData = Array.from(data).filter(items => {
      let time = (new Date(items.time)).toLocaleDateString()
      return wantDate === time
    })
    return filterData
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
