const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/userRoutes');


const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors());


const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(err));

app.use('/api/v1/users', userRouter);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`,
  });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});