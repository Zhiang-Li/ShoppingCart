# Shopping Center Web

## Author

Zhiang Li
li.zhian@northeastern.edu

## Description

This is a basic shopping center web for NEU-CS5010 Assignment3 to practice functional programming. The shopping web allows users to add new products, remove products, add products to cart, and remove products to cart. The web is connected to firebase database.

## How to Run the Program

* `Clone the entire git repo.`
* `npm install`
* `npm run dev`
*  access link http://localhost:5173/ to start the web app in the browser.
*  double check if your port is 5173 or something else, incorrect port may lead to errors
*  or `npm run build` and `firebase deploy`
*  follow the provided link to test the app

## Run the Program through link below

https://shoppingcart-c4b35.web.app/

## Video Demo

For detailed information on how to use the app, please visit: https://youtu.be/fdj1BrGZej4

## Methods used To Build the Project

There are three main components on the website: 

1. Create Product Form 
2. Product List
3. Shopping Cart List

In Create Product Form, there is an add product method which takes the input in the form field and insert the new product to the "Products" collection in my firebase. Name and price should be entered by users. Id of the new product will be the next largest id in current product. A blank image is used for convenience.

In Product List, there are two buttons "remove" and "add to cart" underneath each Product component. Button "remove" will remove the corresponding product document from the "Products" collection in my firebase. Button "add to cart" will add the corresponding product document to "ProductsToBuy" collection in my firebase with a new field "quantity" initialized to 1. Multiple clicking "add to cart" will increase quantity by 1 each time. Up to three products can be shown in one page. Any more products will be shown to the next page. Users can direct to different page by clicking "next" and "previous" button for navigation through pages.

In Shopping Cart List, there is a delete "-" button to remove products from cart by 1 each time. Once quantity reaches 0, the product name card is deleted from the cart. A "clear cart" button can be hit to remove all products currently in the cart. 

Nothing fancy implemented or external sources referred in this project. The project is mainly for practice on functional programming.
