const ADMIN_PASSWORD="1234"

let cars=JSON.parse(localStorage.getItem("cars"))||[]
let sales=JSON.parse(localStorage.getItem("sales"))||[]
let plate=localStorage.getItem("plate")||1

function showPage(id){

document.querySelectorAll(".page").forEach(p=>p.style.display="none")

document.getElementById(id).style.display="block"

}

function openAdmin(){

let pass=prompt("Password Admin")

if(pass===ADMIN_PASSWORD){

showPage("vendite")

}else{

alert("Accesso negato")

}

}

function save(){

localStorage.setItem("cars",JSON.stringify(cars))
localStorage.setItem("sales",JSON.stringify(sales))
localStorage.setItem("plate",plate)

}

function addCar(){

let name=document.getElementById("carName").value
let price=document.getElementById("carPrice").value
let file=document.getElementById("imgUpload").files[0]

let reader=new FileReader()

reader.onload=function(){

cars.push({
name,
price,
image:reader.result
})

save()
loadCars()

}

reader.readAsDataURL(file)

}

function loadCars(){

let list=document.getElementById("carList")
list.innerHTML=""

cars.forEach((c,i)=>{

list.innerHTML+=`

<div class="car">

<img src="${c.image}">

<h3>${c.name}</h3>

<p>${c.price}</p>

<button onclick="sellCar(${i})">Vendi</button>

</div>

`

})

}

function sellCar(i){

let nome=prompt("Nome cliente")
let cognome=prompt("Cognome cliente")

let t="TEX-"+String(plate).padStart(3,"0")

plate++

let data=new Date().toLocaleDateString()

sales.push({

plate:t,
nome,
cognome,
auto:cars[i].name,
data

})

generatePDF(nome,cognome,cars[i].name,t)

save()

loadSales()
updateDashboard()

}

function loadSales(){

let table=document.getElementById("sales")
table.innerHTML=""

sales.forEach(v=>{

table.innerHTML+=`

<tr>

<td>${v.plate}</td>
<td>${v.nome} ${v.cognome}</td>
<td>${v.auto}</td>
<td>${v.data}</td>

</tr>

`

})

}

function updateDashboard(){

document.getElementById("totAuto").innerText=cars.length
document.getElementById("totVendite").innerText=sales.length

}

function generatePDF(nome,cognome,auto,plate){

const { jsPDF } = window.jspdf

let doc=new jsPDF()

doc.text("Contratto Vendita Auto",20,20)
doc.text("Cliente: "+nome+" "+cognome,20,40)
doc.text("Auto: "+auto,20,60)
doc.text("Targa: "+plate,20,80)

doc.save("contratto-"+plate+".pdf")

}

let canvas=document.getElementById("signature")

if(canvas){

new SignaturePad(canvas)

}

showPage("dashboard")

loadCars()
loadSales()
updateDashboard()
