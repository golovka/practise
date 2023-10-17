/* 
    Created on : May, 2019 
    Author     : Liisa Auer, Oulu University of Applied Sciences
    Licence    : CC-BY-4.0
*/

/*
 * Student name :
 * Started date :
 * Ended   date :
 * 
 */

function j01() {
    let a = Number(document.getElementById("year1").value);
    let b = Number(document.getElementById("year2").value);

    document.getElementById("age1").innerHTML = "First age is " + a;
    document.getElementById("age2").innerHTML = "Second age is " + b;

    document.getElementById("difference").innerHTML = "Age difference is " + (a - b);

}

function j02() {
    let a = Number(document.getElementById("height").value);
    let b = Number(document.getElementById("width").value);

    document.getElementById("area").innerHTML = "Area is " + (a * b);
}

function j03() {
    let a = Number(document.getElementById("number1").value);
    let b = Number(document.getElementById("number2").value);

    document.getElementById("sum").innerHTML = "" + a + " + " + b + " = " + (a+b);
}

function j04() {
    const START = "Hello ";
    const MIDDLE = ", you are ";
    const END = " years of age.";
    let date = new Date();
    

    let a = document.getElementById("name").value;
    let b = Number(document.getElementById("year3").value);

    document.getElementById("message").innerHTML = START + a + MIDDLE + (date.getFullYear() - b) + END;
}

function j05() {
    let a = Number(document.getElementById("number3").value);
    let b = Number(document.getElementById("number4").value);
    let c = document.getElementById("sums").innerHTML;
    document.getElementById("sums").innerHTML = c +"<br>" + a + " + " + b + " = " + (a+b);
}

