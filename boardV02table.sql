DELETE BoardV02;

DROP TABLE boardV02;
purge recyclebin;

commit;

create table boardV02(
 BOD_NO		 NUMBER(23),		-- 글 번호
 BOD_WRITER	 VARCHAR2(30),		-- 글쓴 이
 BOD_EMAIL	 VARCHAR2(30),		-- 이메일
 BOD_SUBJECT	 VARCHAR2(100),		-- 글 제목
 BOD_PWD	 VARCHAR2(30), 		-- 글의 비밀번호
 BOD_LOGTIME	 DATE DEFAULT sysdate,	-- 작성일
 BOD_CONTENT	 VARCHAR2(4000),		-- 글 내용
 BOD_READCNT	 NUMBER(23) default 0, 	-- 글의 조회수
 BOD_CONNIP	 VARCHAR2(20)		-- 글쓴 이의 IP
);


DECLARE
  TYPE sanameTab IS TABLE OF sawon.saname%TYPE
  INDEX BY BINARY_INTEGER;
  sanameT sanameTab;

BEGIN
    FOR i IN reverse 0 .. 254 LOOP
       SELECT saname INTO sanameT(i)
       FROM sawon
       WHERE sabun = MOD(i, 20) + 1;
       INSERT INTO BoardV02 (BOD_NO, BOD_WRITER, BOD_SUBJECT, BOD_CONTENT, BOD_LOGTIME, BOD_READCNT, BOD_PWD, BOD_EMAIL, BOD_CONNIP)
       VALUES (255 - i, sanameT(i), sanameT(i) || ' 안녕하세요', 'Hi ' ||sanameT(i)||' 입니다.', sysdate-i, 0, 1234, sanameT(i)||'@test.com', '127.0.0.1');
    END LOOP;
END;
/
commit;