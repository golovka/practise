var randName = ["Foo", "John", "Ham"];
var randLastName = ["Bar", "Doe", "Burger"];
const phoneBook = [];
var selection = "";
class person{

    constructor(name, lastName, phone, birthYear){
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.birthYear = birthYear;
    }

    age() {
        const date = new Date();
        
        return date.getFullYear() - Number(this.birthYear);
    }
    getName(){
        return this.name + " " + this.lastName;
    }


}

function update(){
    let a = 0;
    selection = null;
    document.getElementById("phoneBook").innerHTML = "";
    for(i = 0; i < phoneBook.length; i++){
    document.getElementById("phoneBook").innerHTML += "<span onclick='select(" + i + ")')>" + "#" + (Number(i)+1) + " " + phoneBook[i].name + ", " + phoneBook[i].lastName + "<br>"  + "</span>";
    document.getElementById("phoneBook").innerHTML += "-----------------------<br>";
    a += Number(phoneBook[i].age());
    }
    
    document.getElementById("calcAvAge").innerHTML = Math.floor(a / i);

    document.getElementById("calcNOF").innerHTML = i;

    document.getElementById("exactPerson").innerHTML = "";

    document.getElementById("remover").innerHTML = '';
    
    console.log("selection: " + selection);

}

function saveP(){
    
    let name = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phone").value;
    let birthYear = document.getElementById("birthYear").value;
    
    if(name != "" && lastName != "" && phone != "" && birthYear != ""){
    phoneBook.unshift(new person(name, lastName, phone, birthYear));
    
    
    }
    update();
}

function cancel(){
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("birthYear").value = "";
}



function randomData(){
    let a = Math.floor(Math.random() * 3);
    let b = Math.floor(Math.random() * 3);
    let c = Math.floor(Math.random() * 9999999999);
    let d = 1900 + Math.floor(Math.random() * 122);
    phoneBook.unshift(new person(randName[a], randLastName[b], c, d));
    
    update();
}

function select(a){
    selection = a;
    console.log("a: " + a);
    console.log("selection: " + selection);
    console.log(phoneBook[a].getName())
    document.getElementById("exactPerson").innerHTML = "Contact #: " + (Number(a)+1) + "<br>";
    document.getElementById("exactPerson").innerHTML += phoneBook[a].getName() + "<br>";
    document.getElementById("exactPerson").innerHTML += "Phone: " + phoneBook[a].phone + "<br>";
    document.getElementById("exactPerson").innerHTML += "Birth year: " + phoneBook[a].birthYear + "<br>";
    document.getElementById("exactPerson").innerHTML += "Age: " + phoneBook[a].age() + "<br>";
    document.getElementById("remover").innerHTML = '<input type="button" onclick="remove()" id="cancel" name="cancel" value="Remove"><br>  <input type="button" onclick="edit()" id="randomData" name="edit" value="Edit"><br>';
}

function remove(){
    document.getElementById("remover").innerHTML = "<p>Are you sure?<br></p>";
    document.getElementById("remover").innerHTML += "<input type='button' onclick='remove1()' id='cancel' name='cancel' value='Yes'> ";
    document.getElementById("remover").innerHTML += "<input type='button' onclick='remove2()' id='cancel' name='cancel' value='No'> ";
}

function remove1(){

    phoneBook.splice(Number(selection), 1);
    selection = "";
    update();
    document.getElementById("exactPerson").innerHTML = "Contact removed";
    remove2();
}

function remove2(){
    document.getElementById("remover").innerHTML = "<input type='button' onclick='remove()' id='cancel' name='cancel' value='Remove'><br> <input type='button' onclick='edit()' id='randomData' name='edit' value='Edit'><br>";
}

function edit(){
    document.getElementById("remover").innerHTML = "<p>Press 'Save' when finish editing <br></p>";
    document.getElementById("remover").innerHTML += '<input type="button" onclick="submitEdit()" id="submitEdit" name="submitEdit" value="Save">';
    document.getElementById("exactPerson").innerHTML = '<table> <tr> <td> <label for="firstNameEdit">Name:</label></td>       <td> <input type="text" id="firstNameEdit" name="firstName" value='+phoneBook[selection].name+'></td>    </tr>    <tr>        <td><label for="lastNameEdit">Surname:</label></td>        <td> <input type="text" id="lastNameEdit" name="lastName" value='+phoneBook[selection].lastName+'></td>    </tr>    <tr>        <td><label for="phoneEdit">Phone:</label></td>        <td> <input type="text" id="phoneEdit" name="phone" value='+phoneBook[selection].phone+'></td>    </tr>    <tr>        <td> <label for="birthYearEdit">Birth Year:</label></td>        <td> <input type="text" id="birthYearEdit" name="birthYear" value='+phoneBook[selection].birthYear+'></td>    </tr></table>';

}

function submitEdit(){
    
    
        let name = document.getElementById("firstNameEdit").value;
        let lastName = document.getElementById("lastNameEdit").value;
        let phone = document.getElementById("phoneEdit").value;
        let birthYear = document.getElementById("birthYearEdit").value;
        
        if(name != "" && lastName != "" && phone != "" && birthYear != ""){
        phoneBook[selection].name = name;
        phoneBook[selection].lastName = lastName;
        phoneBook[selection].phone = phone;
        phoneBook[selection].birthYear = birthYear;
        
        update();
        }
    
}