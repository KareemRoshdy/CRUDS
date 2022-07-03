// Dark mood
let sw = document.querySelector(".sw");
let bol = document.querySelector(".bol");
sw.onclick = () => {
    bol.classList.toggle("active");
    document.body.classList.toggle("active");
}
// ============================= //
// Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let drwe;
let mood = 'create';
let tmp; // متغير وهمي هستخدمه علشان اعرف اوصل للمنتج اللي عاوز اعدل البيانات بتاعته

// Function Get Total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = "";
        total.style.background = 'red';
    }
}

// Test Data In LocalStorage
let dataProduct = [];
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}
// Function Create Product
submit.addEventListener('click', function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

// Add Product In Array  
if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {  // Clean Data
    if (mood === 'create') {
        // Count Products & Added Product
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataProduct.push(newPro);
            }
        } else {
            dataProduct.push(newPro);
        }
        // Update Mood
    } else {
        dataProduct[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
    // Clear Inputs
    clearData();
}
// Save Product In LocalStorage
localStorage.product = JSON.stringify(dataProduct);

// Show Data In Table
showProduct();
});

// Clear Inputs
function clearData() {
    let inputs = document.querySelectorAll('.inputs input');
    inputs.forEach((e) => {
        e.value = "";
    });
    total.innerHTML = "";
    total.style.background = "red";
}

// Read (Show Data)
function showProduct() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i});">update</button></td>
            <td><button id="delete" onclick="deletePrudct(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    // Delete All Btn
    let delAll = document.getElementById("deleteAll");
    if (dataProduct.length > 0) {
        delAll.innerHTML = `
            <button onclick="deleteAll();">Delete All (${dataProduct.length})</button>
        `
    } else {
        delAll.innerHTML = '';
    }
};
showProduct();

// Delete
function deletePrudct(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showProduct();
}

// Delete All
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showProduct();
}

// Update
function updateProduct(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = 'none';
    getTotal();
    submit.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}

// Search
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let searchInput = document.getElementById('search');

let searchMood = 'title';
function getSearchMood(id) {
    if (this.id === 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    searchInput.placeholder = `Search By ${searchMood}`;
    searchInput.focus();
    searchInput.value = '';
    showProduct();
}

function serachData(value) {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        // search by title
        if (searchMood === 'title') {
            if (dataProduct[i].title.includes(this.value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i});">update</button></td>
                    <td><button id="delete" onclick="deletePrudct(${i})">delete</button></td>
                </tr>
                `;
            }
            // search by category
        } else {
            if (dataProduct[i].category.includes(this.value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i});">update</button></td>
                    <td><button id="delete" onclick="deletePrudct(${i})">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
searchTitle.addEventListener('click', getSearchMood)
searchCategory.addEventListener('click', getSearchMood)
searchInput.addEventListener('input', serachData);




