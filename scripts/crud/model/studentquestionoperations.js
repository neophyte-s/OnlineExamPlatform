const questionOperations = {
    issubmitted:false,
    curques:0,
    questions:[],
    add(questionObject){
        this.questions.push(questionObject);
        console.log("Added ",this.questions);
    }
    
}