const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
const json = require('koa-json')
const koaBody = require('koa-body');
const newsRouter = require('./routers/news');
const views = require('koa-views')
const onerror = require('koa-onerror');

const index = require('./routers/index');
const users = require('./routers/users');


// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.use(koaBody());

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = {error: err.message};
  }
});

// 为应用使用路由定义
// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// 使用待办事项业务路由
app.use(newsRouter);


module.exports = app;
