const imgBase = 'https://static.cjiso.ninja/imgs/'
const imgNames = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg']
const imgUrls = []
for (const n of imgNames) {
    imgUrls.push(imgBase + n)
}

class Index {
    constructor(i, limit) {
        this.i = i ?? 0
        this.limit = limit
    }
    get() {
        return this.i
    }
    next() {
        return this.i+1 < this.limit?++this.i:-1
    }
    previous() {
        return this.i-1 > -1?--this.i:-1
    }
}
const index = new Index(0, imgUrls.length)


function change(src) {
    loading.style.visibility = 'visible'
    display.style.visibility = 'hidden'
    display.src = src
    imgSrc.href = imgSrc.innerHTML = src

}
function shake(e) {
    e.classList.add('outbound')
    setTimeout(()=>{e.classList.remove('outbound')}, 1000)
}

display.onload = () => {
    loading.style.visibility = 'hidden'
    display.style.visibility = 'visible'
}

change(imgUrls[index.get()])


previous.onclick = function() {
    let i = index.previous()
    if(i == -1) {
        return shake(this)
    }
    change(imgUrls[i])
}
next.onclick = function() {
    let i = index.next()
    if(i == -1) {
        return shake(this)
    }
    change(imgUrls[i])
}