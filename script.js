const PASSWORD = "1234";

let cars = JSON.parse(localStorage.getItem("cars")) || [];
const carList = document.getElementById("car-list");

const dropArea = document.getElementById("drop-area");
const imageInput = document.getElementById("imageFile");

let currentImageBase64 = null;

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

// APERTURA PANNELLO (SOLO SE CLICCHI PERSONALE)
function openPanel() {
    let pass = prompt("Accesso personale");
    if (pass === PASSWORD) {
        document.getElementById("panel").classList.remove("hidden");
    } else {
        alert("Accesso negato");
    }
}

// CHIUSURA PANNELLO
function closePanel() {
    document.getElementById("panel").classList.add("hidden");
    resetForm();
}

// RESET FORM
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    imageInput.value = "";
    currentImageBase64 = null;
    dropArea.querySelector("p").innerHTML =
        "Trascina qui l'immagine dell'auto<br><span>oppure clicca per selezionarla</span>";
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
    closePanel();
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

// SCROLL A SEZIONE AUTO
function scrollToCars() {
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
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

// AVVIO
displayCars();
