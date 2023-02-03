const form = document.querySelector('form');
const sumbitBtn = document.querySelector('.submit');
const submitBtn = document.querySelector('.submit');
const nameInput = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const inputs = document.querySelectorAll('input');
const formEls = document.querySelectorAll('.form-element');
const errorSpans = document.querySelectorAll('span');
const succeededMsg = document.querySelector('.succeeded');
console.log(Array.from(formEls)[5].children[1].value)

sumbitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    Array.from(formEls).forEach(item => {
        let children = item.children;
        let inputChild = children[1]
        let spanChild = children[2];
        if(inputChild.nodeName !== "SELECT") {
            if(!inputChild.validity.valid) {
                if (inputChild.validity.valueMissing) {
                    errorMsgs.requiredErr(inputChild, spanChild);
                }
                if (inputChild.attributes.name.value === "password") {
                    if(inputChild.validity.patternMismatch) {
                        console.log(inputChild.value)
                        console.log(inputChild.validity.patternMismatch)
                        errorMsgs.checkValidPassword(inputChild, spanChild)
                    }
                }
                else if (inputChild.attributes.name.value === "password-confirm") {
                    let passwrd = formEls[4].children[1].value
                    console.log(passwrd)
                    if((inputChild.value !== passwrd)) {
                        console.log(inputChild.value + " + " + passwrd)
                        errorMsgs.confirmPassword(inputChild, spanChild);
                    }
                }
                else if (inputChild.validity.tooShort) {
                    errorMsgs.checkNameLength(inputChild, spanChild)
                }
                else if(inputChild.validity.typeMismatch) {
                    errorMsgs.checkEmail(inputChild, spanChild) 
                } 
                else if(inputChild.validity.patternMismatch) {
                    if (inputChild.attributes.name.value === "zip") {
                        errorMsgs.checkZipCode(inputChild, spanChild);
                    }
                }
                // else {
                // }
            } else {
                spanChild.textContent = ""
                removeErrorMsg(inputChild, spanChild)
            }
        }
    })
    if(Array.from(formEls).every(item => item.children[1].validity.valid)) {
        form.reset()
        succeededMsg.style.display = "block";
    }
})

let hasBeenBlurred = false;

Array.from(formEls).forEach(item => {
    let children = item.children;
    let input = children[1];
    let error = children[2];
    input.addEventListener('input', (e) => {
        if(hasBeenBlurred) {
            if (input.attributes.name.value === "password") {
                if(input.validity.patternMismatch) {
                    console.log(input.value)
                    console.log(input.validity.patternMismatch)
                    errorMsgs.checkValidPassword(input, error)
                } else {
                    error.textContent = ""
                    removeErrorMsg(input, error)
                }
            }
            else if (input.validity.valueMissing) {
                errorMsgs.requiredErr(input, error);
            } 
            else if (input.validity.tooShort) {
                errorMsgs.checkNameLength(input, error)
            }
            else if(input.validity.typeMismatch) {
                errorMsgs.checkEmail(input, error) 
            } 
            else if(input.validity.patternMismatch) {
                if (input.attributes.name.value === "zip") {
                    errorMsgs.checkZipCode(input, error);
                }
            }
            else {
                error.textContent = ""
                removeErrorMsg(input, error)
            }
        }

        // console.log(input.validity)
    })

    input.addEventListener('blur', (e) => {
        hasBeenBlurred = true;
        if (input.validity.valueMissing) {
            errorMsgs.requiredErr(input, error);
        }
        else if (input.attributes.name.value === "password") {
            if(input.validity.patternMismatch) {
                console.log(input.value)
                console.log(input.validity.patternMismatch)
                errorMsgs.checkValidPassword(input, error)
            } else {
                error.textContent = ""
                removeErrorMsg(input, error)
            }
        }
        else if (input.attributes.name.value === "password-confirm") {
            let passwrd = formEls[4].children[1].value
            console.log(passwrd)
            if(!passwrd || (input.value !== passwrd)) {
                console.log(input.value + " + " + passwrd)
                errorMsgs.confirmPassword(input, error);
            } else {
                error.textContent = "";
                removeErrorMsg(input, error);
            }
        }
        else if (input.validity.tooShort) {
            errorMsgs.checkNameLength(input, error)
        } 
        else if(input.validity.typeMismatch) {
            errorMsgs.checkEmail(input, error)
        } 
        else if(input.validity.patternMismatch) {
            if (input.attributes.name.value === "zip") {
                errorMsgs.checkZipCode(input, error);
            }
        }
        else {
            hasBeenBlurred = false;
            error.textContent = ""
            removeErrorMsg(input, error)
        }
    })
})



const errorMsgs = (() => {
    const requiredErr = (el, elError) => {
        elError.textContent = "You need to enter a value";
        showErrorMsg(el, elError);
    }
    
    const checkNameLength = (el, elError) => {
        let length = el.value.length
        if(length < 3) {
            elError.textContent = `You need to enter at least 3 characters; you have entered only ${length} character/s`;
        } 
        else if(length > 20) {
            elError.textContent = `You have entered to ${length} characters, you may only enter 20`;
        }
        showErrorMsg(el, elError);
    }

    const checkEmail = (el, elError) => {
        console.log(el.validity.typeMismatch);
        elError.textContent = "Not a valid email";
        showErrorMsg(el, elError);
    }

    const checkZipCode = (el, elError) => {
        elError.textContent = "A zip code can contain only numbers";
        showErrorMsg(el, elError);
    }

    const checkValidPassword = (el, elError) => {
        elError.textContent = "Password must contain a minimum of eight characters, at least one lowecase letter, higher case letter and one number";
        showErrorMsg(el, elError);
    }

    const confirmPassword = (el, elError) => {
        elError.textContent = "Must match password";
        showErrorMsg(el, elError);
    } 
    
    return {
        requiredErr: requiredErr,
        checkNameLength: checkNameLength,
        checkEmail: checkEmail,
        checkZipCode: checkZipCode,
        checkValidPassword: checkValidPassword,
        confirmPassword: confirmPassword
    }
})();

const showErrorMsg = (input, error) => {
    if(!error.classList.contains('show')) {
        error.classList.add('show')
    }
    if(!input.classList.contains('input-error')) {
        input.classList.add('input-error')
    }
}

const removeErrorMsg = (input, error) => {
    if(error.classList.contains('show')) {
        error.classList.remove('show')
    }
    if(input.classList.contains('input-error')) {
        input.classList.remove('input-error')
    }
}

    // const checkIfValid = (input, error) => {
    //     if(input.nodeName === "INPUT") {
    //         if(!input.validity.valueMissing) {
                
    
    //         } else {
    //             errorMsgs.requiredErr(input, error)
    //         }
    //     }
    // }
    
    // const checkNameLength = (input, error) => {
    //     if (input.validity.tooShort) {
    //         let min = Number(input.attributes.minLength.nodeValue);
    //         let max = Number(input.attributes.maxLength.nodeValue);
    //         errorMsgs.checkNameLength(input, error, min, max)
    //     } else if (input.validity.valid) {
    //         error.textContent = ""
    //         removeErrorMsg(input, error)
    //     }
    // } 