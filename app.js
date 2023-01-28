// 기본 설정
const express = require("express");
const helmet = require("helmet");
const app = express();
const ejs = require("ejs");
const db = require("./model/db");
const json2xls = require("json2xls");

// HTML, CSS 그림 파일 보여주기
app.set('view engine','ejs');
app.set('views','./views');
app.use('/public',express.static(__dirname + '/public'));

// 보안 설정
// app.use(helmet());

// POST 방식 API 사용
app.use(express.json());
app.use(express.urlencoded());

// 엑셀 화일로 내보내기
app.use(json2xls.middleware);

const mainRouter = require('./router/mainRouter')
app.use('/',mainRouter)

app.listen(3000,function(req,res){
    db.sequelize.sync({force:false})
    console.log("서버가 실행되고 있습니다!")
})