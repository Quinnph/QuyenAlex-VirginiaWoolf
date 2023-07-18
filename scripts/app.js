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

// BUG: prevent data loss when reload the page

contactForm.addEventListener('input', enableSubmitButton)
modalButton.addEventListener('click', activateModal)
submitButton.addEventListener('click', resetInputFields)
submitButton.addEventListener('click', closeModalSubmit)
submitButton.addEventListener('click', resetModal)
backButton.addEventListener('click', resetModal)
backButton.addEventListener('click', removeData)

function enableSubmitButton() {
    if (firstNameInputField.value.length <= 0 || lastNameInputField.value.length <= 0 || emailInputField.value.length <= 0 || messageInputField.value.length <= 0) {
        modalButton.disabled = true;
    } else {
        modalButton.disabled = false;
    }
 }

function activateModal(){
    collectData();
    getCurrentIndex();
    const checkFirstName = nameValidator(String(dataObject[currentIndex]['firstname']))
    const checkLastName = nameValidator(String(dataObject[currentIndex]['lastname']))
    const checkEmail = emailValidator(String(dataObject[currentIndex]['email']));
    try {
        if (checkFirstName === false || checkLastName === false){
            alert('Your first and last name should contain at least 3 characters.');  
            $('#modal').modal('hide');
            resetModal();
            removeData();
            modalButton.disabled = true;
        } else if (checkEmail === false) {
            alert('Please provide a valid email.');
            $('#modal').modal('hide');
            resetModal();
            removeData();
            modalButton.disabled = true;
        } else {
            printToModal();
        }
    } catch (error) {
        resetModal();
        removeData();
        console.error(error);
        alert('ERROR');
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

function resetInputFields() {
    contactForm.reset();
}

function printToModal() {
    getCurrentIndex();
    Object.entries(dataObject[currentIndex]).forEach(entry => {
        const [key, value] = entry;
        let newItem = document.createElement('p');
        newItem.innerText = `${key}: ${value}`;
        modalBody.append(newItem);
    })
}


function closeModalSubmit() {
    alert('We will get back to you soon. Thank you!');
    $('#modal').modal('hide');
    resetModal();
    modalButton.disabled = true;
}

function resetModal() { 
    const modalBodyCount = modalBody.childElementCount;
    for (let x = 0; x < modalBodyCount; x++) {
        modalBody.querySelector('p').remove();       
    }
}

function removeData() {
    getCurrentIndex();
    dataObject.pop();
}

function emailValidator(email){
    const at = email.indexOf("@");
    if(at >= 1){
        const emailSecondHalf = email.split("@");
        const period = emailSecondHalf[1].indexOf(".");
        if(period >= 1){
            return true;
        } else{
            return false;
        }
    } else {
        return false;
    }
}

function nameValidator(name){
    if(name.length >= 3){
        return true;
    } else {
        return false;
    }  
}