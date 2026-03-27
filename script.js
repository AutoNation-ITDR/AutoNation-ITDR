/* -------------------- JS COMPLETO -------------------- */

const OWNER_PASSWORD = "OWNER123";
let cars = JSON.parse(localStorage.getItem("cars")) || [];

/* -------------------- CAMBIO PAGINA -------------------- */
function goPage(page){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    if(page === "auto") displayCars();
    if(page === "personale") aggiornaSelectAuto();
}

/* -------------------- MOSTRA AUTO ORDINATE -------------------- */
function displayCars(){
    const carList = document.getElementById("car-list");
    carList.innerHTML = "";

    if(cars.length === 0){
        carList.innerHTML = "<p>NESSUN VEICOLO PRESENTE.</p>";
        return;
    }

    // ORDINE ALFABETICO
    cars.sort((a,b)=> a.name.localeCompare(b.name));

    cars.forEach((car, index)=>{
        carList.innerHTML += `
            <div class="car" onclick="selezionaAuto('${car.name}', '${car.price}')">
                <img src="${car.image}">
                <h3>${car.name}</h3>
                <p>${car.price}</p>
                <button onclick="event.stopPropagation(); removeCar(${index})">RIMUOVI</button>
            </div>
        `;
    });
}

/* -------------------- CLICK SU AUTO → COMPILA FATTURA -------------------- */
function selezionaAuto(nome, prezzo){
    goPage("personale");

    document.getElementById("fatturaAuto").value = nome;
    document.getElementById("fatturaPrezzo").value = prezzo;
}

/* -------------------- MENU A TENDINA AUTO -------------------- */
function aggiornaSelectAuto(){
    const select = document.getElementById("selectAuto");
    select.innerHTML = `<option value="">SELEZIONA VEICOLO</option>`;

    cars.sort((a,b)=> a.name.localeCompare(b.name));

    cars.forEach(car=>{
        let opt = document.createElement("option");
        opt.value = car.name;
        opt.textContent = car.name;
        opt.dataset.price = car.price;
        select.appendChild(opt);
    });
}

function autoSelezionata(){
    const select = document.getElementById("selectAuto");
    const nome = select.value;

    if(!nome) return;

    const prezzo = select.options[select.selectedIndex].dataset.price;

    document.getElementById("fatturaAuto").value = nome;
    document.getElementById("fatturaPrezzo").value = prezzo;
}

/* -------------------- AGGIUNGI AUTO -------------------- */
let currentImageBase64 = null;

document.addEventListener("change", e=>{
    if(e.target.id === "imageFile"){
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onload = ev => currentImageBase64 = ev.target.result;
        reader.readAsDataURL(file);
    }
});

function addCar(){
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();

    if(!name || !price || !currentImageBase64){
        alert("COMPILA TUTTI I CAMPI");
        return;
    }

    cars.push({name, price, image: currentImageBase64});
    localStorage.setItem("cars", JSON.stringify(cars));

    alert("AUTO AGGIUNTA");
}

/* -------------------- RIMUOVI AUTO -------------------- */
function removeCar(i){
    cars.splice(i,1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
}

/* -------------------- LOGIN OPERATORE -------------------- */
function loginOperator(){
    let id = document.getElementById("userIdInput").value.trim();
    let pw = document.getElementById("userPassInput").value.trim();

    let sid = localStorage.getItem("operatorUserId");
    let spw = localStorage.getItem("operatorUserPass");

    if(!sid || !spw){
        alert("IMPOSTA LE CREDENZIALI NEL PANNELLO OWNER");
        return;
    }

    if(id === sid && pw === spw){
        document.getElementById("personal-login").classList.add("hidden");
        document.getElementById("personal-content").classList.remove("hidden");
    } else {
        alert("CREDENZIALI ERRATE");
    }
}

/* -------------------- LOGIN OWNER -------------------- */
function loginOwner(){
    let pw = document.getElementById("ownerPassInput").value.trim();

    if(pw === OWNER_PASSWORD){
        document.getElementById("owner-login").classList.add("hidden");
        document.getElementById("owner-content").classList.remove("hidden");
    } else {
        alert("PASSWORD OWNER ERRATA");
    }
}

/* -------------------- SALVA CREDENZIALI OPERATORE -------------------- */
function salvaCredenzialiOperatore(){
    let id = document.getElementById("setUserId").value.trim();
    let pw = document.getElementById("setUserPass").value.trim();

    if(!id || !pw){
        alert("COMPILA TUTTO");
        return;
    }

    localStorage.setItem("operatorUserId", id);
    localStorage.setItem("operatorUserPass", pw);

    alert("CREDENZIALI SALVATE");
}

/* -------------------- PDF CON TIMBRO DIGITALE -------------------- */
async function generaFatturaPDF(){
    let nome = document.getElementById("fatturaNome").value.trim();
    let cognome = document.getElementById("fatturaCognome").value.trim();
    let targa = document.getElementById("fatturaTarga").value.trim();
    let auto = document.getElementById("fatturaAuto").value.trim();
    let prezzo = document.getElementById("fatturaPrezzo").value.trim();
    let firma = document.getElementById("firmaDigitale").value.trim();

    if(!nome || !cognome || !targa || !auto || !prezzo || !firma){
        alert("COMPILA TUTTI I CAMPI");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    /* LOGO */
    const logoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Car_icon_2.svg/512px-Car_icon_2.svg.png";

    const logo = await fetch(logoURL)
        .then(r => r.blob())
        .then(b => new Promise(resolve=>{
            let reader = new FileReader();
            reader.onload = ()=> resolve(reader.result);
            reader.readAsDataURL(b);
        }));

    pdf.addImage(logo, "PNG", 150, 10, 40, 40);

    /* TITOLO */
    pdf.setFont("courier","bold");
    pdf.setFontSize(22);
    pdf.text("FATTURA DI VENDITA", 10, 25);

    pdf.setFontSize(12);
    pdf.setFont("courier","normal");

    let y = 50;
    pdf.text(`CLIENTE: ${nome} ${cognome}`,10,y); y+=8;
    pdf.text(`TARGA: ${targa}`,10,y); y+=8;
    pdf.text(`MODELLO: ${auto}`,10,y); y+=8;
    pdf.text(`PREZZO: ${prezzo}`,10,y); y+=12;

    /* FIRMA DIGITALE */
    pdf.text("FIRMA DIGITALE DIPENDENTE:",10,y);
    pdf.text(firma, 80, y);
    y+=20;

    /* TIMBRO DIGITALE (RIQUADRO) */
    pdf.setDrawColor(255,0,0);
    pdf.setLineWidth(1);
    pdf.rect(10, y, 80, 25);

    pdf.setFont("courier","bold");
    pdf.text("TIMBRO DIGITALE", 15, y+10);
    pdf.text("AUTONATION", 15, y+20);

    y+=40;

    /* DISCLAIMER */
    pdf.setFontSize(10);
    pdf.setFont("courier","normal");
    pdf.text("QUESTA FATTURA È GENERATA DIGITALMENTE DA AUTONATION.",10,y); y+=6;
    pdf.text("VALIDA AI FINI DI LEGGE SE ACCOMPAGNATA DA DOCUMENTO D'IDENTITÀ.",10,y);

    pdf.save(`FATTURA_${nome}_${cognome}.PDF`);
    alert("FATTURA PDF GENERATA");
}

