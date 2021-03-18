
console.log("this is js file!");


var form = document.querySelector('form')
var text = document.querySelector('input')
var msg1 = document.querySelector('#msg1')
var msg2 = document.querySelector('#msg2')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    var loc = text.value
    msg1.textContent ='Loading...'
    msg2.textContent=''
    fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        msg1.textContent = data.error;
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.weather
        }
        
    })
})

})