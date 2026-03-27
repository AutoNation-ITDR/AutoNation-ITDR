const PASSWORD = "1234";

let cars = JSON.parse(localStorage.getItem("cars")) || [];

const carList = document.getElementById("car-list");

displayCars();

function displayCars(){

carList.innerHTML="";

cars.forEach((car,index)=>{

const div=document.createElement("div");

div.classList.add("car");

div.innerHTML=`

<img src="${car.image}">

<h3>${car.name}</h3>

<p>${car.price}</p>

<button onclick="buyCar('${car.name}')">Seleziona</button>

<button onclick="editCar(${index})">Modifica</button>

<button onclick="removeCar(${index})">Elimina</button>

`;

carList.appendChild(div);

});

}



function addCar(){

const name=document.getElementById("name").value;

const price=document.getElementById("price").value;

const image=document.getElementById("image").value;

if(!name||!price||!image){

alert("Compila tutti i campi");

return;

}

cars.push({name,price,image});

saveCars();

displayCars();

}



function editCar(index){

const newName=prompt("Nuovo nome",cars[index].name);

const newPrice=prompt("Nuovo prezzo",cars[index].price);

if(newName && newPrice){

cars[index].name=newName;

cars[index].price=newPrice;

saveCars();

displayCars();

}

}



function removeCar(index){

if(confirm("Eliminare auto?")){

cars.splice(index,1);

saveCars();

displayCars();

}

}



function clearCars(){

if(confirm("Eliminare TUTTE le auto?")){

cars=[];

saveCars();

displayCars();

}

}



function saveCars(){

localStorage.setItem("cars",JSON.stringify(cars));

}



function buyCar(name){

alert("Hai selezionato: "+name);

}



function scrollToCars(){

document.getElementById("cars").scrollIntoView({

behavior:"smooth"

});

}



function openLogin(){

document.getElementById("login").classList.remove("hidden");

}



function closeLogin(){

document.getElementById("login").classList.add("hidden");

}



function login(){

const pass=document.getElementById("password").value;

if(pass===PASSWORD){

closeLogin();

openPanel();

}else{

alert("Password errata");

}

}



function openPanel(){

document.getElementById("panel").classList.remove("hidden");

}



function closePanel(){

document.getElementById("panel").classList.add("hidden");

}



const dropArea=document.getElementById("drop-area");



dropArea.addEventListener("dragover",e=>{

e.preventDefault();

});



dropArea.addEventListener("drop",e=>{

e.preventDefault();

const file=e.dataTransfer.files[0];

const reader=new FileReader();



reader.onload=function(event){

document.getElementById("image").value=event.target.result;

};



reader.readAsDataURL(file);

});
