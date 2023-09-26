const cardMapping = {
    'c-1': 'ace_of_clubs',
    'd-1': 'ace_of_diamonds',
    'h-1': 'ace_of_hearts',
    's-1': 'ace_of_spades',
    'c-2': '2_of_clubs',
    'd-2': '2_of_diamonds',
    'h-2': '2_of_hearts',
    's-2': '2_of_spades',
    'c-3': '3_of_clubs',
    'd-3': '3_of_diamonds',
    'h-3': '3_of_hearts',
    's-3': '3_of_spades',
    'c-4': '4_of_clubs',
    'd-4': '4_of_diamonds',
    'h-4': '4_of_hearts',
    's-4': '4_of_spades',
    'c-5': '5_of_clubs',
    'd-5': '5_of_diamonds',
    'h-5': '5_of_hearts',
    's-5': '5_of_spades',
    'c-6': '6_of_clubs',
    'd-6': '6_of_diamonds',
    'h-6': '6_of_hearts',
    's-6': '6_of_spades',
    'c-7': '7_of_clubs',
    'd-7': '7_of_diamonds',
    'h-7': '7_of_hearts',
    's-7': '7_of_spades',
    'c-8': '8_of_clubs',
    'd-8': '8_of_diamonds',
    'h-8': '8_of_hearts',
    's-8': '8_of_spades',
    'c-9': '9_of_clubs',
    'd-9': '9_of_diamonds',
    'h-9': '9_of_hearts',
    's-9': '9_of_spades',
    'c-10': '10_of_clubs',
    'd-10': '10_of_diamonds',
    'h-10': '10_of_hearts',
    's-10': '10_of_spades',
    'c-11': 'jack_of_clubs',
    'd-11': 'jack_of_diamonds',
    'h-11': 'jack_of_hearts',
    's-11': 'jack_of_spades',
    'c-12': 'queen_of_clubs',
    'd-12': 'queen_of_diamonds',
    'h-12': 'queen_of_hearts',
    's-12': 'queen_of_spades',
    'c-13': 'king_of_clubs',
    'd-13': 'king_of_diamonds',
    'h-13': 'king_of_hearts',
    's-13': 'king_of_spades',
    'r-14': 'red_joker',
    'b-14': 'black_joker'
}

function createAllCardsList() {
    let allCards = [];
    let cardSuit = ['s', 'h', 'c', 'd'];
    let cardVal = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    cardSuit.forEach(function(suit) {
        cardVal.forEach(function(value) {
            allCards.push({'suit': suit, 'number': String(value)})
        });
    });
    let shuffledCards = shuffle(allCards);

    return shuffledCards;
}

let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = e.target
    makeDroppable(dragSrcEl)
}

function handleDrop(e) {
    e.stopPropagation();
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
    // remove droppable
    let allCards = document.querySelectorAll('.card, .cardRow, .cardStack')
    allCards.forEach(function(c) {
        c.removeEventListener("dragover", stopDragOver);
        c.removeEventListener('drop', handleDrop);
    });
    setDraggableCards();
}

function makeDroppable(grabbedCard) {

    // left four
    let leftFourCards = document.querySelectorAll('.leftFour .cardStack');
    leftFourCards.forEach(function(ele) {
        if(ele.childElementCount === 0) {
            ele.addEventListener("dragover", stopDragOver);    
            ele.addEventListener('drop', handleDrop);
        }
    });
    // right four
    let rightFourCards = document.querySelectorAll('.rightFour .cardStack');
    rightFourCards.forEach(function(ele) {
        if(ele.childElementCount === 0) {
            if(grabbedCard.dataset.number === '1') {
                ele.addEventListener("dragover", stopDragOver);
                ele.addEventListener('drop', handleDrop);
            }
        } else {
            if (ele.lastChild.dataset.suit === grabbedCard.dataset.suit && Number(ele.lastChild.dataset.number) + 1 === Number(grabbedCard.dataset.number)) {
                ele.lastChild.addEventListener("dragover", stopDragOver);
                ele.lastChild.addEventListener('drop', handleDrop);
            }
        }
    });
    // bottom row
    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(cardStack) {
        if(cardStack.hasChildNodes()) {
            if(Number(grabbedCard.dataset.number) + 1 === Number(cardStack.lastChild.dataset.number)) {
                if(grabbedCard.dataset.colour !== cardStack.lastChild.dataset.colour) {
                    cardStack.addEventListener("dragover", stopDragOver);
                    cardStack.addEventListener('drop', handleDrop);
                }
            }
        } else {
            cardStack.addEventListener("dragover", stopDragOver);
            cardStack.addEventListener('drop', handleDrop);
        }
    });
}

function stopDragOver(e) {e.preventDefault();}

function createCard(cardValue) {
    let card = document.createElement('div');
    let cardText = cardValue['suit'] + '-' + cardValue['number'];
    card.style.backgroundImage = 'url(./card_images/' + cardMapping[cardText] + '.svg)';
    
    card.className = 'card';
    card.dataset.suit = cardValue['suit'];
    card.dataset.colour = 'hd'.includes(cardValue['suit']) ? 'r' : 'b'
    card.dataset.number = cardValue['number'];
    return card
}

function opening(cardList) {
    let cardRows = document.getElementsByClassName('cardRow');
    let first28 = cardList.slice(0, 28);
    let second24 = cardList.slice(28);

    first28.forEach(function(value, index) {
        let colNum = Math.floor(index / 7)
        let x = createCard(value);
        let cardPos = index % 7;
        x.style.top = String(220 + cardPos * 20) + "px";
        cardRows[colNum].append(x);
    });

    second24.forEach(function(value, index) {
        let colNum = Math.floor(index / 6 + 4)
        let x = createCard(value);
        let cardPos = index % 6;
        x.style.top = String(220 + cardPos * 20) + "px";
        cardRows[colNum].append(x);
    });
    setDraggableCards();
}

function setDraggableCards() {
    let allCards = document.querySelectorAll('.card')
    allCards.forEach(function(c) {
        c.setAttribute('draggable', 'false');
        c.removeEventListener("dragstart", handleDragStart);
    });

    let topCardStacks = document.querySelectorAll('.fourBlock .cardStack')
    topCardStacks.forEach(function(cardStack) {
        if(cardStack.hasChildNodes()) {
            cardStack.lastChild.setAttribute('draggable', 'true');
            cardStack.lastChild.addEventListener("dragstart", handleDragStart);
        }
    });

    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(value) {
        if(value.hasChildNodes()) {
            value.lastChild.setAttribute('draggable', 'true');
            value.lastChild.addEventListener("dragstart", handleDragStart);
        }
    })


}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

let initialCards = createAllCardsList();

opening(initialCards)