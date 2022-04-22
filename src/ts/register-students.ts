let txtName: HTMLInputElement = document.querySelector('#txt-student-name')!;
let txtNIC:HTMLInputElement = document.querySelector('#txt-student-nic')!;
let txtEmail:HTMLInputElement = document.querySelector('#txt-student-email')!;
let formRegisterStudent: HTMLFormElement = document.querySelector('#frm-register-student')!;

formRegisterStudent.addEventListener('submit', (e:Event)=>{
    e.preventDefault();
    let inputs:HTMLInputElement[] =[txtName, txtNIC, txtEmail];
    let invalidInput = inputs.find((input)=>{
        return input.classList.contains('is-invalid') || (input.value.length === 0);
    })

    if(invalidInput){
        invalidInput.classList.add('is-invalid');
        invalidInput.select();
        invalidInput.focus();
        return;
    }else{
        /*Create object with data*/
        let student = {
            name:txtName.value.trim(),
            nic: txtNIC.value.trim(),
            email:txtEmail.value.trim()
        };

        let studentJSON = JSON.stringify(student);
        console.log(studentJSON);

        //1. XMLHttpRequest
        let http = new XMLHttpRequest();


        //2. Let's catch the response
        http.onreadystatechange = () => {
            //This is going to work, when the response is available
            if(http.readyState === XMLHttpRequest.DONE){
                if (http.status === 201){
                    console.log(http.responseText)
                }else{
                    console.error("Failed to save the student");
                }
            }
        };

        //3. Let's initiate the request
        http.open('POST','http://localhost:8080/lms/students', true);

        //4. Let's set some request headers
        http.setRequestHeader('Content-Type','application/json');


        //5. Let's send the request
        http.send(studentJSON);
    }


    // if(txtName.classList.contains('is-invalid')){
    //     txtName.select();
    //     txtName.focus();
    //     return;
    // }else if(txtEmail.classList.contains('is-invalid')){
    //     txtEmail.select();
    //     txtEmail.focus();
    //     return;;
    // }else{
    //     txtNIC.select();
    //     txtNIC.focus();
    //     return;
    // }
})


const validationListener = (evt:Event) =>{
    if(evt.target instanceof HTMLInputElement){
        let regExp: RegExp;
        if(evt.target === txtName){
            regExp = /^[A-Za-z]+$/;
        }else if(evt.target === txtNIC){
            regExp = /^\d{9}[Vv]$/;
        }else{
            regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }
        evt.target.classList.remove('is-invalid', 'is-valid');
        if(regExp.test(evt.target.value.trim())){
            evt.target.classList.add('is-valid');
        }else{
            evt.target.classList.add('is-invalid');
        }
    }
};
txtName.addEventListener('input', validationListener);
txtNIC.addEventListener('input', validationListener);
txtEmail.addEventListener('input', validationListener);