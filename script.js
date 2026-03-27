const PASSWORD = "1234";

let cars = JSON.parse(localStorage.getItem("cars")) || [];

const carList = document.getElementById("car-list");


function displayCars() {

carList.innerHTML = "";

cars.forEach((car,index)=>{

const div = document.createElement("div");

div.classList.add("car");

div.innerHTML = `
<img src="${car.image}" onerror="this.src='https://via.placeholder.com/300x200'">

<h3>${car.name}</h3>

<p>${car.price}</p>

<button onclick="buyCar('${car.name}')">Seleziona</button>

<button onclick="removeCar(${index})" class="delete">Rimuovi</button>
`;

carList.appendChild(div);

});

}



function openPanel(){

const pass = prompt("Accesso riservato al personale:");

if(pass === PASSWORD){

document.getElementById("panel").classList.remove("hidden");

}else{

alert("Accesso negato!");

}

}



function closePanel(){

document.getElementById("panel").classList.add("hidden");

}



function addCar(){

const name = document.getElementById("name").value.trim();
const price = document.getElementById("price").value.trim();
const image = document.getElementById("image").value.trim();

if(!name || !price || !image){

alert("Compila tutti i campi!");
return;

}

cars.push({name,price,image});

localStorage.setItem("cars",JSON.stringify(cars));

displayCars();

document.getElementById("name").value="";
document.getElementById("price").value="";
document.getElementById("image").value="";

}



function removeCar(index){

if(confirm("Vuoi eliminare questa auto?")){

cars.splice(index,1);

localStorage.setItem("cars",JSON.stringify(cars));

displayCars();

}

}



function buyCar(name){

alert("Hai selezionato: "+name);

}



function scrollToCars(){

document.getElementById("cars").scrollIntoView({
behavior:"smooth"
});

}



displayCars();
