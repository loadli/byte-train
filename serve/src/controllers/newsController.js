const newsService = require('../services/newsService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class NewsController {
  async all(ctx) {
    const res = await newsService.all()
    ctx.body = {
      code: "200",
      message: "请求成功",
      data: res,
    }
  }
  async daily(ctx) {
    const { date, read, like } = ctx.request.body
    const res = await newsService.daily({ date, read, like })
    ctx.body = {
      code: "200",
      message: "请求成功",
      data: res,
    }
  }
  async save(ctx) {
    const { title, description, month, time } = ctx.request.body
    const res = await newsService.save({})
    ctx.body = {
      code: "200",
      message: "请求成功",
      data: addressList,
  }
  }
}

// 导出 Controller 的实例
module.exports = new NewsController();
