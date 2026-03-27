const PASSWORD="1234"

let cars=JSON.parse(localStorage.getItem("cars"))||[]

let vendite=JSON.parse(localStorage.getItem("vendite"))||[]

let numeroTarga=localStorage.getItem("numeroTarga")||1

const carList=document.getElementById("car-list")

const listaVendite=document.getElementById("lista-vendite")

displayCars()

mostraVendite()


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

alert("Compila tutti i campi")

return

}

cars.push({name,price,image})

saveCars()

displayCars()

}


function editCar(index){

const name=prompt("Nuovo nome",cars[index].name)
const price=prompt("Nuovo prezzo",cars[index].price)

cars[index].name=name
cars[index].price=price

saveCars()

displayCars()

}


function removeCar(index){

if(confirm("Eliminare auto?")){

cars.splice(index,1)

saveCars()

displayCars()

}

}


function saveCars(){

localStorage.setItem("cars",JSON.stringify(cars))

}


function scrollToCars(){

document.getElementById("cars").scrollIntoView({

behavior:"smooth"

})

}


function generaTarga(){

let numero=String(numeroTarga).padStart(3,"0")

let targa="TEX-"+numero

numeroTarga++

localStorage.setItem("numeroTarga",numeroTarga)

return targa

}


function registraVendita(){

const nome=document.getElementById("nome").value
const cognome=document.getElementById("cognome").value
const modello=document.getElementById("modello").value

if(!nome||!cognome||!modello){

alert("Compila tutti i campi")

return

}

const targa=generaTarga()

vendite.push({

targa,
nome,
cognome,
modello

})

localStorage.setItem("vendite",JSON.stringify(vendite))

mostraVendite()

}


function mostraVendite(){

listaVendite.innerHTML=""

vendite.forEach((v,index)=>{

const row=document.createElement("tr")

row.innerHTML=`

<td>${v.targa}</td>
<td>${v.nome}</td>
<td>${v.cognome}</td>
<td>${v.modello}</td>
<td><button onclick="eliminaVendita(${index})">Elimina</button></td>

`

listaVendite.appendChild(row)

})

}


function eliminaVendita(index){

if(confirm("Eliminare vendita?")){

vendite.splice(index,1)

localStorage.setItem("vendite",JSON.stringify(vendite))

mostraVendite()

}

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
