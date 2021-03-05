var imgs = [
	"https://www.rd.com/wp-content/uploads/2019/01/shutterstock_673465372.jpg",
	"https://www.labrottie.com/wp-content/uploads/2020/05/Cute-dog-names-Labrottie.com_-3-scaled-1.jpg",
	"https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/03/15/17/pixel-dogsofinstagram-3-15-19.jpg",
	"http://tn.ganbi.cc/d/file/kaifadou/201904081345/2018072109111794083.jpg",
	"http://s2.itislooker.com/imgs/201904/19/11/15556443436852.jpg"
];
var imgs_ref = [
	"https://www.google.com.tw/url?sa=i&url=https%3A%2F%2Fwww.rd.com%2Flist%2Fcutest-dog-breeds%2F&psig=AOvVaw2KUmv31eDPMmLuFbu50ltS&ust=1615034117668000&source=images&cd=vfe&ved=0CAMQjB1qFwoTCJChk4qVme8CFQAAAAAdAAAAABAD",
	"https://www.google.com.tw/url?sa=i&url=https%3A%2F%2Fwww.labrottie.com%2Fcute-dog-names%2F&psig=AOvVaw3N5n_StcFHak9TUy84PUg-&ust=1615034179808000&source=images&cd=vfe&ved=0CAMQjB1qFwoTCIifg6eVme8CFQAAAAAdAAAAABAD",
	"https://www.google.com.tw/url?sa=i&url=https%3A%2F%2Fwww.standard.co.uk%2Flifestyle%2Fesmagazine%2Fcult-of-cute-a4206721.html&psig=AOvVaw2vWHWm4K84cI6knSPNYeFZ&ust=1615034201745000&source=images&cd=vfe&ved=0CAMQjB1qFwoTCIjfo7GVme8CFQAAAAAdAAAAABAD",
	"https://www.google.com.tw/url?sa=i&url=http%3A%2F%2Fm.ggrj.org%2Ftx%2Fdongwutx%2F8634.html&psig=AOvVaw0dF2IS8Rc76qSxSV3VNlQI&ust=1615034219873000&source=images&cd=vfe&ved=0CAMQjB1qFwoTCPiU3bmVme8CFQAAAAAdAAAAABAD",
	"https://www.google.com.tw/url?sa=i&url=http%3A%2F%2Fwww.itislooker.com%2Fpost02080911064833&psig=AOvVaw0sjhxGIGNCwgEZQUTyT-b2&ust=1615034235313000&source=images&cd=vfe&ved=0CAMQjB1qFwoTCPi_jcGVme8CFQAAAAAdAAAAABAD"
]
var idx;
var img = document.getElementById("display");
var img_ref = document.getElementById("source");
var pre_button = document.getElementById("previous");
var next_button = document.getElementById("next");
// var load = document.getElementById("loading");
img.src = "images/loading.gif";

window.onload = function() {
	idx = 2;
	load();
}

function load() {
	if (idx === 0) 
		pre_button.classList.add("disabled");
	else if (idx === 4)
		next_button.classList.add("disabled");
	else if (idx === 1)
		pre_button.classList.remove("disabled");
	else if (idx === 3)
		next_button.classList.remove("disabled");
	img.src = imgs[idx]; 
	img_ref.textContent = imgs_ref[idx];
}

pre_button.addEventListener(
	"click", 
	function() {
		if (idx > 0) {
			idx--;
		}
		img.src = "images/loading.gif";
		load();
	}
);

next_button.addEventListener(
	"click", 
	function() {
		if (idx < 4) {
			idx++;
		}
		img.src = "images/loading.gif";
		load();
	}
)


