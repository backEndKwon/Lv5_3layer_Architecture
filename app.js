const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3090;

const indexRouter = require("./routes/index.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트번호로 서버가 실행되었습니다.");
});
