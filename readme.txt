1. npm install express

2. npm install mysql

3. mysql ���� iot �����ͺ��̽��� members ���̺� �����

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

4. ���� ����

5.http://localhost:9001/cocat.html �� ������

6. �׽�Ʈ �غ���
ȸ������ : sign_in.html
�α��� : sign_up.html
�������� : sign_up.html
ȸ������ : sign_update.html


