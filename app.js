const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routers/userRouter");
const boardRouter = require("./routers/boardRouter");

const app = express();
const PORT = 4000;

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

// A. Back Server 라우터(컨트롤러) : 사용자가 입력한 데이터를 받아서 데이터베이스에 넣어주는 기능
// B. Front (화면) : 회원가입할 때 필요한 정보를 받을 수 있는 화면 (이메일,비밀번호,닉네임)

// B에서 A로 데이터와 함께 신호를 보내면,
// B는, 데이터베이스에 INSERT를 시행한다.

app.get("/", (req, res, next) => {
  res.render("signup");
});

app.use("/api/user", userRouter);
app.use("/board", boardRouter);

app.listen(PORT, () => {
  console.log(`🍀 Backend Server Start , http://localhost:4000`);
});

//나는 말하는 감자 + 개똥벌레
