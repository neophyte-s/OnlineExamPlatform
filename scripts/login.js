function doLogin(){
    var userid=document.getElementById("userid").value;  // Value come from the Text Box
    var pwd=document.getElementById("password").value;
    var message = "";
    var users=[];
    var rpwd;
    var username;

    if(userid=="admin"&&pwd=="12345678"){
        location.href="crud.html";
    }
    else{
    var user= firebase.database().ref("/users/"+userid);
    var userObj;
    // console.log(user);
    user.on('value',(snapshot)=>{
        userObj = snapshot.val();
        console.log(userObj);
        rpwd=userObj.pwd;
        username=userObj.name;
        console.log(username);
        // document.getElementById("studentname").innerText+=userObj.name;
    })
    // questions.on('value',(snapshot)=>{
    //     var allUsersObj = snapshot.val();
    //     for(let key in allUsersObj){
    //         let userObj = allUserObj[key];
    //         users.push(userObj);
    //     }});

    // console.log(users);

    setTimeout(() => {
        
    if(rpwd == pwd){

        if(sessionStorage){
            sessionStorage.currentuser=JSON.stringify(userObj);
            // alert("Record Saved");
         }
         else{
             alert("Ur Browser is Outdated");
         }

        // localStorage.currentuser=userObj;
        // console.log("user is ",userObj);
        // console.log("localstorage.user=",localStorage.currentuser);
        location.href="StudentDashboard.html";       
        // redirect to dashboard page
    }

    else{
        message = "Invalid Userid or Password";
        document.getElementById('error').innerText=message;
        // print message on Screen
    }



        
    },6000);


    // if(userid == pwd){
    //     location.href="dashboard.html";
    //     // redirect to dashboard page
    // }
    // else{
    //     message = "Invalid Userid or Password";
    //     document.getElementById('error').innerText=message;
    //     // print message on Screen
    // }
    }
}

function doreset(){
    document.getElementById("userid").value=""; 
    document.getElementById("password").value="";

}

function doreg(){
    location.href="userregister.html";
}