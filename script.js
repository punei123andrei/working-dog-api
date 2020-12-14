// fetch('https://dog.ceo/api/breeds/list/all').then(function(response){
//     return response.json()
// }).then(function(data){
//     console.log(data)
// }) old way of doing things


let timer
let deleteDelay
async function start(){
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    createlist(data.message)
    } catch (e){
        alert(e); //sif there is an error tring to catch the request
    }
}

start()


function createlist(breedlist){
document.getElementById('breed').innerHTML = `
        <select onchange="loadbreed(this.value)">
            <option value="">Choose a dog breed</option>
            ${Object.keys(breedlist).map(breed => {
                return `<option>${breed}</option>`
            }).join('')}
        </select>
`;
}

async function loadbreed(breed){
    if(breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createslide(data.message)
    }
 }

 function createslide(images){
     let currentpos = 0
     clearInterval(timer)
     clearTimeout(deleteDelay)
     if(images.length > 1){
        document.getElementById('slideshow').innerHTML = `
     <div class="slide" style="background-image: url('${images[0]}')">
     </div>
     <div class="slide" style="background-image: url('${images[1]}')">
     </div>
     `
     currentpos += 2
     if(images.length == 2) currentpos = 0
     timer = setInterval(nextSlide, 3000) 
     } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')">
        </div>
        <div class="slide">
        </div>
        `
     }
     
     function nextSlide(){
        
        document.getElementById('slideshow').insertAdjacentHTML("beforeEnd", `
        <div class="slide" style="background-image: url('${images[currentpos]}')">
        </div>
        `)
        deleteDelay = setTimeout(() => {
            document.querySelector('.slide').remove()
            currentpos += 1
        }, 1000)
        if(currentpos + 1 >= images.length) {
            currentpos = 0
        } else {
            currentpos++
        }
    }
 }

 