const App = require("./app");

const app= new App();


app.register();

module.exports = app.boot()