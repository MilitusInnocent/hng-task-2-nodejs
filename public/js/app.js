
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => { //e stands for events
    e.preventDefault();

    messageOne.textContent = 'Fetching data...';
    messageTwo.textContent = '';
    

    const Location = search.value;

    fetch('/weather?address='+ Location).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})