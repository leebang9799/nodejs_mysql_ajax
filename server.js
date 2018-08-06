var http = require('http');
var express = require('express');//설치
var mysql = require('mysql');//설치
var querystring = require('querystring'); //따로 안깔아도 됨

// 데이터베이스와 연결합니다.
var dbCon = mysql.createConnection({
	host: "localhost",
    user: 'root',
    password: 'zxcqwe69*',
    database: 'iot'
});

// 웹 서버를 생성합니다.
var app = express();
//app.use(express.static('public')); //이게 뭔지 모름
app.use(express.static(__dirname));
//app.use(express.bodyParser());
//app.use(app.router);

//전체 회원 보내기 - unuse
app.get('/members', function (request, response) {
    // 데이터베이스 요청을 수행합니다.
	//console.log("members", request);

	var sql = 'SELECT * FROM members'; 

    dbCon.query(sql, function (error, data) {
		if(error){
			console.log("[get] : error", error);
			response.send(error);
		}
        else {
			console.log("[get] : send", data);
			response.send(data);
		}
    });
});

//회원 로그인 - get 인가 ? post 인가?
app.post('/members_login/', function (request, response) {
	//console.log("/members_login/", request);
	request.on('data', function(data) { 
		console.log(data.toString());
		var queryData = querystring.parse(data.toString()); 

		dbCon.query('SELECT * FROM members WHERE member_id=? and password=?', 
			[queryData.member_id, queryData.password], function (error, data) {

		  if(error){
			console.log("[post]:members_login : error", error);
			response.send(error);
		}
        else {
			console.log("[post]:members_login : send",  data.length); 
			if(data.length == 1){
				response.send("success");

				//response.writeHead(302, {"Location":"../cocat.html"});
				//response.end("처리완료");
			}
			else{
				response.send("fail");
			}
		}
    });
 });
});



//멤버 정보 넘겨주기 
app.get('/members_info/:member_id', function (request, response) {  
	var member_id = request.params.member_id; 
	//console.log("/members_info/", request);

    dbCon.query('SELECT * FROM members WHERE member_id=?', [member_id], function (error, data) {
        if(error){
			console.log("[get]:members_info : error", error);
			response.send(error);
		}
        else {
			console.log("[get]:members_info", data);
			response.send(data); 
		}
    });
});


//사용자의 아이디가 신규로 들어갈수 잇는지 확인해 준다
app.get('/members/:member_id', function (request, response) { 
	var member_id = request.params.member_id; //Number(request.params.id); 
	//console.log("/members/:id", request);

    dbCon.query('SELECT * FROM members WHERE member_id=?', [member_id], function (error, data) {
        if(error){
			console.log("[get]:members : error", error);
			response.send(error);
		}
        else {
			//data.length = 0  : 신규 가능
			console.log("[get]:members : send",  data.length); 
			if(data.length == 0){
				response.send("success");
			}
			else{
				response.send("fail");
			}
		}
    });
});

//신규회원가입
app.post('/members', function (request, response) {
	//console.log("[post]");
	// if(request.method =='POST') {
	request.on('data', function(data) { 
		console.log(data.toString());
		var queryData = querystring.parse(data.toString()); 
		var sql = 'INSERT INTO members (member_id, password,	name,email,hp,sex, birth) VALUES(?,?,?,?, ?,?, ?)';
		//배열을 넣거나, [a, b, c] 로 배열로 만들어서 넣는다 
		var arrValues = new Array();
		arrValues.push(queryData.member_id);
		arrValues.push(queryData.password);
		arrValues.push(queryData.name);
		arrValues.push(queryData.email); 
		arrValues.push(queryData.hp);
		arrValues.push(queryData.sex);
		arrValues.push(queryData.birth); 

		dbCon.query(sql, arrValues, function (error, data) {
				if(error){
					console.log("[post] : error", error);
					response.send("error");
				}
				else {
					if(data.affectedRows == 1){ //레코드 추가됨
						console.log("[post] : send", data);
						response.send("success");
					}
					else{ //삭제되지 않음!!!
						console.log("[post] : send", data);
						response.send("fail");
		}
				}
		});
	});
	//}
}); 


//회원정보 수정
app.put('/members/:member_id', function (request, response) {
    // 변수를 선언합니다.
	var member_id =request.params.member_id;// Number(request.params.id);
	request.on('data', function(data) {
		var queryData = querystring.parse(data.toString());

		var sql ='UPDATE members SET password=?, name=?,email=?,hp=?,sex=?, birth=? 	where member_id=?';  
		var arrValues = new Array(); 
		arrValues.push(queryData.password);
		arrValues.push(queryData.name);
		arrValues.push(queryData.email); 
		arrValues.push(queryData.hp);
		arrValues.push(queryData.sex);
		arrValues.push(queryData.birth); 
		arrValues.push(queryData.member_id);

		dbCon.query(sql, arrValues, function (error, data) {
			if(error){
				console.log("[put] : error", error);
				response.send(error);
			}
			else {
				if(data.affectedRows == 1){ //삭제됨
					console.log("[put] : send", data);
					response.send("success");
				}
				else{ //삭제되지 않음!!!
					console.log("[put] : send", data);
					response.send(data);
				}
			}
		});
	}); 

});

//회원삭제
app.delete('/members/:member_id', function (request, response) {
    // 변수를 선언합니다.
    var member_id = request.params.member_id;// Number(request.params.member_id);
	//console.log(member_id);
    // 데이터베이스 요청을 수행합니다.
    dbCon.query('DELETE FROM members WHERE member_id=?', [ member_id], function (error, data) {
	//	console.log("data.affectedRows", data.affectedRows);
       // response.send(data);
	   if(error){
				console.log("[delete] : error", error);
				response.send(error);
		}
		else {
			if(data.affectedRows == 1){ //삭제됨
				console.log("[delete] : send", data);
				response.send("success");
			}
			else{ //삭제되지 않음!!!
				console.log("[delete] : send", data);
				response.send(data);
			}
		}
    });
});

// 웹 서버를 실행합니다.
http.createServer(app).listen(9001, function () {
    console.log('Server Running at 9001');
}); 