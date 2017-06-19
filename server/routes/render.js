/* eslint-disable */
const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const config = require('../config');
const { createBundleRenderer } = require('vue-server-renderer');
const resolve = file => path.resolve(__dirname, file);
const Vue = require('vue');
require('isomorphic-fetch');

const template = fs.readFileSync(resolve('../../src/index.template.html'), 'utf-8');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

const isProd = process.env.NODE_ENV === 'production';

// function createRenderer(bundle, options) {
//   return createBundleRenderer(bundle, Object.assign(options, {
//     template,
//     cache: LRU({
//       max: 1000,
//       maxAge: 1000 * 60 * 15,
//     }),
//     basedir: resolve('../../dist'),
//     runInNewContext: false,
//   }));
// }

// let renderer;
// let readyPromise;
// if (isProd) {
//   const bundle = require('../../dist/vue-ssr-server-bundle.json');
//   const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
//   renderer = createRenderer(bundle, {
//     clientManifest,
//   });
// } else {
//   readyPromise = require('../../build/setup-dev-server')(app, (bundle, options) => {
//     renderer = createRenderer(bundle, options);
//   });
// }


const renderer = createBundleRenderer(resolve('../../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template,
  clientManifest,
});


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
}

module.exports = async (ctx, next) => {
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
}
