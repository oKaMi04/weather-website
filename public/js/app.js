console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})