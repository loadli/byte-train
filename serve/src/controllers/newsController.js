const newsService = require('../services/newsService');

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
    const { title = '', description = '', month = '', time = Date.now() } = ctx.request.body
    const res = await newsService.save({ title, description, month, time })
    ctx.body = {
      code: "200",
      message: "请求成功",
      data: res,
  }
  }
}

// 导出 Controller 的实例
module.exports = new NewsController();
