const pictures =['https://pyxis.nymag.com/v1/imgs/a44/ce7/a057c9957e7aa580f25a7b3bbb1c9011e6-02-iron-man-3.rhorizontal.w700.jpg'
,'https://mcmoutletonline.com/pics/doctor-strange-full-movie-online-4.jpg'
,'https://i.pinimg.com/564x/2c/3f/d7/2c3fd77862947349f29dc9a08d66ce7f.jpg'
,'https://image.api.playstation.com/vulcan/img/rnd/202011/0714/Cu9fyu6DM41JPekXLf1neF9r.png?w=5000&thumb=false'
,'https://vignette.wikia.nocookie.net/shipping/images/4/47/3steverogers.jpg/revision/latest/scale-to-width-down/2000?cb=20181003212109'
,'https://vignette.wikia.nocookie.net/filmguide/images/4/49/ScarletWitchIW.jpg/revision/latest?cb=20180429135448'
,'https://images.hdqwalls.com/download/black-widow-avengers-4k-va-1080x1920.jpg'
,'https://vignette.wikia.nocookie.net/marvel-cinematic-universe-fanon/images/5/59/38397.jpg/revision/latest?cb=20191029044629'
,'https://vignette.wikia.nocookie.net/filmguide/images/a/ad/WinterSoldierIW.jpg/revision/latest?cb=20180429045610'
,'https://th.bing.com/th/id/OIP.zf7pljErcHbZS42diVQdUwHaJQ?pid=ImgDet&rs=1'
,'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/2/2d/Hawkeye.PNG/revision/latest?cb=20191217060632&path-prefix=de'
,'https://i.ebayimg.com/images/g/TVAAAOSwPqBdryir/s-l400.jpg'
,'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/48/Falcon_AIW_Profile.jpg/revision/latest?cb=20180416151017']

const names = ['Iron man','Doctor Strange','Thor','spider man','Captain America','Scarlet witch','Black Widow','Hulk','Winter Sodier','Black Panther','Hawk Eye','Ant Man'
,'Falcon']

let count = 0;

const btn = document.querySelectorAll('.image-viewer__button');
//console.log(btn);
const image = document.querySelector('.image-viewer__display');

const loader = document.querySelector('#loader');

btn[1].addEventListener('click',(e) => {
    console.log(count);
    if (count === pictures.length-1) {
        btn[1].disabled = true;
        btn[1].classList.add('disabled')
        //console.log(count);
    }else{
        e.preventDefault();
        btn[0].disabled = false;
        btn[0].classList.remove('disabled');
        count++;
        image.style.visibility = 'hidden';
        document.querySelector('.image-viewer__display img').src = pictures[count];
        document.querySelector('.image-viewer__display p a').href = pictures[count];
        document.querySelector('.image-viewer__display p a').innerHTML = pictures[count];
        setTimeout( function() {
            image.style.visibility = 'visible';
        },200)
        //console.log(document.querySelector('.image-viewer__display img').src);
        //console.log(count);
        //console.log(btn[1].disabled)
    }

    if (count === pictures.length-1) {
        btn[1].disabled = true;
        btn[1].classList.add('disabled')
        //console.log(count);
    }

});

btn[0].addEventListener('click',(e) => {
    //console.log(count);
    if(count === 0){
        btn[0].disabled = true;
        btn[0].classList.add('disabled')
        //console.log(count);
    }else{
        e.preventDefault();
        btn[1].disabled = false;
        btn[1].classList.remove('disabled');
        count--;
        image.style.visibility = 'hidden';//注意一定要有引號
        document.querySelector('.image-viewer__display img').src = pictures[count];
        document.querySelector('.image-viewer__display p a').href = pictures[count];
        document.querySelector('.image-viewer__display p a').innerHTML = pictures[count];
        setTimeout( function() {
            image.style.visibility = 'visible';
        },200)
        
        //console.log(document.querySelector('.image-viewer__display img').src);
        //console.log(count);
        
    } 

    if(count === 0){
        btn[0].disabled = true;
        btn[0].classList.add('disabled')
        //console.log(count);
    }
});

window.addEventListener('load',function() {
    loader.style.height = "100px";
    loader.style.width = "100px";
})
