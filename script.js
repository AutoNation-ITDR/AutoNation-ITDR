// PASSWORD ADMIN (CAMBIALA QUI 🔥)
const ADMIN_PASSWORD = "1234";

let cars = JSON.parse(localStorage.getItem("cars")) || [];

const carList = document.getElementById("car-list");

// MOSTRA AUTO
function displayCars() {
    carList.innerHTML = "";

    cars.forEach((car, index) => {
        const div = document.createElement("div");
        div.classList.add("car");

        div.innerHTML = `
            <img src="${car.image}">
            <h3>${car.name}</h3>
            <p>${car.price}</p>
            <button onclick="buyCar('${car.name}')">Compra</button>
        `;

        carList.appendChild(div);
    });
}

// ADMIN LOGIN
function openAdmin() {
    const pass = prompt("Inserisci password admin:");

    if (pass === ADMIN_PASSWORD) {
        document.getElementById("admin-panel").classList.remove("hidden");
    } else {
        alert("Accesso negato!");
    }
}

function closeAdmin() {
    document.getElementById("admin-panel").classList.add("hidden");
}

// AGGIUNGI AUTO
function addCar() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (!name || !price || !image) return alert("Compila tutto!");

    cars.push({ name, price, image });

    localStorage.setItem("cars", JSON.stringify(cars));

    displayCars();
}

// AZIONE
function buyCar(name) {
    alert("Hai selezionato: " + name);
}

// SCROLL
function scrollToCars() {
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
}

// AVVIO
displayCars();
