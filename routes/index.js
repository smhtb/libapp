var homeRouter = require("./homeRouter");

module.exports = (app) => {
    app.use('/', homeRouter);
};