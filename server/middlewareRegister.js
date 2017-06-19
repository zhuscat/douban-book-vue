const path = require('path');
const koaStatic = require('koa-static');
// const views = require('koa-views');
const convert = require('koa-convert');
const helmet = require('koa-helmet');
const router = require('./routes');

// const viewPath = path.join(__dirname, './views');

module.exports = (app) => {
  // app.use(helmet());
  app.use(convert(koaStatic(path.resolve(__dirname, '../dist'))));
  // app.use(views(viewPath, { extension: 'ejs' }));
  app.use(router);

  // if (app.env === 'development') {
  //   app.use(async (ctx, next) => {
  //     const start = Date.now();
  //     await next();
  //     const interval = Date.now() - start;
  //     console.log(`${ctx.method} ${ctx.url} - ${interval}ms`);
  //   });
  // }

  // app.use(async (ctx) => {
  //   ctx.status = 404;
  //   await ctx.render('404');
  // });
};
