/**
 * Module dependencies.
 */

const app = require("./app");
const debug = require("debug")("stock-service:server");
const http = require("http");
const db = require("#external/database/mongodb/connection");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3333");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on("error", onError);
server.on("listening", onListening);

db.createConnection().then(() => server.listen(port));

/**
 * Graceful Shutdown
 */
function gracefulShutdown(){
  console.log("Gracefully shutting down...");
  server.close((err) => {
    if (err) {
      console.error(err.stack || err)
      return process.exit(1)
    };
    db.disconnect().then(() => process.exit());
  });
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
