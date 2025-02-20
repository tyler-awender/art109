// "use strict";

// let header = document.querySelector("header");
// let pageTitle = document.querySelector("#page-title")

// // with vars

// setTimeout(function() {pageTitle.style.color = "Pink"; /*console.log("timeout")*/}, 3000);

// // click event on header change background color
// header.onclick = function()
// {
//     console.log("Clicked Header Event");
//     document.querySelector("body").style.backgroundColor = "black";
// };

// without variables
// setTimeout(function() {document.querySelector("#page-title").style.color = "Pink"; /*console.log("timeout")*/}, 3000);

// // click event on header change background color
// document.querySelector("header").onclick = function()
// {
//     console.log("Clicked Header Event");
//     document.querySelector("body").style.backgroundColor = "black";
// }

const divs = document.querySelectorAll("div");

divs.forEach((element) => 
{
    element.addEventListener("click", function() {
        element.style.visibility = "hidden"
    })
});