const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nameInput = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const inputs = document.querySelectorAll('input');
const formEls = document.querySelectorAll('.form-element');
const errorSpans = document.querySelectorAll('span');
console.log(Array.from(formEls)[0].children[1].attributes)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    Array.from(formEls).forEach(item => {
        let children = item.children;
        let inputChild = children[1]
        let spanChild = children[2];
        if(inputChild.nodeName !== "SELECT") {
            if(!inputChild.validity.valid) {
                if(inputChild.attributes.name.nodeValue === "name" && (!inputChild.validity.valueMissing)) {
                    let min = Number(inputChild.attributes.minLength.nodeValue);
                    let max = Number(inputChild.attributes.maxLength.nodeValue);
                    console.log(inputChild.value.length)
                    errorMsgs.checkNameLength(inputChild, spanChild, min, max)
                } else {
                    errorMsgs.requiredErr(inputChild, spanChild)
                }
            } else {
                form.reset()
            }
        }
    })
})

let hasBeenBlurred = false;

Array.from(formEls).forEach(item => {
    let children = item.children;
    let input = children[1];
    let error = children[2];
    input.addEventListener('input', (e) => {
        if(hasBeenBlurred) {
            if (input.validity.valueMissing) {
                errorMsgs.requiredErr(input, error);
            } 
            else if (input.validity.tooShort) {
                checkNameLength(input, error);
            } 
            else {
                error.textContent = ""
                removeErrorMsg(input, error)
            }
        }

        console.log(input.validity)
    })
    input.addEventListener('blur', (e) => {
        hasBeenBlurred = true;
        if (input.validity.valueMissing) {
            errorMsgs.requiredErr(input, error);
        } 
        else if (input.validity.tooShort) {
            checkNameLength(input, error);
        } 
        else {
            error.textContent = ""
            removeErrorMsg(input, error)
        }
    })
})

const checkIfValid = (input, error) => {
    if(input.nodeName === "INPUT") {
        if(!input.validity.valueMissing) {
            

        } else {
            errorMsgs.requiredErr(input, error)
        }
    }
}

const checkNameLength = (input, error) => {
    if (input.validity.tooShort) {
        let min = Number(input.attributes.minLength.nodeValue);
        let max = Number(input.attributes.maxLength.nodeValue);
        errorMsgs.checkNameLength(input, error, min, max)
    } else if (input.validity.valid) {
        error.textContent = ""
        removeErrorMsg(input, error)
    }
} 

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

const errorMsgs = (() => {
    const requiredErr = (el, elError) => {
        if(el.validity.valueMissing) {
            elError.textContent = "You need to enter a value";
            showErrorMsg(el, elError);
        } else  if (el.validity.valid) {
            removeErrorMsg(el, elError);
            elError.textContent = "";
        }
    }

    const checkNameLength = (el, elError, min, max) => {
        let length = el.value.length
        if(length < 3) {
            elError.textContent = `You need to enter at least ${min} characters; you have entered only ${length} character/s`;
        } 
        else if(length > 20) {
            elError.textContent = `You have entered to ${length} characters, you may only enter ${max}`
        }
        showErrorMsg(el, elError);
    }

    return {
        requiredErr: requiredErr,
        checkNameLength: checkNameLength
    }
})();