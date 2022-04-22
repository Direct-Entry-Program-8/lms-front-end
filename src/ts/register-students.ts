let txtName: HTMLInputElement = <HTMLInputElement> document.querySelector('#txt-student-name')!;
let txtNIC: HTMLInputElement = <HTMLInputElement> document.querySelector("#txt-student-nic")!;
let txtEmail: HTMLInputElement  = <HTMLInputElement> document.querySelector("#txt-student-email")!;
let frmRegistration: HTMLFormElement = <HTMLFormElement> document.querySelector("#frm-register-student")!;

frmRegistration.addEventListener('submit', (e)=>{
    e.preventDefault();

    let inputs: HTMLInputElement[] = [txtName, txtNIC, txtEmail];
    let invalidInputElm = inputs.find((input)=>
        input.classList.contains('is-invalid') || input.value.length === 0);
    if (invalidInputElm){
        invalidInputElm.classList.add('is-invalid');
        invalidInputElm.focus();
        invalidInputElm.select();
        return;
    }else{
        let student = {
            name: txtName.value.trim(),
            nic: txtNIC.value.trim(),
            email: txtEmail.value.trim()
        };
        let studentJSON = JSON.stringify(student);

        // 1. XMLHttpRequest
        let http = new XMLHttpRequest();

        // 2. Let's catch the response
        http.onreadystatechange = () => {
            if (http.readyState === XMLHttpRequest.DONE){
                if (http.status === 201){
                    console.log(http.responseText);
                }else{
                    console.error("Failed to save the student");
                }
            }
        };

        // 3. Let's initiate the request
        http.open('POST', 'http://localhost:8080/lms/students', true);

        // 4. Let's set some request headers
        http.setRequestHeader('Content-Type', 'application/json');

        // 5. Let's send the request
        http.send(studentJSON);

    }
});

const validationListener = (evt: Event) => {
    if (evt.target instanceof HTMLInputElement){
        let inputElm = evt.target;
        let regExp: RegExp;

        switch (inputElm){
            case txtNIC:
                regExp = /^\d{9}[Vv]$/;
                break;
            case txtName:
                regExp = /^[A-Za-z ]+$/;
                break;
            default:
                regExp =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }

        inputElm.classList.remove('is-invalid', 'is-valid');
        if (regExp.test(inputElm.value.trim())){
            inputElm.classList.add('is-valid');
        }else{
            inputElm.classList.add('is-invalid');
        }
    }
}

txtName.addEventListener('input', validationListener);
txtNIC.addEventListener('input', validationListener);
txtEmail.addEventListener('input', validationListener);
