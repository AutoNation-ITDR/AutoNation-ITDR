import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const firebaseConfig = {

apiKey:"API_KEY",
authDomain:"PROJECT.firebaseapp.com",
projectId:"PROJECT_ID"

}

const app=initializeApp(firebaseConfig)

const auth=getAuth()

const db=getFirestore()

let role="dipendente"

window.login=async()=>{

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

await signInWithEmailAndPassword(auth,email,pass)

}

onAuthStateChanged(auth,user=>{

if(user){

document.getElementById("login").style.display="none"
document.getElementById("app").style.display="block"

if(user.email.includes("admin"))
role="admin"

loadCars()
loadVendite()

}

})

window.showPage=(id)=>{

document.querySelectorAll(".page").forEach(p=>p.style.display="none")

document.getElementById(id).style.display="block"

}

window.addCar=async()=>{

let name=document.getElementById("carName").value
let price=document.getElementById("carPrice").value

await addDoc(collection(db,"cars"),{

name,
price

})

loadCars()

}

async function loadCars(){

let list=document.getElementById("carList")

list.innerHTML=""

const query=await getDocs(collection(db,"cars"))

query.forEach(doc=>{

let c=doc.data()

list.innerHTML+=`

<div class="car">

<h3>${c.name}</h3>

<p>${c.price}</p>

<button onclick="sellCar('${c.name}')">Vendi</button>

</div>

`

})

}

let targa=1

window.sellCar=async(auto)=>{

let nome=prompt("Nome cliente")
let cognome=prompt("Cognome cliente")

let plate="TEX-"+String(targa).padStart(3,"0")

targa++

let data=new Date().toLocaleDateString()

await addDoc(collection(db,"sales"),{

nome,
cognome,
auto,
plate,
data

})

generatePDF(nome,cognome,auto,plate)

loadVendite()

}

async function loadVendite(){

let table=document.getElementById("sales")

table.innerHTML=""

const query=await getDocs(collection(db,"sales"))

query.forEach(doc=>{

let v=doc.data()

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

let signaturePad=new SignaturePad(canvas)

}
