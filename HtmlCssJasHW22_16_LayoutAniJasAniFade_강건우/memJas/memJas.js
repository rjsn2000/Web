let vSpeed;
let bannerImg;
let idx = 0;
let timeOut;
let dots;

function mInit(){
	bannerImg = document.getElementById("banner");
	dots = document.getElementsByClassName("dot");
	vSpeed = 3000;
	mPlay();
}

function mPlay(){
	if (timeOut != null)	{
		clearTimeout(timeOut);
	}
	idx++;
	if (idx > 3) {
		idx = 1;
	}
	if (idx < 1)	{
		idx = dots.length;
	}
	bannerImg.src = "./../memImg/banner_" + idx + ".jpg"
	document.images[0].animate([{opacity : 0.1},{opacity : 1}], 1000);
	for (let i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
	}
	dots[idx-1].className += " active";

	timeOut = setTimeout(mPlay, vSpeed);
}

function mOverGo(){
	timeOut = setTimeout(mPlay, 1000);
}

function mOverStop(){
	clearTimeout(timeOut);
}

function goSite(){
	if (idx == 1) {
		window.location.assign("https://www.thepublic.kr/news/articleView.html?idxno=235490");
	} else if (idx == 2){
		window.location.assign("https://www.yupdduk.com/sub/menu/yup-menu");
	} else if (idx == 3) {
		window.location.assign("https://www.yupdduk.com/sub/event/yup-event-detail?pnum=1&row=6&opt_ev=&eventno=2024120007&f_stype=&f_sval=");
	}
}

function currentSlide(n) {
	idx = n-1;
	mPlay();
}
function plusSlides(n) {
	idx += n;
	mPlay();
}