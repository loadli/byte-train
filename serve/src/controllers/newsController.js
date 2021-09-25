const newsService = require('../services/newsService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class NewsController {
  /**
   * 列出所有待办事项
   * 响应格式
   * {
   *   list: [todo1, todo2]
   * }
   * @param ctx Koa 的上下文参数
   */
  async listAll(ctx) {
    const list = await newsService.listAll();
    ctx.body = {list};
  }

  /**
   * 创建一条待办事项
   * 响应格式
   * {
   *   result: newTodo
   * }
   * @param ctx Koa 的上下文参数
   */
  async create(ctx) {
    const {title, done = false} = ctx.request.body;
    const result = await newsService.create({title, done});
    ctx.body = {result};
  }
  async all(ctx) {}
  async daily(ctx) {
    const { date, read, like } = ctx.request.body
    const res = await newsService.daily({ date, read, like })
    ctx.body = {

    }
  }
  async save(ctx) {
    const { title, description, month, time } = ctx.request.body
    const res = await newsService.save({})
    ctx.body = {

    }
  }
}

// 导出 Controller 的实例
module.exports = new NewsController();
