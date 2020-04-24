function doreset(){
    document.getElementById("name").value="";
    document.getElementById("userid").value=""; 
    document.getElementById("pwd").value="";
    document.getElementById("rpwd").value="";
}

function domove(){
    location.href="index.html";
}

function SubmitRegister(){
    var userobject=new user();
    console.log(document.getElementById("pwd").value);
    if(document.getElementById("pwd").value==document.getElementById("rpwd").value){
        for(let key in userobject){
           userobject[key]=document.getElementById(key).value;
        }
        // console.log("userobj",userobject);
        var promise = firebase.database().ref('/users/'+userobject.userid).set(userobject);
    promise.then(data=>{
        alert("User registered successfully");
    }).catch(err=>{
        alert("Error During Registration");
        console.log("Error in FB ",err);
    })

    }

    else {
        alert("Password doesn't match...Enter again");
        document.getElementById("pwd").value="";
        document.getElementById("rpwd").value="";
    }


   
}