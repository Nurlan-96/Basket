let buttons = document.querySelectorAll(".btn");
let basketCount = document.querySelector("sup");
let cart = document.querySelector("#cart");
let basketPage = document.querySelector(".basketpage");
let closeButton = document.querySelector("#close");
let table = document.querySelector(".table");

buttons.forEach(button => {
    button.onclick = function (ev) {
        ev.preventDefault();

        let productArr;
        let productId = this.parentElement.getAttribute("data-id");

        if (localStorage.getItem("basket") === null) {
            productArr = [];
        } else {
            productArr = JSON.parse(localStorage.getItem("basket"));
        }

        let existProduct = productArr.find(p => p.id == productId);

        if (existProduct) {
            existProduct.count++;
        } else {
            let product = {
                id: productId,
                name: this.parentElement.firstElementChild.innerText,
                desc: this.previousElementSibling.previousElementSibling.innerText,
                price: parseFloat(this.parentElement.querySelector(".price").innerText.replace("$", "")), //neye gorese previousElementSibling burda bos array ya da NaN verirdi.
                count: 1,
                image: this.parentElement.previousElementSibling.getAttribute("src")
            };
            productArr.push(product);
        }

        localStorage.setItem("basket", JSON.stringify(productArr));
        Calculate();
    };
});

function Calculate() {
    let basket = localStorage.getItem("basket");
    let length = 0;

    if (basket) {
        length = JSON.parse(basket).length;
    }

    basketCount.innerText = length;
}
Calculate();

cart.addEventListener('click', function (ev) {
    ev.preventDefault();
    if (basketPage.classList.contains("d-none")) {
        basketPage.classList.remove("d-none");
    }
});

closeButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    basketPage.classList.add("d-none");
});

function GetBasket() {
    let basket = localStorage.getItem("basket");
    let products = [];
    if (basket)
        products = JSON.parse(basket);
    return products;
}
GetBasket().forEach(element => {
    let tr = document.createElement("tr");
    let tdImage = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", element.image);
    img.style.width = "100px";
    img.style.height = "100px";
    tdImage.append(img);
    let tdName = document.createElement("td");
    tdName.innerText = element.name;
    let tdPrice = document.createElement("td");
    tdPrice.innerText = (element.count * element.price) + "$";
    let tdCount = document.createElement("td");
    tdCount.innerText = element.count;
    let tdRemove = document.createElement("td");
    tdRemove.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    tr.append(tdImage,tdName,tdPrice,tdCount,tdRemove);
    table.lastElementChild.append(tr);

    tdRemove.addEventListener('click', function(ev) {
        ev.preventDefault();
        let basket = GetBasket();
            let index = basket.findIndex(item => item.id === element.id);
        if (index !== -1) {
            basket.splice(index, 1);
        }
            localStorage.setItem("basket", JSON.stringify(basket));
        Calculate();
        tr.remove();
    });
    
})

