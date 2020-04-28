// Button Click Attach
window.addEventListener('load',init);
function init(){
    
    registerEvents();
    load();
    // addQuestion();
    quescolor();
    document.getElementById("scorecard").style.display="none";
}

function showresult(){
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    // btn.onclick = function() {
      modal.style.display = "block";
    // }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }}

function load(){

    // if(sessionStorage){
    //     // console.log(JSON.parse(sessionStorage.currentuser));
    //     if(sessionStorage.currentuser){
    //         // console.log(localStorage.key());
    //        document.getElementById("studentname").innerHTML+=JSON.parse(sessionStorage.currentuser).name;
    //     }
    //     else{
    //         alert("Session Expired Login Again...");
    //         location.href="index.html";
    //     }

    // }
    // else{
    //     alert("Ur Browser is Outdated");
    //     location.href="index.html";
    // }
    
    
//     if(localStorage){
//         console.log(JSON.parse(localStorage.currentuser));
//         if(localStorage.currentuser){
//             // console.log(localStorage.key());
//            document.getElementById("studentname").innerHTML+=JSON.parse(localStorage.currentuser).name;
//         }
//         else{
//             alert("No Data Exist to Load");
//             location.href="index.html";
//         }

//     }
//     else{
//         alert("Ur Browser is Outdated");
//         location.href="index.html";
//     }
}


function myTimer() {
    var t=6;
        setInterval(()=>{
            if(t>0)
            document.getElementById("clock").innerHTML = t--;
            else if(t==0){
                alert("Test submitted successfully");
                t--;
            }
            
            else{
                submit();
            }
            
        },1000)
   
    // console.log("time called",t);
}

function updatescore(){
    var scoreobtain=0;
    var rightques=0;
    var maxscore=0;
    var wrongques=0;
    for(let i=0;i<=9;i++){
        maxscore+=parseInt(questionOperations.questions[i].score);
        var seloption=questionOperations.questions[i].sans;
        var questions= firebase.database().ref('/questions');
        var correct;
        questions.on('value',(snapshot)=>{
            obj = snapshot.val();
            correct=obj["10"+i].rans;
            });

        if(seloption!=0){
            if(seloption==correct){
                rightques++;
                scoreobtain+=parseInt(questionOperations.questions[i].score);
            }
            else
            wrongques++;
        }
    }
    console.log("max score",maxscore);
    console.log("right ques",rightques);
    console.log("wrong ques",wrongques);
    console.log("score obtain",scoreobtain);
    console.log("in graph",questionOperations.questions.length);
    var percentageobtain=(scoreobtain/maxscore)*100;

    document.querySelector('#maxscore').innerText = maxscore;
    document.querySelector('#rightques').innerText = rightques;
    document.querySelector('#wrongques').innerText = wrongques;
    document.querySelector('#scoreobtained').innerText = scoreobtain;
    document.querySelector('#percentageobtained').innerText = percentageobtain;



    ////////////////////////////////////////////////////////////////////////////////////////////
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Score"
        },
        axisY: {
            title: "Score"
        },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "Student",
            dataPoints: [      
                { y: scoreobtain, label: "You" },
                { y: (maxscore*0.33),  label: "Average" },
                ]
        }]
    });
    chart.render();
    
    
}


function submit(){

    if(document.getElementById("submitt").style.display!="none"){
        alert("Test Submitted");
    }

    questionOperations.issubmitted=true;
    var id=questionOperations.curques;
    var option=questionOperations.questions[id].sans;
    var questions= firebase.database().ref('/questions');
    var correct;
    questions.on('value',(snapshot)=>{
        obj = snapshot.val();
        // console.log(obj);
        correct=obj["10"+id].rans;
        // console.log(obj["10"+id].rans);
        });
    // console.log("right ans is",firebase.database().ref('/questions'));
    if(option==correct){
        console.log("correct ans");
        if(option=='a')
        document.getElementById("op"+1).classList.add("btn-success"); 
        else if(option=='b')
        document.getElementById("op"+2).classList.add("btn-success");
        else if(option=='c')
        document.getElementById("op"+3).classList.add("btn-success");
        else if(option=='d')
        document.getElementById("op"+4).classList.add("btn-success");
    }
    else{
        // console.log("Wrong ans");
       if(option!=0){
        if(option=='a')
        document.getElementById("op"+1).classList.add("btn-danger"); 
        else if(option=='b')
        document.getElementById("op"+2).classList.add("btn-danger");
        else if(option=='c')
        document.getElementById("op"+3).classList.add("btn-danger");
        else if(option=='d')
        document.getElementById("op"+4).classList.add("btn-danger");
       }

        if(correct=='a')
        document.getElementById("op"+1).classList.add("btn-success"); 
        else if(correct=='b')
        document.getElementById("op"+2).classList.add("btn-success");
        else if(correct=='c')
        document.getElementById("op"+3).classList.add("btn-success");
        else if(correct=='d')
        document.getElementById("op"+4).classList.add("btn-success");
    }
    
    document.getElementById("clr").style.display="none";
    document.getElementById("submitt").style.display="none";
    document.getElementById("timeshow").style.display="none";
    document.getElementById("numdisp").style.display="none";
    // document.getElementById("scorecard").style.display="block";
    showresult();
    
}

function save(option){
    console.log(option);
    var id=questionOperations.curques;
    questionOperations.questions[id].sans=option;
   // alert("Answer saved");
    document.getElementById(id).classList.add("btn-success");
    updateCount();
    updatescore();
}



function clearresponse(){
    console.log("clear called");
    var id=questionOperations.curques; 
    questionOperations.questions[id].sans=0;
    console.log(questionOperations.questions[id].sans);
    updateCount();
    updatescore();
    uncheck();
    document.getElementById(id).classList.add("btn-danger");
}

function toggle(){
   // console.log("toggle called");
    for(let i=0;i<=9;i++){
        if(i!=questionOperations.curques){
            if(document.getElementById(i).classList.contains("btn-success")==false)
            document.getElementById(i).classList.add("btn-danger");
        }
    }
}

function quescolor(){
    var id=questionOperations.curques;
   // console.log("#"+id);
    document.getElementById(id).classList.remove("btn-danger");
    document.getElementById(id).classList.add("btn-secondary");

    toggle();
}

function uncheck(){
for(let i=1;i<=4;i++){
    document.getElementById("o"+i).checked=false;
}
}


function next(){
    quescolor();
    var id=questionOperations.curques;
   // console.log(id);
    if(id<10)
    printques(++id);
    toggle();
}

function prev(){
    quescolor();
    var id=questionOperations.curques;
   // console.log(id);
    if(id>=1)
    printques(--id);
    toggle();
}

function registerEvents(){
// document.getElementById('add').addEventListener('click',addQuestion);
// document.querySelector("#cat1").addEventListener('onclick',addQuestion('questions'));


}
function disp(){
    // document.getElementById("bdy").style.backgroundImage="none";
    document.getElementById("categories").style.display="none";
    document.getElementById("page").style.display="block";
    // registerEvents();
}


function show(){
    document.getElementById('#opt').style.display="none";
}

function markcheck(id){
    console.log("check",document.getElementById(id));
    document.getElementById(id).checked=true;
}


function printques(id){
    // console.log(document.getElementById(id));
    questionOperations.curques=id;
    quescolor();
    console.log("current ques is ",questionOperations.curques);
    document.querySelector('#quesdisp').innerHTML= questionOperations.questions[id].name;
    
    for(let i=1;i<=4;i++){
        document.querySelector('#op'+i).innerHTML= questionOperations.questions[id].options[i-1];
        document.getElementById("op"+i).classList.remove("btn-danger","btn-success");
       
    }

        if(questionOperations.issubmitted==true)
        {
            submit();
        }

        if(questionOperations.questions[id].sans!=0){
            if(questionOperations.questions[id].sans=='a'){
               markcheck("o1");                   
            }
            else if(questionOperations.questions[id].sans=='b'){
                markcheck("o2");                   
            }
             else if(questionOperations.questions[id].sans=='c')
             {
                markcheck("o3");                   
             }
             else if(questionOperations.questions[id].sans=='d'){
                markcheck("o4");                   
            }
        }

        else{
                 uncheck();
                 
             }
}

        // if(document.getElementById(id).classList.contains("btn-success")==true){
        //     var nid=id+1;
        //     if(questionOperations.questions)
        //     console.log(document.getElementById('o'+nid));
        //     console.log("check",document.getElementById(id));
        //      document.getElementById("o"+id).checked=true;
            
        //  }
        //  else{
        //      uncheck();
        //  }



function addQuestion(part){
    // sessionStorage.clear();   
    // localStorage.clear();
    var questions= firebase.database().ref('/'+part);
    var obj;
    questions.on('value',(snapshot)=>{
        obj = snapshot.val();
        // console.log(obj);
        for(let key in obj){
            var questionObject = new Question();
            // console.log(obj[key]);
            questionObject.id=obj[key].id;
            questionObject.name=obj[key].name; 
            questionObject.score=obj[key].score;
            questionObject.options=obj[key].options;
            // console.log(obj[key].id);
            questionOperations.add(questionObject);            
        }
       updateCount();
        printques(0);   
        updatescore();
        // myTimer();
        document.getElementById("page").style.display="block";
    });
    
}


function updateCount(){
    var attempt=0;
    document.querySelector('#total').innerText = questionOperations.questions.length;
    for(let i=0;i<questionOperations.questions.length;i++){
        if((questionOperations.questions[i].sans)!=0)
        attempt++;
    }
    document.querySelector('#attempted').innerText = attempt;
    document.querySelector('#unattempted').innerText = questionOperations.questions.length-attempt;
}