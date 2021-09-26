/*
 * @Author       : xiaolin
 * @Date         : 2021-09-26 14:10:42
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-26 14:21:31
 * @Description  : 存储服务
 * @FilePath     : \byte-train\spider\store.js
 */
const https = require('https')

const store = {
  /**
   * 检查爬虫是否运行中
   * @param {String} date - 日期，格式 2021-09-01
   * @return {Boolean} - true：运行中；false：没有运行
   */
  running(date) {},

  /**
   * 保存数据
   * @param {Array} list - 爬虫抓到的数据
   * @return {Boolean} - true：保存成功；false：保存失败
   */
  save(list) {},
}

module.exports = {
  store,
}
