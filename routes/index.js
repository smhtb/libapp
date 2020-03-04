const homeRouter = require("./homeRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const bookRouter = require("./bookRouter");
const guard = require("../middlewares/guard");


module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/book', guard, bookRouter);
};