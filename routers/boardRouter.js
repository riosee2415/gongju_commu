const express = require("express");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
dotenv.config();

const dbConfig = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  dbName: process.env.dbName,
};

const conn = mysql2.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.dbName,
});

const router = express.Router();

router.get("/create", (req, res, next) => {
  res.render("board/create");
});

router.post("/create", async (req, res, next) => {
  const { title, content } = req.body;

  const createQuery = `
    INSERT INTO board (
        title,
        content,
        createdAt,
        UserId
    ) VALUES (  
        "${title}",
        "${content}",
        now(),
        1
    )
  `;

  try {
    conn.query(createQuery, (error, result) => {
      if (error) {
        return res.status(400).send("잘못된 요청 입니다. 다시 시도해주세요.");
      }

      res.redirect(`/board/list/${result.insertId}`);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("게시글 생성에 실패했습니다.");
  }
});

router.get("/list/:boardId", (req, res, next) => {
  const { boardId } = req.params;

  try {
    const detailQuery = `
            SELECT  id,
                    title,
                    content,
                    createdAt,
                    UserId
              FROM  board
             WHERE  id = ${boardId}
        `;

    conn.query(detailQuery, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(400).send("조회할 수 없습니다.");
      }

      res.render("board/detail", { board: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("존재하지 않는 게시글 입니다.");
  }
});

router.post("/delete", (req, res, next) => {
  const { id } = req.body;

  try {
    const deleteQuery = `
      DELETE  FROM board
       WHERE  id = ${id}
    `;

    conn.query(deleteQuery, (error, result) => {
      if (error) {
        return res.status(400).send("삭제 중 에러 발생!");
      }

      res.redirect("/board/list");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("삭제에 실패했습니다.");
  }
});

router.get("/list", (req, res, next) => {
  try {
    const listQuery = `
      SELECT  id,
              title,
              content,
              createdAt,
              UserId
        FROM  board
    `;

    conn.query(listQuery, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(400).send("조회 중 에러 발생!");
      }

      res.render("board/list", { boardList: result });
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("조회할 수 없습니다.");
  }
});

module.exports = router;
