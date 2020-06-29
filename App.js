const resultel=document.getElementById('result-box');
const lengthel=document.getElementById('length');
const lowercaseel=document.getElementById('lowercase');
const uppercaseel=document.getElementById('uppercase');
const symbolel=document.getElementById('symbol');
const clipboardel=document.getElementById('clipboard');
const generateel=document.getElementById('button');
const numberel=document.getElementById('number');


const randomFunc={
	lower:getRandomLower,
	upper:getRandomUpper,
	number:getRandomNumber,
	symbol:getRandomSymbol
};


clipboardel.addEventListener('click',() => {
  const textarea=document.createElement('textarea');
  const password=resultel.innerText;
  if(!password){
  	return;
  }
  textarea.value=password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied Successfully');
});

generateel.addEventListener('click',()=>{
	const length= +parseInt(lengthel.value);
	const hasLower=lowercaseel.checked;
	const hasUpper=uppercaseel.checked;
	const hasSymbol=symbolel.checked;
	const hasNumber=numberel.checked;


resultel.innerHTML= generatePassword(length,hasLower,hasUpper,hasSymbol,hasNumber);

});

function generatePassword(length,lower,upper,symbol,number){
 let generatedPassword='';
 const typeCount=lower+upper+symbol+number;

 const typeArr=[{lower},{upper},{symbol},{number}].filter(item=>
 	Object.values(item)
 );

 if(typeCount===0){
 	return "";
 }

 for(let i=0;i<length;i+=typeCount){
 	typeArr.forEach(type=>{
 		const funcName=Object.keys(type);

 		generatedPassword+=randomFunc[funcName]();
 	});
 }
 const finalPassword=generatedPassword.slice(0,length);
 console.log(finalPassword);
 return finalPassword;

};



function getRandomLower(){
	return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomUpper(){
	return String.fromCharCode(Math.floor(Math.random()*26)+65);
}


function getRandomNumber(){
	return String.fromCharCode(Math.floor(Math.random()*10)+48);
}


function getRandomSymbol(){
	const symbols="!@#$%^&*()_-?/><.,";
	return symbols[Math.floor(Math.random()*symbols.length)];
}

