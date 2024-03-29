const button = document.querySelector('#logout-btn');
const activateBtn = document.querySelector('input[name=checkbox]');
console.log(activateBtn)
button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'black';
    button.style.color = 'white';
    button.style.transform = 'scale(1.3)';

    document.querySelector('div').style.backgroundColor = '#ee2f64';
});

button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '#f5c2e0';
    button.style.color = 'black';
    button.style.transform = 'scale(1)';

    document.querySelector('div').style.backgroundColor = '#fcee54';
});

button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
        if (response === 'success') window.location.replace('./popup-sign-in.html');
    })
});

chrome.storage.local.get(['user_info'], async function (response) {
    const resp = await fetch('http://localhost:3000/api/website/myCarbon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: response.user_info,
        })
    })
    const data = await resp.json()

})

activateBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
        chrome.runtime.sendMessage({ message: 'activate' }, function (response) {
            if (response === 'success') console.log('activated')
        })
    } else {
        chrome.runtime.sendMessage({ message: 'deactivate' }, function (response) {
            if (response === 'success') console.log('deactivated')
        })
    }
});
