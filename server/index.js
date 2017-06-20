/* eslint-disable */
const http = require('http');
const path = require('path');
const fs = require('fs');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
const { createBundleRenderer } = require('vue-server-renderer');
require('isomorphic-fetch');
const app = require('./app');
const apiRouter = require('./routes');
const config = require('./config');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

const template = fs.readFileSync(resolve('../src/index.template.html'), 'utf-8');

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    runInNewContext: false,
  }));
}

let renderer;
let readyPromise;
if (isProd) {
  const bundle = require('../dist/vue-ssr-server-bundle.json');
  const clientManifest = require('../dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest,
  });
} else {
  readyPromise = require('../build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

app.use(convert(koaStatic(path.resolve(__dirname, '../dist'))));

const handleError = (err, ctx) => {
  if (err.url) {
    ctx.redirect(err.url);
  } else if (err.code === 404) {
    ctx.status = 404;
    ctx.res.end('404 | Page Not Found');
  } else {
    ctx.status = 500;
    console.error(`errror during render: ${ctx.url}`);
    console.error(err.stack);
  }
};

const render = async (ctx) => {
  console.log('render');
  try {
    ctx.set('Content-Type', 'text/html');
    ctx.status = 200;

    const context = {
      title: '豆瓣图书',
      url: ctx.url,
    };

    const html = await new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      });
    });

    ctx.res.end(html);
  } catch (err) {
    handleError(err, ctx);
  }
};

app.use(async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    await apiRouter.routes()(ctx, next);
  } else {
    if (isProd) {
      await render(ctx, next);
    } else {
      await render(ctx, next);
    }
  }
});

const server = http.createServer(app.callback());
server.listen(config.port, () => {
  console.log(`\n==> ✅  Server is listening on port ${config.port}`);
  console.log(`\n==> 🌏  Open up http://localhost:${config.port}/ in your browser.\n`);
});
