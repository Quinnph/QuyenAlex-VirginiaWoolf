const contactForm = document.querySelector('form')
let dataObject = []
const modalButton = document.querySelector('#modalButton')
const submitButton = document.querySelector('.submit-btn')
const modal = document.querySelectorAll('.modal')
const modalBody = document.querySelector('.modal-body')

let requiredInputs = document.querySelectorAll("[required]")
const messageInputField = document.querySelector('#message')
let requiredInputFieldStates = {
    "firstname": false,
    "lastname": false,
    "email": false,
    "message": false
}
// TODO: enable submit(modal) button only if all fields are filled
// messageInputField.addEventListener('input', enableSubmitButton)
// function enableSubmitButton() {
//     if (messageInputField.value.length <= 0) {
//         submitButton.disabled = true;
//     } else {
//         submitButton.disabled = false;
//     }
// }
modalButton.addEventListener('click', collectData)
modalButton.addEventListener('click', printToModal)
submitButton.addEventListener('click', reset)
submitButton.addEventListener('click', closeModalSubmit)

//TODO: fix bug - clear modal after hit Send in case user send another form
//TODO: fix bug - update dataObject and display in modal when user hit Back and edit input fields

function collectData() {
    dataObject.push({
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
        message: document.querySelector('#message').value
    });
    dataObject = dataObject[0];
}

function printToModal() {
    Object.entries(dataObject).forEach(entry => {
        const [key, value] = entry;
        let newItem = document.createElement('p');
        newItem.innerText = `${key}: ${value}`;
        modalBody.append(newItem);
    })
}

function reset() {
    contactForm.reset();
}

function closeModalSubmit() {
    alert('We will get back to you soon. Thank you!');
    $('#modal').modal('hide');
}