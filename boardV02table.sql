DELETE BoardV02;

DROP TABLE boardV02;
purge recyclebin;

commit;

create table boardV02(
 BOD_NO		 NUMBER(23),		-- �� ��ȣ
 BOD_WRITER	 VARCHAR2(30),		-- �۾� ��
 BOD_EMAIL	 VARCHAR2(30),		-- �̸���
 BOD_SUBJECT	 VARCHAR2(100),		-- �� ����
 BOD_PWD	 VARCHAR2(30), 		-- ���� ��й�ȣ
 BOD_LOGTIME	 DATE DEFAULT sysdate,	-- �ۼ���
 BOD_CONTENT	 VARCHAR2(4000),		-- �� ����
 BOD_READCNT	 NUMBER(23) default 0, 	-- ���� ��ȸ��
 BOD_CONNIP	 VARCHAR2(20)		-- �۾� ���� IP
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
       VALUES (255 - i, sanameT(i), sanameT(i) || ' �ȳ��ϼ���', 'Hi ' ||sanameT(i)||' �Դϴ�.', sysdate-i, 0, 1234, sanameT(i)||'@test.com', '127.0.0.1');
    END LOOP;
END;
/
commit;