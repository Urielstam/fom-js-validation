const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nameInput = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const inputs = document.querySelectorAll('input');
const formEls = document.querySelectorAll('.form-element');
const errorSpans = document.querySelectorAll('span');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    Array.from(formEls).forEach(item => {
        let children = item.children;
        console.log(children[1].nodeName)
        if(children[1].nodeName !== "SELECT") {
            if(!children[1].validity.valid) {
                errorMsgs.requiredErr(children[1], children[2])
            }
        }
    })
})

Array.from(formEls).forEach(item => {
    let children = item.children;
    let input = children[1];
    let error = children[2];
    input.addEventListener('input', (e) => {
        checkIfValid(input, error);
    })
    input.addEventListener('blur', (e) => {
        console.log("hey")
        checkIfValid(input, error);
    })
})

const checkIfValid = (input, error) => {
    if(input.nodeName === "INPUT") {
        if(!input.validity.valueMissing) {
            error.textContent = ""
            error.classList.remove('show');
            input.classList.remove('input-error');

        } else {
            errorMsgs.requiredErr(input, error)
        }
    }
}

const errorMsgs = (() => {
    const requiredErr = (el, elError) => {
        if(el.validity.valueMissing) {
            elError.textContent = "You need to enter a value";
            elError.classList.add('show');
            el.classList.add("input-error");
        }
    }

    return {
        requiredErr: requiredErr
    }
})();