/*
 * @Author       : xiaolin
 * @Date         : 2021-09-25 19:54:20
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-26 14:29:26
 * @Description  : 爬虫程序
 * @FilePath     : \byte-train\spider\index.js
 */

// 引入包
const puppeteer = require('puppeteer')

// 配置文件
const config = require('./config')

;(async () => {
  // 1.运行浏览器
  // ----------------------------------
  const browser = await puppeteer.launch({
    headless: true,
  })

  // 2.新建页面
  //  ----------------------------------
  const page = await browser.newPage()

  // 防止检测无头浏览器
  await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__
    delete newProto.webdriver
    navigator.__proto__ = newProto
    window.navigator.chrome = {
      runtime: {},
    }
  })

  // 拦截图片加载(提高速度)
  await page.setRequestInterception(true)
  await page.on('request', async (request) => {
    // 如果文件类型为image,则中断加载
    if (request.resourceType() === 'image') {
      request.abort()
      return
    }
    // 正常加载其他类型的文件
    request.continue()
  })

  // 3.跳转页面
  // ----------------------------------
  await page.goto(config.url)
  console.log(`打开地址：${config.url}`)

  // 滚动到底部加载数据
  let times = []
  do {
    await page.waitForTimeout(1000)
    times = await page.$$eval(config.$time, (node) =>
      node.map((dom) => {
        return dom.innerHTML
      })
    )

    await page.evaluate((_) => {
      window.scrollBy(0, window.innerHeight)
    })
  } while (times.indexOf(config.endFlag) < 0)


  // 4.抓取数据（使用jQuery）
  // ----------------------------------
  // 注入jQuery
  await page.mainFrame().addScriptTag({
    url: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
  })

  const pageData = await page.evaluate((configInPage) => {
    // 这里的代码与函数外是隔离的，不能使用外面的方法

    var $doms = $(configInPage.$node)

    var data = []
    $.each($doms, function (index, item) {
      var _obj = {
        title   : $(item).find(configInPage.$title).text().trim(),
        describe: $(item).find(configInPage.$describe).text().trim(),
        view    : $(item).find(configInPage.$view).text().trim(),
        like    : $(item).find(configInPage.$like).text().trim(),
        link    : "https://juejin.cn" + $(item).find(configInPage.$title).attr("href").trim()
      }
      data.push(_obj)
    })
    return data
  }, config) // 把 config 传给页面中的 configInPage

  console.log('-------------------------------')
  console.log(`数据：\n ${JSON.stringify(pageData, undefined, 2)}`)

  // 5.关闭页面
  // ----------------------------------
  await page.close()
  console.log(`--------------------`)

  // 6.关闭浏览器
  // ----------------------------------
  await browser.close()

})()