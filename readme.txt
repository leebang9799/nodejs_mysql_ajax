1. npm install express

2. npm install mysql

3. mysql 에서 iot 데이터베이스에 members 테이블 만들기

create table members( 
member_id varchar(50) not null primary key,
password varchar(50) not null,
name varchar(50) not null,
email varchar(50) not null,
hp varchar(20) not null,
tel varchar(20),
post varchar(10),
addr varchar(100),
sex varchar(1),
birth varchar(50));

4. 서버 가동

5.http://localhost:9001/cocat.html 를 접속후

6. 테스트 해보기
회원가입 : sign_in.html
로그인 : sign_up.html
정보수정 : sign_up.html
회원삭제 : sign_update.html


