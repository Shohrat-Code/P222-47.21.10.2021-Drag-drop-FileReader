class Brand {
    constructor(Id, Brand) {
        this.id = Id,
            this.brand = Brand
    }
}

class Model {
    constructor(Id, Model, Year, Price, Img, BrandId) {
        this.id = Id,
            this.model = Model,
            this.year = Year,
            this.price = Price,
            this.brandId = BrandId,
            this.img = Img
    }
}


let audi = new Brand(1, "Audi");
let bmw = new Brand(2, "BMW");
let mercedes = new Brand(3, "Mercedes");
let Brands = [];
Brands.push(audi);
Brands.push(bmw);
Brands.push(mercedes);

let q7 = new Model(1, "Q7", 2021, 120000, "q7.jpg", 1);
let a6 = new Model(2, "A6", 2019, 80000, "a6.jpg", 1);
let rs7 = new Model(3, "RS7", 2021, 150000, "rs7.jpg", 1);

let x5 = new Model(4, "X5", 2015, 90000, "x5.jpg", 2);
let m5 = new Model(5, "M5", 2013, 70000, "m5.jpg", 2);
let m7 = new Model(6, "M7", 2018, 100000, "m7.jpg", 2);

let g5 = new Model(7, "G500", 2018, 70000, "g5.jpg", 3);
let c240 = new Model(8, "C240", 1998, 12000, "c240.jpg", 3);

let Models = [];
Models.push(q7);
Models.push(a6);
Models.push(rs7);
Models.push(x5);
Models.push(m5);
Models.push(m7);
Models.push(g5);
Models.push(c240);


let brandSelect = document.querySelector("[name='brand']");
let modelSelect = document.querySelector("[name='model']");

let year = document.querySelector("[name='year']");
let price = document.querySelector("[name='price']");


//<option value="1">One</option>
//<option selected>Select model</option>

let resetBrand = () => {
    let brandOptions = document.querySelectorAll("[name='brand'] option");
    for (let i = 0; i < brandOptions.length; i++) {
        brandOptions[i].remove();
    }

    let optionSelect = document.createElement("option");
    optionSelect.setAttribute("selected", "selected");
    optionSelect.innerText = "Select brand";
    brandSelect.appendChild(optionSelect);
}



let addBrands = () => {
    resetBrand();

    for (let i = 0; i < Brands.length; i++) {

        let option = document.createElement("option");
        option.setAttribute("value", Brands[i].id);
        option.innerText = Brands[i].brand;

        brandSelect.appendChild(option);
    }
}

addBrands();

let resetModel = () => {
    let modelOptions = document.querySelectorAll("[name='model'] option");
    for (let i = 0; i < modelOptions.length; i++) {
        modelOptions[i].remove();
    }

    let optionSelect = document.createElement("option");
    optionSelect.setAttribute("selected", "selected");
    optionSelect.innerText = "Select model";
    modelSelect.appendChild(optionSelect);
}

brandSelect.addEventListener("change", function (e) {
    resetModel();
    let brandId = Number(this.value);
    for (let i = 0; i < Models.length; i++) {
        if (Models[i].brandId == brandId) {
            let option = document.createElement("option");
            option.setAttribute("value", Models[i].id);
            option.innerText = Models[i].model;

            modelSelect.appendChild(option);
        }
    }
});

let submitAds = document.querySelector("#submit-ads");
let form = document.forms.AdForm;

form.elements[4].addEventListener("change", function (e) {
    e.preventDefault();
    let lable = document.querySelector(".image-lable");
    let img = document.createElement("img");
    img.classList.add("card-img-top");

    let files = [...form.elements[4].files];
    let imageFile = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
        img.src = reader.result;
    }

    lable.innerHTML = "";
    lable.append(img)
})

let addedAds = [];
submitAds.addEventListener("click", function (e) {
    e.preventDefault();

    //   <div class="col-lg-3">
    //     <div class="card" style="width: 18rem">
    //       <img src="img/a6.jpg" class="card-img-top" alt="..." />
    //       <div class="card-body">
    //         <h5 class="card-title">Audi Q7</h5>
    //         <p class="card-text">2017</p>
    //         <p class="card-text">$120000</p>
    //       </div>
    //     </div>
    //   </div>
    let year = document.querySelector("[name='year']").value;
    let price = document.querySelector("[name='price']").value;
    let brandId = document.querySelector("[name='brand']").value;
    let modelId = document.querySelector("[name='model']").value;

    if (year == "") {
        document.querySelector(".message-year").style.display = "inline";
    }
    if (price == "") {
        document.querySelector(".message-price").style.display = "inline";
    }

    if (brandId == "Select brand") {
        document.querySelector(".message-brand").style.display = "inline";
    }
    if (modelId == "Select model") {
        document.querySelector(".message-model").style.display = "inline";
    }

    if (year == "" || price == "" || modelId == "Select model" || brandId == "Select brand") {
        return;
    }


    let SelectedModel = Models.find(model => model.id == modelId);
    let modelName = SelectedModel.model;
    let Img = SelectedModel.img;
    let brandName = Brands.find(brand => brand.id == SelectedModel.brandId).brand;

    let divCol = document.createElement("div");
    divCol.classList.add("col-lg-3");

    let card = document.createElement("div");
    card.classList.add("card");
    card.style = "width: 18rem";


    let img = document.createElement("img");
    img.classList.add("card-img-top");

    let files = [...form.elements[4].files];
    let imageFile = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
        img.src = reader.result;
    }

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = `${brandName} ${modelName}`

    let p1 = document.createElement("p");
    p1.classList.add("card-text");
    p1.innerText = year;

    let p2 = document.createElement("p");
    p2.classList.add("card-text");
    p2.innerText = "$ " + price;

    cardBody.appendChild(h5);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);

    card.appendChild(img);
    card.appendChild(cardBody);

    divCol.appendChild(card);

    let adsRow = document.querySelector("#ads-row");
    adsRow.appendChild(divCol);

    document.querySelector("[name='price']").value = "";
    document.querySelector("[name='year']").value = "";
    resetModel();
    addBrands();
})

document.querySelector("[name='year']").addEventListener("focus", function (e) {
    e.preventDefault();

    if (document.querySelector("[name='model']").value == "Select model") {
        document.querySelector(".message-model").style.display = "inline";
    }
})

document.querySelector("[name='brand']").addEventListener("change", function (e) {
    e.preventDefault();

    let value = this.value;

    if (value != "Select brand") {
        document.querySelector(".message-brand").style.display = "none";
    }
})

document.querySelector("[name='model']").addEventListener("change", function (e) {
    e.preventDefault();

    let value = this.value;

    if (value != "Select model") {
        document.querySelector(".message-model").style.display = "none";
    }
})

document.querySelector("[name='year']").addEventListener("blur", function (e) {
    e.preventDefault();

    let value = this.value;

    if (value != "") {
        document.querySelector(".message-year").style.display = "none";
    }
})

document.querySelector("[name='price']").addEventListener("blur", function (e) {
    e.preventDefault();

    let value = this.value;

    if (value != "") {
        document.querySelector(".message-price").style.display = "none";
    }
})

document.querySelector("[name='year']").addEventListener("keyup", function (e) {
    e.preventDefault();

    let value = this.value;
    console.log(parseInt(value));
    if (isNaN(parseInt(value))) {
        this.value = "";
    }
})


// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// console.log("Salam, necesen?");
// document.getElementById("test").addEventListener("click", function (e) {
//     e.preventDefault();
//     console.clear();
// })

// Spread
// let arr1 = [5, 7, 15, 9];
// let arr2 = [15, 74, 2];
// let newArr = [...arr2, 15, 32]
// console.log(newArr);

/* Drag drop */
let AllowDrop = (e) => {
    e.preventDefault();
}

let DragElement = (e) => {
    let id = e.target.id;
    e.dataTransfer.setData("text", id);
}

let DropElement = (e) => {
    let id = e.dataTransfer.getData("text");
    e.target.append(document.getElementById(id));
}

let date = new Date();
date.setDate(22);

console.log(date.getDate());
console.log(date.getDay());
// console.log(date.getTime());
// console.log(date.getTimezoneOffset());
// console.log(date.getUTCDate());
// console.log(date.getUTCHours());
// console.log(Date.now());