const contactForm = document.querySelector('form')
let dataObject = []
let currentIndex = 0
const modalButton = document.querySelector('#modalButton')
const submitButton = document.querySelector('.submit-btn')
const backButton = document.querySelector('.btn-secondary')
const modal = document.querySelectorAll('.modal')
const modalBody = document.querySelector('.modal-body')
const firstNameInputField = document.querySelector('#firstname')
const lastNameInputField = document.querySelector('#lastname')
const emailInputField = document.querySelector('#email')
const messageInputField = document.querySelector('#message')

firstNameInputField.addEventListener('input', enableSubmitButton)
lastNameInputField.addEventListener('input', enableSubmitButton)
emailInputField.addEventListener('input', enableSubmitButton)
messageInputField.addEventListener('input', enableSubmitButton)

modalButton.addEventListener('click', collectData)
modalButton.addEventListener('click', printToModal)
submitButton.addEventListener('click', resetInputFields)
submitButton.addEventListener('click', closeModalSubmit)
submitButton.addEventListener('click', resetModal)
backButton.addEventListener('click', resetModal)

function enableSubmitButton() {
     if (firstNameInputField.value.length <= 0 || lastNameInputField.value.length <= 0 || emailInputField.value.length <= 0 || messageInputField.value.length <= 0) {
        modalButton.disabled = true;
     } else {
        modalButton.disabled = false;
     }
 }

function collectData() {
    dataObject.push({
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
        message: document.querySelector('#message').value
    });
}

function getCurrentIndex() {
    currentIndex = dataObject.length - 1;
}

function printToModal() {
    Object.entries(dataObject[currentIndex]).forEach(entry => {
        const [key, value] = entry;
        let newItem = document.createElement('p');
        newItem.innerText = `${key}: ${value}`;
        modalBody.append(newItem);
    })
}

function resetInputFields() {
    contactForm.reset();
}

function closeModalSubmit() {
    alert('We will get back to you soon. Thank you!');
    $('#modal').modal('hide');
    resetModal();
    modalButton.disabled = true;
}

function resetModal(){
    Object.entries(dataObject[currentIndex]).forEach(entry => {
        modalBody.querySelector('p').remove();
    })
    dataObject = [];
}