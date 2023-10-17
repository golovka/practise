/*
 * Student name :Andrei
 * Started date :20 03 2023
 * Ended   date :
 * 
 */

function window_calclulation(){
    let a = Number(document.getElementById("window_height").value);
    let b = Number(document.getElementById("window_width").value);
    let c = Number(document.getElementById("window_amount").value);
    if (a < 0 || b < 0 || c < 0){
        document.getElementById("calculate").innerHTML = "";
        document.getElementById("error").innerHTML = "Why would you use negatives? LOL";
    } else {
        let wood = (2*a + 2*(a+12) + 2*b + 2*(b+12))/100;
        let glass = ((a+1) * (b+1)) / 10000;
        document.getElementById("wood").innerHTML = wood;
        document.getElementById("glass").innerHTML = glass;
        document.getElementById("woods").innerHTML = wood*c;
        document.getElementById("glasses").innerHTML = glass*c;
    }
}
