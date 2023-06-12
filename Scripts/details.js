"use strict";

// const productDetailsRow = document.getElementById("productDetailsRow");
const productdetailsbodytable = document.getElementById("productdetailsbodytable");


window.onload = function () {
    console.log("window load");

    urlParamsFunction();

}

function urlParamsFunction() {

    let urlParams = new URLSearchParams(location.search);
    console.log(urlParams);

    let id = -1;
    if (urlParams.has("productid") === true) {
        document.getElementById("error").innerHTML = "";
        id = urlParams.get("productid")
        console.log(id);

        let productIdUrl = "http://localhost:8081/api/products/" + id;
        fetch(productIdUrl)
            .then((response) => response.json())
            .then(product => {
                console.log(product);
                showDetailforProduct(product);

            })
            .catch(error => {
                console.error("Error:", error);
                redirectToHome();
            });
    } else {
        redirectToHome();
    }
}

function redirectToHome() {
    window.location.href = "index.html";

}

function showDetailforProduct(product) {
    // fill in html elements to describe the product that was passed in.
    // This is where the detailed product information will display into the table card

    let divCard = document.createElement("div");
    divCard.className = "card col col-md-6 mx-auto mt-3";
  

    let divCardBody = document.createElement("div");
    divCardBody.className = "card-body col col-md-6 mx-auto mt-3";
    divCard.appendChild(divCardBody);

    let h5Name = document.createElement("h5");
    h5Name.className = "card-title";
    h5Name.innerHTML = product.productName;
    divCardBody.appendChild(h5Name);


    let productDetails = document.createElement("p");
    divCardBody.appendChild(productDetails);

    let productId = document.createElement("p");
    productId.className = "productId";
    productId.innerHTML = "Product Id: " + product.productId;
    productDetails.appendChild(productId);

    let productName = document.createElement("p");
    productName.className = "Name";
    productName.innerHTML = "Name: " + product.productName;
    productId.appendChild(productName);

    let unitPrice = document.createElement("p");
    unitPrice.className = "unitPrice";
    unitPrice.innerHTML = "Price: " + product.unitPrice;
    productName.appendChild(unitPrice);

    let discontinued = document.createElement("p");
    discontinued.className = "discontinued";
    discontinued.innerHTML = "Discontinued: " + product.discontinued;
    unitPrice.appendChild(discontinued);

    let unitsInStock = document.createElement("p");
    unitsInStock.className = "unitsInStock";
    unitsInStock.innerHTML = "In Stock: " + product.unitsInStock;
    discontinued.appendChild(unitsInStock);

    let supplier = document.createElement("p");
    supplier.className = "supplier";
    supplier.innerHTML = "Supplier: " + product.supplier;
    unitsInStock.appendChild(supplier);

    // Create the "Add to Cart" button
    let addToCartBtn = document.createElement("a");
    addToCartBtn.href = "#";
    addToCartBtn.className = "btn btn-primary";
    addToCartBtn.innerHTML = "Add To Cart";
    divCardBody.appendChild(addToCartBtn);

    // Append the card to the productdetailsbodytable element or any other container you desire
    let productdetailsbodytable = document.getElementById("productdetailsbodytable");
    productdetailsbodytable.appendChild(divCard);

}

// discontinued
// :
// "false"
// productId
// :
// "2"
// productName
// :
// "Chang"
// supplier
// :
// "Exotic Liquids"
// unitPrice
// :
// "19.0000"
// unitsInStock
// :
// "17"