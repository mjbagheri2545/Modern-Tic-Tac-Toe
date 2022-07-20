let boxs = document.querySelectorAll('.box');
let input1 = document.querySelector('#person1');
let input2 = document.querySelector('#person2');
let startBtn = document.querySelector('.submit');
let gameEnd = false;

class Person{
    constructor(name,turn){
        this.name = name;
        this.turn = turn;
    }
    changeTurn(){
        if(this.turn == true){
            this.turn = false;
        }else if(this.turn == false){
            this.turn = true;
        }
    }
    win(){
        let personSpan = document.createElement('span');
        personSpan.innerHTML = `congratulations <span>${this.name}</span> !! You Won!`
        personSpan.classList.add('person-span');
        document.body.appendChild(personSpan);
        gameEnd = true;
    }
}

let person1 = new Person(input1.value,true);
let person2 = new Person(input2.value,false);

input1.addEventListener('input',()=>{
    person1.name = input1.value;
})
input2.addEventListener('input',()=>{
    person2.name = input2.value;
})

startBtn.addEventListener('click',()=>{
    if(input1.value.length >= 3 && input2.value.length >= 3){
        game();
    }
})

function game(){

    boxs.forEach((box)=>{
        box.addEventListener('click',clickBox);
        box.addEventListener('mouseenter',hoverBox);
        box.addEventListener('mouseleave',leaveBox);
    })
    
    function clickBox(e){
        if(!gameEnd){
            if(person1.turn)
        {
            e.target.classList.add('click1');
            e.target.removeEventListener('mouseenter',hoverBox);
            e.target.removeEventListener('mouseleave',leaveBox);
            e.target.removeEventListener('click',clickBox);
            e.target.style.setProperty('--opc','1');
            changePlayerTurn();
            winChecker();
        }else
        {
            e.target.classList.add('click2');
            e.target.removeEventListener('mouseenter',hoverBox);
            e.target.removeEventListener('mouseleave',leaveBox);
            e.target.removeEventListener('click',clickBox);
            e.target.style.setProperty('--opc','1');
            changePlayerTurn();
            winChecker();
        }
        }
    }
    function hoverBox(e){
        if(!gameEnd){
            if (person1.turn) {
                e.target.classList.add('click1');
                e.target.style.setProperty('--opc','0.6');
            } else{
                e.target.classList.add('click2');
                e.target.style.setProperty('--opc','0.6');
            }
        }
    }
    function leaveBox(e){
        if(!gameEnd){
            if (person1.turn) {
                e.target.classList.remove('click1');
                e.target.style.setProperty('--opc','1');
            } else{
                e.target.classList.remove('click2');
                e.target.style.setProperty('--opc','1');
            }
        }
    }
    function changePlayerTurn(){
        person1.changeTurn();
        person2.changeTurn();
    }
    function winChecker(){
        indexChecker(0,1,2,'click1');
        indexChecker(3,4,5,'click1');
        indexChecker(6,7,8,'click1');
        indexChecker(0,3,6,'click1');
        indexChecker(1,4,7,'click1');
        indexChecker(2,5,8,'click1');
        indexChecker(0,4,8,'click1');
        indexChecker(2,4,6,'click1');
        indexChecker(0,1,2,'click2');
        indexChecker(3,4,5,'click2');
        indexChecker(6,7,8,'click2');
        indexChecker(0,3,6,'click2');
        indexChecker(1,4,7,'click2');
        indexChecker(2,5,8,'click2');
        indexChecker(0,4,8,'click2');
        indexChecker(2,4,6,'click2');
    }
    function indexChecker(one,two,three,classname){
        if(boxs[one].classList.contains(classname) && boxs[two].classList.contains(classname) && boxs[three].classList.contains(classname))
        {
            if(classname.includes(1)){
                person1.win();
            }else{
                person2.win();
            }
        }
    }
}
