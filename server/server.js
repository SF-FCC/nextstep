const app = require("./app");

//Server Setup
const PORT = process.env.PORT || 5000;
const server = app.express.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
});

function gracefulShutdown() {
  console.log("Closing http server.");
  server.close();
}
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
