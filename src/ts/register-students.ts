let txtName: HTMLInputElement = document.querySelector('#txt-student-name')!;
let txtNIC: HTMLInputElement = document.querySelector("#txt-student-nic")!;
let txtEmail: HTMLInputElement  = document.querySelector("#txt-student-email")!;

const validationListener = (evt: Event) => {
    if (evt.target instanceof HTMLInputElement){
        let inputElm = evt.target;
        let regExp: RegExp;

        if (inputElm === txtNIC){
            regExp = /^\d{9}[Vv]$/;
        }else if (inputElm === txtName){
            regExp = /^[A-Za-z ]+$/;
        }else{
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
