const resultEl = document.getElementById('result');
const lengthtEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const resultFun = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click',()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password){
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password is copied to clipboard!')
})

generateEl.addEventListener('click', ()=>{
    const length = +lengthtEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(hasUpper,hasLower,hasNumber,hasSymbol,length)
});

function generatePassword(upper,lower, number, symbol, length){
    let generatedPassword = '';
    const typesCount = upper+lower+number+symbol;
    const typesArr = [{upper}, {lower}, {number}, {symbol}].
    filter(item => Object.values(item)[0])

    if (typesCount === 0){
        return ''
    }
    for(let i = 0; i<length; i+=typesCount){
        typesArr.forEach(type =>{
            const funcName = Object.keys(type)[0]
            generatedPassword += resultFun[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0,length);

    return finalPassword;
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol(){
    const symbols = '!@#$%&*/.,(){}=[]_';
    return symbols[Math.floor(Math.random()*symbols.length)];
}

