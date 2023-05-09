const wordE1=document.getElementById('word');
const wrongLettersE1=document.getElementById('wrong-letter');
const playAgainBtb=document.getElementById('play-button');
const popup=document.getElementById('popup-cointainer');
const notification=document.getElementById('notification-container');
const finalMessage=document.getElementById('final-message');

const figureParts=document.querySelectorAll(".figure-part");

const words=['phyton','database','application','software','programming','terminal','console']

let selectedWord=word[Math.floor(Math.random()*words.length)];

const correctLetters=[]
const wrongLetters=[];

//show hidden word
function displayword(){
    wordE1.innerHTML=`${selectedWord
        .split('')
        .map((letter) =>
            `<span class="letter">
            ${correctLetters.includes(letter)? letter:''}
            </span>`
            )
        .join('')}
        `;
    
        const innerword = wordE1.innerText.replace(/\n/g,'')
        if (innerword==selectedWord){
            finalMessage.innerText='Congragulations ! You have Won!';
            popup.style.display='flex';

        }
}

//update wrong letters
function updateWrongLettersE1(){
    //display wrong letters
    wrongLettersE1.innerHTML=`
    ${wrongLetters.length > 0 ? "<p>Wrong Letters</p>" : ""}
    ${wrongLetters.map((letter)=>`<span>${letter}</span>`)}`;
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display ='block';
        }else{
            part.style.display='none';
        }
    });

    //check if lost

    if(wrongLetters.length == figureParts.length){
        finalMessage.innerHTML='You have Lost the Game.';
        popup.style.display='flex';
    }
}

//show notification

function showNotification(){
    notification.classList.add('show');
    setTimeout(()=> {
        notification.classList.remove("show");
    },200);
}

//keydown letter press

window.addEventListener('keydown',(e)=>{
    if(e.keyCode >= 65 && e.keyCode<=90){
        const letter =e.key;
    if(selectedWord.includes(letter)){
if(!correctLetters.includes(letter)){
correctLetters.push(letter);
displayword();  
  }else{
    showNotification();
  }
  }else{
    if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter);
        updateWrongLettersE1();
    }else{
        showNotification();
    }

}
    }
});

//Restart game

playAgainBtb,addEventListener('click',()=>{
correctLetters.splice(0);
wrongLetters.splice(0);
selectedWord = words[Math.floor(Math.random()* words.length)];
displayword();
updateWrongLettersE1();
popup.style.display="none";
});


