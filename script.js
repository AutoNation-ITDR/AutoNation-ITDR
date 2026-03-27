const PASSWORD = "1234"

let cars = JSON.parse(localStorage.getItem("cars")) || []

const carList = document.getElementById("car-list")

displayCars()


function displayCars(){

carList.innerHTML=""

cars.forEach((car,index)=>{

const div=document.createElement("div")

div.classList.add("car")

div.innerHTML=`

<img src="${car.image}">

<h3>${car.name}</h3>

<p>${car.price}</p>

<button onclick="editCar(${index})">Modifica</button>

<button onclick="removeCar(${index})">Elimina</button>

`

carList.appendChild(div)

})

}


function openPanel(){

const pass=prompt("Password personale")

if(pass===PASSWORD){

document.getElementById("panel").classList.remove("hidden")

}else{

alert("Accesso negato")

}

}


function closePanel(){

document.getElementById("panel").classList.add("hidden")

}


function addCar(){

const name=document.getElementById("name").value
const price=document.getElementById("price").value
const image=document.getElementById("image").value

if(!name||!price||!image){

alert("Compila tutto")

return

}

cars.push({name,price,image})

save()

displayCars()

}


function editCar(index){

const name=prompt("Nuovo nome",cars[index].name)
const price=prompt("Nuovo prezzo",cars[index].price)

cars[index].name=name
cars[index].price=price

save()

displayCars()

}


function removeCar(index){

if(confirm("Eliminare auto?")){

cars.splice(index,1)

save()

displayCars()

}

}


function save(){

localStorage.setItem("cars",JSON.stringify(cars))

}


function scrollToCars(){

document.getElementById("cars").scrollIntoView({

behavior:"smooth"

})

}


const dropArea=document.getElementById("drop-area")

dropArea.addEventListener("dragover",e=>{

e.preventDefault()

})


dropArea.addEventListener("drop",e=>{

e.preventDefault()

const file=e.dataTransfer.files[0]

const reader=new FileReader()

reader.onload=function(event){

document.getElementById("image").value=event.target.result

}

reader.readAsDataURL(file)

})
