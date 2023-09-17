function createAllCardsList() {
    let allCards = [];
    let cardSuit = ['A', 'B', 'C', 'D'];
    let cardVal = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    cardSuit.forEach(function(suit) {
        cardVal.forEach(function(value) {
            allCards.push({'suit': suit, 'number': String(value)})
        });
    });

    return allCards;
}

let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = e.target
    makeDroppable(e.target.dataset.suit, e.target.dataset.number)
}

function handleDrop(e) {
    e.stopPropagation()
    dragSrcEl.style.top = '';
    e.target.append(dragSrcEl);

}

function makeDroppable(suit, dataNumber) {
    // left four
    let leftFourCards = document.querySelectorAll('.leftFour .cardStack');
    leftFourCards.forEach(function(ele) {
        console.log(ele.innerText)
        if(ele.innerText === '') {
            ele.addEventListener("dragover", stopDragOver);    
            ele.addEventListener('drop', handleDrop);
        } else {
            ele.removeEventListener("dragover", stopDragOver);    
            ele.removeEventListener('drop', handleDrop);
        }
    });
    // right four
    let rightFourCards = document.querySelectorAll('.rightFour .cardStack');
    rightFourCards.forEach(function(ele) {
        if(Number(ele.dataset.number) + 1 === Number(dataNumber)) {
            if(ele.dataset.suit === suit) {
                ele.addEventListener("dragover", stopDragOver);
                ele.addEventListener('drop', handleDrop);
            } else {
                ele.removeEventListener("dragover", stopDragOver);
                ele.removeEventListener('drop', handleDrop);
            }
        }
    });   
}

function removeDrop() {
    let stacks = document.querySelectorAll('.cardStack');
    stacks.forEach(function( ) {

    });
}


function stopDragOver(e) {e.preventDefault();}

function createCard(cardValue, isDraggable) {
    let card = document.createElement('div');
    card.innerText = cardValue['suit'] + '-' + cardValue['number'];
    card.className = 'card';
    card.dataset.suit = cardValue['suit'];
    card.dataset.number = cardValue['number'];
    if(isDraggable) {
        card.setAttribute('draggable', 'true');
        card.addEventListener("dragstart", handleDragStart);
    }
    return card
}

function opening(cardList) {
    let cardRows = document.getElementsByClassName('cardRow');
    
    cardList.forEach(function(value, index) {
        let colNum = Math.floor(index / 7)
        let x = createCard(value, true);
        let cardPos = index % 7;
        x.style.top = "-" + String(cardPos * 150) + "px";
        cardRows[colNum].append(x);
    })
    
    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(value) {
        // console.log(value.lastChild);
    })
}

function checkDraggable() {

}

let initialCards = createAllCardsList();

opening(initialCards)