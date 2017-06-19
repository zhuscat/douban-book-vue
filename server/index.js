const http = require('http');
const app = require('./app');
const middlewareRegister = require('./middlewareRegister');
const config = require('./config');

app.env = 'production';
middlewareRegister(app);

const server = http.createServer(app.callback());
server.listen(config.port, () => {
  console.log(`\n==> ✅  Server is listening on port ${config.port}`);
  console.log(`\n==> 🌏  Open up http://localhost:${config.port}/ in your browser.\n`);
});
