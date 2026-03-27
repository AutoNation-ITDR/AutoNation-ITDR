// CARICA AUTO DA MEMORIA
let cars = JSON.parse(localStorage.getItem("cars")) || [
    {
        name: "BMW M4",
        price: "$120.000",
        image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg"
    }
];

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
            <button onclick="deleteCar(${index})" style="background:black;">Elimina</button>
        `;

        carList.appendChild(div);
    });
}

// AGGIUNGI AUTO
function addCar() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (!name || !price || !image) {
        alert("Compila tutti i campi!");
        return;
    }

    cars.push({ name, price, image });

    localStorage.setItem("cars", JSON.stringify(cars));

    displayCars();

    // reset input
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
}

// ELIMINA AUTO
function deleteCar(index) {
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
}

// COMPRA
function buyCar(name) {
    alert("Hai comprato: " + name);
}

// SCROLL
function scrollToCars() {
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
}

// AVVIO
displayCars();
