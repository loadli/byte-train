/*
 * @Author       : xiaolin
 * @Date         : 2021-09-25 20:45:00
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-25 22:41:12
 * @Description  : 爬虫配置文件
 * @FilePath     : \byte-train\spider\config.js
 */

module.exports = {
  name     : "掘金前端日报",                            // 爬虫名字
  url      : "https://juejin.cn/frontend?sort=newest", // 地址
  $node    : ".content-main",                          // 节点                            
  $title   : ".title",                                 // 标题Dom
  $describe: ".abstract > a",                          // 描述Dom
  $view    : ".jh-timeline-action-area > .view",       // 浏览量Dom
  $like    : ".jh-timeline-action-area > .like",       // 点赞Dom
  $time    : ".date",                                  // 时间Dom
  endFlag  : "1天前"                                   // 下拉数据结束标识
};