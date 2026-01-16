let filters = { 
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
const filtersContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
let file = null
let image = null

function createFilterElement(name,unit = "%",value,min,max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(event)=>{
        filters[name].value = input.value
        applyfilters()
    })

    return div
}

// Create filter elements dynamically
function createFilters(){

    Object.keys(filters).forEach(key =>{

    // console.log(key,filters[key]);
    const f = filters[key]
    // const filterElement = createElement(key,filters[key].unit.filters[key].value.filters[key].min.filters[key].max)
    const filterElement = createFilterElement(key,f.unit,f.value,f.min,f.max)
    filtersContainer.appendChild(filterElement)
})
}
createFilters()

imgInput.addEventListener("change",(event)=>{
    let file = event.target.files[0]
    const imagePlaceHolder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceHolder.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () =>{
        image=img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img,0,0)
    }
})

function applyfilters(){
    if (!image) return

    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height)

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim()
    canvasCtx.drawImage(image,0,0)
}

// resetButton.addEventListener("click",()=>{

//     filters = { 
//     brightness:{
//         value:100,
//         min:0,
//         max:200,
//         unit:"%"
//     },
//     contrast:{
//         value:100,
//         min:0,
//         max:200,
//         unit:"%"
//     },
//     saturation:{
//         value:100,
//         min:0,
//         max:200,
//         unit:"%"
//     },
//     hueRotation:{
//         value:0,
//         min:0,
//         max:360,
//         unit:"deg"
//     },
//     blur:{
//         value:0,
//         min:0,
//         max:20,
//         unit:"px"
//     },
//     grayscale:{
//         value:0,
//         min:0,
//         max:100,
//         unit:"%"
//     },
//     sepia:{
//         value:0,
//         min:0,
//         max:100,
//         unit:"%"
//     },
//     opacity:{
//         value:100,
//         min:0,
//         max:100,
//         unit:"%"
//     },
//     invert:{
//         value:0,
//         min:0,
//         max:100,
//         unit:"%"
//     }
// }
// applyfilters()

// filtersContainer.innerHTML = ""
// createFilters()
// })

resetButton.addEventListener("click", () => {
    Object.keys(filters).forEach(key => {
        if (key === "brightness" || key === "contrast" || key === "saturation") {
            filters[key].value = 100
        } 
        else if (key === "opacity") {
            filters[key].value = 100
        } 
        else {
            filters[key].value = 0
        }
    })

    // Sync sliders with values
    filtersContainer.innerHTML = ""
    createFilters()

    applyfilters()
})

downloadButton.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "Edited-image-png"
    link.href = imageCanvas.toDataURL()
    link.click()
})
