var router = new (require('koa-router'))()
const newsService = require('../services/newsService')
const dayjs = require('dayjs')

router.get('/', function* (next) {
  const data = yield newsService.all()

  data.map((item) => {
    item.time = dayjs(item.time).format('YYYY-MM-DD')
    return item
  })

  yield this.render('index', {
    title: '掘金前端日报',
    data,
  })
})

router.get('/news/:date', function* (next) {
  const { date } = this.params
  const data = yield newsService.daily(date)
  yield this.render('news', {
    title: '掘金前端日报',
    data,
    date: dayjs(date).format('YYYY-MM-DD')
  })
})

module.exports = router
