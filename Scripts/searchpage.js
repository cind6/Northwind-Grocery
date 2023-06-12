"use strict";
const searchSelectRow= document.getElementById("searchSelectRow");
const categorySelectRow= document.getElementById("categorySelectRow");

const searchSelect = document.getElementById("searchSelect");
const categorySelect = document.getElementById("categorySelect");

const productListingTableRow = document.getElementById("productListingTableRow");
const productListingTableBody = document.getElementById("productListingTableBody");


//EVENT HANDLER:  Do this when page loads
window.onload = function(){

    HideCategorySelectRow();
    HideProductListingTable();

    //go and populate the categories dropdown...
    populateCategories();
    

    searchSelect.onchange = onSearchSelectChange;
    categorySelect.onchange = onCategorySelectChange;


}




//EVENT HANDLER:  Do this when Search type changes
function onSearchSelectChange(){
    // if all, then getAllProductsFromApi
    if (searchSelect.value === "Category") {
        ShowCategorySelectRow();

        // no need to show anything yet, because we are waiting for 
        // the user to select a category now...
        HideProductListingTable();

    } else if (searchSelect.value === "viewAll") {
        HideCategorySelectRow();

        // show all products.
        ShowProductListingTable();
        ShowAllProducts();
    }
    else{
        HideCategorySelectRow();
        HideProductListingTable()
    }


    // if search, then display categories dropdown, and populate categories.
}

//EVENT HANDLER:  Do this when Category value changes.  (This can only happen when catagory row is shown / search type is by catagory)
function onCategorySelectChange(){
    //when a new category is selected, use getProductsInCategory to get only the products in that cat, 
    // and then use PopulateProducts to display them..

    //Category Selected from dropdown

    const categoryId = categorySelect.value;

     if (categoryId === "") {
        HideProductListingTable(); // Hide the table
    } else {
    ShowProductsInCategory(categoryId);
    ShowProductListingTable();
}}

function ShowCategorySelectRow(){
    categorySelectRow.style.display = "block";
}

function HideCategorySelectRow(){
    categorySelectRow.style.display = "none";
}

function ShowProductListingTable(){
    productListingTableRow.style.display = "block";
}
function HideProductListingTable(){
    productListingTableRow.style.display = "none";
}


// HELPER FUNCTION, populate the Categories Dropdown with all possible categories from the API
function populateCategories(){

    
     fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(categories => {
        for (let category of categories) {

            let catOption = document.createElement("option");
            catOption.text = category.name;
            catOption.value = category.categoryId;

            categorySelect.appendChild(catOption);
            console.log(catOption)
        }
    });

}

// HELPER FUNCTION, takes the CategoryId, and returns 
function ShowProductsInCategory(categoryId){


    
    fetch(`http://localhost:8081/api/categories/${categoryId}`)
    .then(response => response.json())
    .then(data => {
        populateProducts(data);
    });
    

}

function ShowAllProducts() {

    let theUrl = "http://localhost:8081/api/products";
    fetch(theUrl)
        .then(response => response.json())
        .then(products => {
            //The code in this block is an event handler that will execute when a response comes in from the above remote api call.
            populateProducts(products);
            console.log(products);
        })
}


//Display the products sent to it in the parameter.  It can be used both by ShowProductsInCategory, and ShowAllProducts.
function populateProducts(productsArray){

    productListingTableBody.innerHTML = "";
    

    for (let product of productsArray) {
        let newRow = productListingTableBody.insertRow(-1);
        let idCell = newRow.insertCell(0);
        idCell.innerHTML = product.productId;

        let cell1 = newRow.insertCell(1);
        cell1.innerHTML = product.productName;
        // // let anchor = document.createElement("a");
        // // anchor.href = `details.html?productid=${product.productId}`;
        //  anchor.text = product.productName;
        //  cell1.appendChild(anchor);

        let cell2 = newRow.insertCell(2);
        cell2.innerHTML = product.unitPrice;

        let cell3 = newRow.insertCell(3);
        let anchor = document.createElement("a");
        anchor.href = `details.html?productid=${product.productId}`;
         anchor.text = "More Info";
         cell3.appendChild(anchor);

        

/*-----------------------------------------------------*/

        // let cell3 = newRow.insertCell(3);
        // cell3.innerHTML = product.unitsInStock

        // let cell4 = newRow.insertCell(4);
        // cell4.innerHTML = product.categoryId

        // let cell5 = newRow.insertCell(5);
        // cell5.innerHTML = product.supplier

        // let cell6 = newRow.insertCell(6);
        // cell6.innerHTML = product.discontinued
       


    }
    console.log('All courses are in the table');

}



