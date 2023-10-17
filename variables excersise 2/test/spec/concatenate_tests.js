/* 
    Created on : May, 2019 
    Author     : Liisa Auer, Oulu University of Applied Sciences
    Licence    : CC-BY-4.0
*/

describe("Joining data", function () {
    it("Student", function () {
        var temp = prompt("Your name: ");
        $("#nimix").html(temp);
        expect(temp).not.toEqual("");
    });

    // J1: Age difference
    it("J1: Age difference", function () {
        // aseta parametrit
        $("#year1").val(1990);
        $("#year2").val(2004);
        // kutsutaan tarkistettavaa funktiota
        j01();
        // haetaan etusivulta html-elementin arvo
        var temp1 = $("#age1").html();
        var temp2 = $("#age2").html();
        var temp3 = $("#difference").html();
        
        var age1 = (new Date().getFullYear()) - 1990;
        var age2 = (new Date().getFullYear()) - 2004;
        var diff = age1 - age2;
        
        // tarkistetaan onko se oikein
        expect(temp1).toEqual("Person 1 age is " + age1);
        expect(temp2).toEqual("Person 2 age is " + age2);
        expect(temp3).toEqual("Person 1 is " + diff + " years older than person 2");
    });
    
    // J2: Area
    it("J2: Area", function () {
        // aseta parametrit
        $("#height").val(34);
        $("#width").val(50);
        // kutsutaan tarkistettavaa funktiota
        j02();
        // haetaan etusivulta html-elementin arvo
        var temp = $("#area").html();
        
        // tarkistetaan onko se oikein
        expect(temp).toEqual("The area is 1700 m2.");
    });
    
    // J3: One sum
    it("J3: One sum", function () {
        // aseta parametrit
        $("#number1").val(4);
        $("#number2").val(5);
        // kutsutaan tarkistettavaa funktiota
        j03();
        // haetaan etusivulta html-elementin arvo
        var temp = $("#sum").html();
        
        // tarkistetaan onko se oikein
        expect(temp).toEqual("4 + 5 = 9");
    });  
    
    // J4: Constant
    it("J4: Constant", function () {
        // aseta parametrit
        $("#year3").val(1990);
        $("#name").val("Liisa");
        
        // kutsutaan tarkistettavaa funktiota
        j04();
        var age = (new Date().getFullYear()) - 1990;
        
        // haetaan etusivulta html-elementin arvo
        var temp = $("#message").html();
        
        // tarkistetaan onko se oikein
        expect(temp).toEqual("Hello Liisa, you are " + age +  " years of age.");        
    }); 
    
    // J5: Many sum
    it("J5: Many sums", function () {
        // aseta parametrit
        $("#number3").val(4);
        $("#number4").val(5);
        // kutsutaan tarkistettavaa funktiota
        j05();
        
        $("#number3").val(5);
        $("#number4").val(6);
        // kutsutaan tarkistettavaa funktiota
        j05();        
                
        $("#number3").val(6);
        $("#number4").val(7);
        // kutsutaan tarkistettavaa funktiota
        j05();
        
        // haetaan etusivulta html-elementin arvo
        var temp = $("#sums").html();
        
        // tarkistetaan onko se oikein
        expect(temp).toEqual("4 + 5 = 9<br>5 + 6 = 11<br>6 + 7 = 13<br>");
    });    
});

