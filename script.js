// PASSWORD OWNER FISSA (puoi cambiarla qui)
const OWNER_PASSWORD = "admin123";

// Credenziali operatore salvate in localStorage
// chiavi: operatorUserId, operatorUserPass

let cars = JSON.parse(localStorage.getItem("cars")) || [];
const carList = document.getElementById("car-list");

const dropArea = document.getElementById("drop-area");
const imageInput = document.getElementById("imageFile");
let currentImageBase64 = null;

// CANVAS FIRMA
const firmaCanvas = document.getElementById("firmaCanvas");
const ctx = firmaCanvas.getContext("2d");
let drawing = false;

// ENTRA NEL SITO
function enterSite() {
    document.getElementById("welcome").style.display = "none";
}

// MOSTRA AUTO
function displayCars() {
    carList.innerHTML = "";

    if (cars.length === 0) {
        carList.innerHTML = "<p>Nessun veicolo presente.</p>";
        return;
    }

    cars.forEach((car, index) => {
        let div = document.createElement("div");
        div.classList.add("car");

        div.innerHTML = `
            <img src="${car.image}">
            <h3>${car.name}</h3>
            <p>${car.price}</p>
            <button onclick="buyCar('${car.name}')">Seleziona</button>
            <button onclick="removeCar(${index})">Rimuovi</button>
        `;

        carList.appendChild(div);
    });
}

// SCROLL A SEZIONE AUTO
function scrollToCars() {
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
}

// LOGIN OPERATORE
function loginOperator() {
    const userId = document.getElementById("userIdInput").value.trim();
    const userPass = document.getElementById("userPassInput").value.trim();

    const savedUserId = localStorage.getItem("operatorUserId");
    const savedUserPass = localStorage.getItem("operatorUserPass");

    if (!savedUserId || !savedUserPass) {
        alert("Nessuna credenziale operatore impostata. Configurale dal pannello Owner.");
        return;
    }

    if (userId === savedUserId && userPass === savedUserPass) {
        document.getElementById("personal-login").classList.add("hidden");
        document.getElementById("personal-content").classList.remove("hidden");
    } else {
        alert("Credenziali operatore errate.");
    }
}

// LOGIN OWNER
function loginOwner() {
    const pass = document.getElementById("ownerPassInput").value.trim();
    if (pass === OWNER_PASSWORD) {
        document.getElementById("owner-login").classList.add("hidden");
        document.getElementById("owner-content").classList.remove("hidden");
    } else {
        alert("Password Owner errata.");
    }
}

// SALVA CREDENZIALI OPERATORE
function salvaCredenzialiOperatore() {
    const userId = document.getElementById("setUserId").value.trim();
    const userPass = document.getElementById("setUserPass").value.trim();

    if (!userId || !userPass) {
        alert("Compila User ID e Password operatore.");
        return;
    }

    localStorage.setItem("operatorUserId", userId);
    localStorage.setItem("operatorUserPass", userPass);

    alert("Credenziali operatore salvate.");
}

// AGGIUNGI AUTO
function addCar() {
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();

    if (!name || !price || !currentImageBase64) {
        alert("Compila tutti i campi e carica un'immagine.");
        return;
    }

    cars.push({ name, price, image: currentImageBase64 });
    localStorage.setItem("cars", JSON.stringify(cars));

    displayCars();
    resetCarForm();
}

// RESET FORM AUTO
function resetCarForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    imageInput.value = "";
    currentImageBase64 = null;
    dropArea.querySelector("p").innerHTML =
        "Trascina qui l'immagine dell'auto<br><span>oppure clicca per selezionarla</span>";
}

// RIMUOVI AUTO
function removeCar(index) {
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
}

// SELEZIONA AUTO
function buyCar(name) {
    alert("Hai selezionato: " + name);
}

/* GESTIONE UPLOAD IMMAGINE */

// click su area -> apre file input
dropArea.addEventListener("click", () => {
    imageInput.click();
});

// cambio file da input
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) readImageFile(file);
});

// drag & drop
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (file) readImageFile(file);
});

// lettura file immagine -> base64
function readImageFile(file) {
    if (!file.type.startsWith("image/")) {
        alert("Carica solo file immagine.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        currentImageBase64 = event.target.result;
        dropArea.querySelector("p").innerHTML = "Immagine caricata ✔";
    };
    reader.readAsDataURL(file);
}

/* FIRMA SU CANVAS */

firmaCanvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    const rect = firmaCanvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

firmaCanvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const rect = firmaCanvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
});

window.addEventListener("mouseup", () => {
    drawing = false;
});

function clearSignature() {
    ctx.clearRect(0, 0, firmaCanvas.width, firmaCanvas.height);
}

/* FATTURA */

function generaFattura() {
    const nome = document.getElementById("fatturaNome").value.trim();
    const cognome = document.getElementById("fatturaCognome").value.trim();
    const targa = document.getElementById("fatturaTarga").value.trim();
    const auto = document.getElementById("fatturaAuto").value.trim();
    const prezzo = document.getElementById("fatturaPrezzo").value.trim();

    if (!nome || !cognome || !targa || !auto || !prezzo) {
        alert("Compila tutti i campi della fattura.");
        return;
    }

    // controlla se c'è firma (semplice check: immagine non vuota)
    const firmaData = firmaCanvas.toDataURL();
    // non facciamo un controllo avanzato, ma almeno salviamo l'immagine

    const fatturaDiv = document.getElementById("fattura-output");
    fatturaDiv.classList.remove("hidden");

    const oggi = new Date();
    const dataStr = oggi.toLocaleDateString("it-IT");

    fatturaDiv.innerHTML = `
        <h3>Fattura di Vendita</h3>
        <p><strong>Data:</strong> ${dataStr}</p>
        <p><strong>Cliente:</strong> ${nome} ${cognome}</p>
        <p><strong>Targa veicolo:</strong> ${targa}</p>
        <p><strong>Modello auto:</strong> ${auto}</p>
        <p><strong>Prezzo:</strong> ${prezzo}</p>
        <p><strong>Concessionario:</strong> AutoNation</p>
        <h4>Firma Cliente:</h4>
        <img src="${firmaData}" alt="Firma cliente" style="max-width:300px;border:1px solid #000;">
    `;

    // opzionale: apri stampa
    // window.print();
}

// AVVIO
displayCars();
