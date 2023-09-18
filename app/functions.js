function createAllCardsList() {
    let allCards = [];
    let cardSuit = ['s', 'h', 'c', 'd'];
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
    makeDroppable(dragSrcEl)
}

function handleDrop(e) {
    e.stopPropagation()
    console.log()
    if(e.target.parentElement.className.includes('cardRow')) {
        // dragSrcEl.style.top = String(e.target.parentElement.childElementCount * 150) + 'px'
        dragSrcEl.style.top = String(220 + e.target.parentElement.childElementCount * 20) + "px";
    } else {
        dragSrcEl.style.top = '';
    }
    if (e.target.className === 'card') {
        e.target.parentElement.append(dragSrcEl);
    } else {
        e.target.append(dragSrcEl);
    }
    setDraggableCards();
}

function makeDroppable(card) {
    // left four
    let leftFourCards = document.querySelectorAll('.leftFour .cardStack');
    leftFourCards.forEach(function(ele) {
        // console.log(ele.innerText)
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
        if(Number(ele.dataset.number) + 1 === Number(card.dataset.number)) {
            if(ele.dataset.suit === card.dataset.suit) {
                ele.addEventListener("dragover", stopDragOver);
                ele.addEventListener('drop', handleDrop);
            } else {
                ele.removeEventListener("dragover", stopDragOver);
                ele.removeEventListener('drop', handleDrop);
            }
        }
    });
    // bottom row
    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(value) {
        if(Number(card.dataset.number) + 1 === Number(value.lastChild.dataset.number)) {
            if(card.dataset.colour !== value.lastChild.dataset.colour) {
                value.addEventListener("dragover", stopDragOver);
                value.addEventListener('drop', handleDrop);
            } else {
                value.removeEventListener("dragover", stopDragOver);
                value.removeEventListener('drop', handleDrop);
            }
        } else {
            value.removeEventListener("dragover", stopDragOver);
            value.removeEventListener('drop', handleDrop);
        }
    });
}

function stopDragOver(e) {e.preventDefault();}

function createCard(cardValue) {
    let card = document.createElement('div');
    card.innerText = cardValue['suit'] + '-' + cardValue['number'];
    card.className = 'card';
    card.dataset.suit = cardValue['suit'];
    card.dataset.colour = 'hd'.includes(cardValue['suit']) ? 'r' : 'b'
    card.dataset.number = cardValue['number'];    
    // card.setAttribute('draggable', 'true');
    // card.addEventListener("dragstart", handleDragStart);
    return card
}

function opening(cardList) {
    let cardRows = document.getElementsByClassName('cardRow');
    
    cardList.forEach(function(value, index) {
        
        let colNum = Math.floor(index / 7)
        let x = createCard(value);
        let cardPos = index % 7;
        x.style.top = String(220 + cardPos * 20) + "px";
        cardRows[colNum].append(x);
    })
    setDraggableCards();
}

function setDraggableCards() {
    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(nn) {
        nn.childNodes.forEach(function(v) {
            v.setAttribute('draggable', 'false');
            v.removeEventListener("dragstart", handleDragStart);
        });
    })
    mm.forEach(function(value) {

        value.lastChild.setAttribute('draggable', 'true');
        value.lastChild.addEventListener("dragstart", handleDragStart);
    })
}

let initialCards = createAllCardsList();

opening(initialCards)