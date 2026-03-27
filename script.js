const PASSWORD = "1234";

let cars = JSON.parse(localStorage.getItem("cars")) || [];
const carList = document.getElementById("car-list");

function enterSite() {
    document.getElementById("welcome").style.display = "none";
}

function displayCars() {
    carList.innerHTML = "";

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

function openPanel() {
    let pass = prompt("Accesso personale");
    if (pass === PASSWORD) {
        document.getElementById("panel").classList.remove("hidden");
    } else {
        alert("Accesso negato");
    }
}

function closePanel() {
    document.getElementById("panel").classList.add("hidden");
}

function addCar() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let file = document.getElementById("imageFile").files[0];

    if (!name || !price || !file) {
        alert("Compila tutti i campi");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let imageBase64 = e.target.result;

        cars.push({ name, price, image: imageBase64 });
        localStorage.setItem("cars", JSON.stringify(cars));

        displayCars();
        closePanel();
    };

    reader.readAsDataURL(file);
}

function removeCar(index) {
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
}

function buyCar(name) {
    alert("Hai selezionato: " + name);
}

function scrollToCars() {
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
}

displayCars();
