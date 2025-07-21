let bgColor = "#ffa500";
let fontColor = "#242424";
let mText;
let aText;
let cntInput;
let cntVoca;
let startVoca;
let lastVoca;

let aVoca1 = [];
let aVoca2 = [];
let aVoca3 = [];

let recordName = {
	totalRecord				: 300,	// 총 레코드 수
	recPerPage				: 5,		// 페이지당 보여질 레코드 수
	pagePerPage			: 10,		// 블럭당 보여질 페이지 수
	totalPage				: 0,		// 총 페이지 수
	totalBlock				: 0,		// 총 블럭 수
	nowPage					: 0,		// 현재 페이지
	nowBlock				: 0,		// 현재 블럭
	recOfBeginPage		: 0,		// 시작 페이지의 레코드 번호
	pageOfBeginPage	: 0		// 시작블럭
}

let titleTrValue = Object.keys(recordName);
let recordTrValue = Object.values(recordName);

let page;
let select;

let song;
let songSrc;

let answerCnt;
let answerSrc = "./memSound/answer.wav";
let wrongSrc = "./memSound/wrong.wav";

let sNum1;
let sNum2;

	fetch('./../memJas/vocaDataJSON.json')
	  .then(res => res.json())
	  .then(data => {
		data.forEach(voca => {
		  aVoca1.push(voca.word);
		  aVoca2.push(voca.pronunciation);
		  aVoca3.push(voca.koreanMeaning);
		});
		mInit();
		// 확인용 출력
		console.log('aName:', aName);
		console.log('aIntro:', aIntro);
		console.log('aLyrics:', aLyrics);
	  })
	  .catch(error => {
		console.error('불러오기 실패:', error);
	  });


function mInit(){
	cntInput = 10;
	cntVoca = 5;
	startVoca = 1;
	lastVoca = 3;
	page = document.querySelector(".pagination");
	sNum1 = document.getElementById("selectedNum1");
	sNum2 = document.getElementById("selectedNum2");
	mCalc();
	mTable();
	
	mBackColorCng(bgColor);
	mTextColorCng(fontColor);
	song = document.getElementById("song");
	songSrc = document.getElementById("song_src");
}

function mBackColorCng(colChk){
	let color = document.getElementById("tableBody").querySelectorAll("td");
	let sColor = document.querySelector(".selectTable").querySelectorAll("td");
	for (let i = 0; i < color.length; i++) {
		color[i].style.backgroundColor = colChk;
	}
	for (let i = 0; i < sColor.length; i++) {
		sColor[i].style.border = "5px solid " + colChk;
	}
}
function mTextColorCng(colChk){
	let color = document.getElementById("tableBody").querySelectorAll("td");
	let sColor = document.querySelector(".selectTable").querySelectorAll("td");
	let tColor = document.querySelector(".selectTable").querySelectorAll("th");
	for (let i = 0; i < color.length; i ++) {
		color[i].style.color = colChk;
	}
	for (let i = 0; i < sColor.length; i++) {
		sColor[i].style.color = colChk;
	}
	for (let i = 0; i < tColor.length; i++) {
		tColor[i].style.color = colChk;
	}
}

function mfontColor(colChk){
	fontColor = colChk;
}
function mbgColor(colChk){
	bgColor = colChk;
}

function nextLine(event){
	let value = event.key
	if (value == "Enter")	{
		for (let k = 0; k < mText.length ; k++) {
			if (event.target === mText[k]){
	//				if ((k+1) % (cntInput+1) == cntInput) {
					ansCheck(k)
	//			}
					mText[k+1].focus();
					break;
			}
		}			
	}
}

function ansCheck(num){
	let score = 0;
	let a = Math.floor((num+1) / (cntInput+1));
/*	for (let i = (num + 1 - cntInput); i < (num + 1) ; i++) {
		if (mText[i].value === "") {
			aText[a].value = "빈 칸을 채워주세요.";
			return;
		}
		if (mText[i].value === aVoca[a][0]) {
			score += 10;
		}
		aText[a].value = score;
	}	*/
	for (let i = a * cntInput ; i < (a+1) * cntInput; i ++) {
		/*if (mText[i].value === "") {
			aText[a].value = "빈 칸을 채워주세요.";
			break;
		}*/
		if (mText[i].value === aVoca1[recordName.recOfBeginPage + a]) {
			score += 10;
		} 
		aText[a].value = score;
	}

	if (num % (cntInput + 1) != cntInput) {
		if (mText[num].value === aVoca1[recordName.recOfBeginPage + a]) {
			songSrc.src = "./../memSound/answer.wav";
		} else {
			songSrc.src = "./../memSound/wrong.wav";
		}
		song.load();
		song.play();
	}
}

let tIndex = ["번호", "단어", "발음", "뜻"];

function mTable() {
	sNum1.innerText = recordName.recOfBeginPage + 1;
	if ( recordName.recOfBeginPage + recordName.recPerPage >= recordName.totalRecord)	{
		sNum2.innerText = recordName.totalRecord;
	} else {
		sNum2.innerText = recordName.recOfBeginPage + recordName.recPerPage;
	}

	document.getElementById("DOMtable").innerHTML = "";

	let cTable = document.createElement("table");
	cTable.id = "tableBody";
	let cTr = document.createElement("tr");
	
	for (let i = 0; i < tIndex.length ; i++) {	// 테이블 설명
		let cTd = document.createElement("td");
		if (i != 0) {
			cTd.colSpan = 4;
		}
		let tTd = document.createTextNode(tIndex[i]);
		cTd.appendChild(tTd);
		cTr.appendChild(cTd);
	}
	cTable.appendChild(cTr);

	for (let i = recordName.recOfBeginPage; i < recordName.recPerPage + recordName.recOfBeginPage; i++)	{	// 테이블 칸 반복 생성
		if ( i > recordName.totalRecord -1) {
			break;
		}
		cTr = document.createElement("tr");
	

		for (let k = 0; k < tIndex.length; k++) {		// 번호 단어 발음 뜻 | 칸 생성
			let cTd = document.createElement("td");
			let tTd;
			if (k == 0) {
				cTd.rowSpan = 4;
				tTd = document.createTextNode(i+1);
			} else if (k == 1) {
				cTd.colSpan = 4;
				tTd = document.createTextNode(aVoca1[i]);
			} else if (k == 2) {
				cTd.colSpan = 4;
				tTd = document.createTextNode(aVoca2[i]);
			} else if (k == 3) {
				cTd.colSpan = 4;
				tTd = document.createTextNode(aVoca3[i]);
			}
			cTd.appendChild(tTd);
			cTr.appendChild(cTd);
		}
		cTable.appendChild(cTr);	

		cTr = document.createElement("tr");
		for (let k = 0; k < cntInput+1 ; k++) {		// 입력칸 생성
			if (k % 4 == 0 && k != 0) {
				cTable.appendChild(cTr);	
				cTr = document.createElement("tr");
			}
			let cTd = document.createElement("td");
			let tTd;
			if (k == cntInput) {
				cTd.colSpan = 6;
				tTd = document.createElement("input");
				tTd.type = "text";
				tTd.readOnly = true;
				tTd.classList.add("ansText");
				cTd.appendChild(tTd);
				cTr.appendChild(cTd);
				break;
			}
			cTd.colSpan = 3;
			tTd = document.createElement("input");
			tTd.type = "text";
			cTd.appendChild(tTd);
			cTr.appendChild(cTd);
		}
		cTable.appendChild(cTr);	
	}
	cTable.id = "tableBody";
	document.getElementById("DOMtable").appendChild(cTable);
	aText = document.querySelectorAll(".ansText");
	mText = document.querySelectorAll('input[type="text"]');
	for (let i = 0; i < mText.length ; i++)	{
		mText[i].addEventListener('keydown', nextLine);	
	}
	mText[0].focus();

	mPage();
}

function firstNumChange(num){
	startVoca += num;
	if (startVoca < 1) {
		startVoca = 1;
	} else if (lastVoca > aVoca1.length) {
		alert("마지막 단어입니다.")
		lastVoca = aVoca1.length;
	} 

	if (startVoca > lastVoca)	{
		alert("첫 숫자가 마지막 숫자보다 클 수 없습니다!");
		startVoca = lastVoca;
	} 
	document.getElementById("firstNum").innerText = startVoca;
	document.getElementById("lastNum").innerText = lastVoca;
	recordName.nowBlock = 0;
	mCalc();
	mTable();
}

function lastNumChange(num){
	lastVoca += num;
	if (lastVoca < 1) {
		lastVoca = 1;
	} else if (lastVoca > aVoca1.length) {
		alert("마지막 단어입니다.")
		lastVoca = aVoca1.length;
	} 
	
	if (lastVoca < startVoca)	{
		alert("마지막 숫자보다 첫 숫자보다 작을 수 없습니다!");
		lastVoca = startVoca;
	}
	document.getElementById("firstNum").innerText = startVoca;
	document.getElementById("lastNum").innerText = lastVoca;
	recordName.nowBlock = 0;
	mCalc();
	mTable();
}

function mCalc(){
	recordName.totalRecord = aVoca1.length;
	recordName.recPerPage = (lastVoca - startVoca) +1;
	recordName.totalPage = Math.ceil((recordName.totalRecord -startVoca + 1) / recordName.recPerPage);
	recordName.totalBlock = Math.ceil(recordName.totalPage / recordName.pagePerPage);
	recordName.pageOfBeginPage = recordName.pagePerPage * recordName.nowBlock + 1;
	recordName.nowPage = recordName.pageOfBeginPage;
	recordName.recOfBeginPage = recordName.recPerPage * (recordName.nowPage - 1) + (startVoca-1);
}


function mPage(){
	page.innerHTML = "";
	let pagination = document.createElement("div");
	pagination.className = "pagination";
	pagination.insertAdjacentHTML('beforeend', `<a href="#">&laquo;</a>`);
	for (let i = 0; i < recordName.pagePerPage; i++) {
		let pageNum = recordName.pagePerPage * recordName.nowBlock + 1 + i;
        if (pageNum > recordName.totalPage) {
			break;
		}
        pagination.insertAdjacentHTML('beforeend', `<a href="#">${pageNum}</a>`);
	}
	pagination.insertAdjacentHTML('beforeend', `<a href="#">&raquo;</a>`);
	page.appendChild(pagination);
	mAddEventListener();
	mActive();
}

function mAddEventListener(){
	select = document.querySelectorAll('a');

	select[0].addEventListener('click', mFirst);
	select[select.length-1].addEventListener('click', mLast);
	for (let i = 1; i<select.length-1 ; i++) {
		select[i].addEventListener('click', mClick);
	}
}

function mFirst(){
	if (recordName.nowBlock <= 0) {
		alert("첫 번째 페이지입니다.");
		return;
	}
	recordName.nowBlock -= 1;
	mCalc();
	mTable();
}

function mLast(){
	if (recordName.nowBlock >= recordName.totalBlock-1) {
		alert("마지막 페이지입니다.");
		return;
	}
	recordName.nowBlock += 1;
	mCalc();
	mTable();
}

function mClick(event){
	recordName.nowPage = event.target.innerText;
	recordName.recPerPage = lastVoca - startVoca +1;
	recordName.recOfBeginPage = recordName.recPerPage * (recordName.nowPage - 1) + (startVoca-1);
	mActive();
	mTable();
}

function mActive(){
	for(let i = 0 ; i<select.length-1 ; i++){
		select[i].classList.remove("active");
	}
	select[recordName.nowPage-(recordName.pagePerPage*recordName.nowBlock)].classList.add("active");
}