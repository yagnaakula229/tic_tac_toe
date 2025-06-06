let boxes = document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#newGame");
let msgContainer=document.querySelector(".msg-container");
let msg= document.querySelector(".msg");

let turnO=true; // playerX , playerO
let count =0;

////2DArray
const winPatterns = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8],
];

const resetGame = ()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
       // console.log("box was clicked");
        if(turnO){ // to get o when clicked
            box.innerText ="O";
            turnO=false;
        }
        else{ // to get 6 when clicked
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;// when we click on same box again it may change x<->o
        // but the values inside box shouldn't get even we double click
        //so we set out box as disabled
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner ){
            gameDraw();

        } 
    });
});


const gamedraw =()=>{
    msg.innerText ='Game was a Draw.';
    msgContainer.classList.remove("hide");
    disableBoxes();

};
//whenever 3 are same , game should stop and display winner
const disableBoxes = () =>{
    for(let box of boxes ){
        box.disabled=true;
    }
};
const enableBoxes = () =>{
    for(let box of boxes ){
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner=(winner) =>{
    msg.innerText=`Congratultions, Winner is ${winner}`;
    msg.style.fontSize = "15vmin";

    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for(let pattern of winPatterns){
       let pos1Value = boxes[pattern[0]].innerText;
       let pos2Value = boxes[pattern[1]].innerText;
       let pos3Value = boxes[pattern[2]].innerText;
       
       if(pos1Value !="" && pos2Value!="" && pos3Value !=""){
        if(pos1Value ===pos2Value && pos2Value===pos3Value){
            //console.log("winner",pos1Value);
            showWinner(pos1Value);
            return true;
        }
       }


    }
};



newGameBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);

