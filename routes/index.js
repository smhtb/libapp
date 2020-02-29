const homeRouter = require("./homeRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const guard = require("../middlewares/guard");


module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/user', guard, userRouter);
};