const cardMapping = {
    'c-10': '10_of_clubs',
    'd-10': '10_of_diamonds',
    'h-10': '10_of_hearts',
    's-10': '10_of_spades',
    'c-2': '2_of_clubs',
    'd-2': '2_of_diamonds',
// 2_of_hearts.svg
// 2_of_spades.svg
// 3_of_clubs.svg
// 3_of_diamonds.svg
// 3_of_hearts.svg
// 3_of_spades.svg
// 4_of_clubs.svg
// 4_of_diamonds.svg
// 4_of_hearts.svg
// 4_of_spades.svg
// 5_of_clubs.svg
// 5_of_diamonds.svg
// 5_of_hearts.svg
// 5_of_spades.svg
// 6_of_clubs.svg
// 6_of_diamonds.svg
// 6_of_hearts.svg
// 6_of_spades.svg
// 7_of_clubs.svg
// 7_of_diamonds.svg
// 7_of_hearts.svg
// 7_of_spades.svg
// 8_of_clubs.svg
// 8_of_diamonds.svg
// 8_of_hearts.svg
// 8_of_spades.svg
// 9_of_clubs.svg
// 9_of_diamonds.svg
// 9_of_hearts.svg
// 9_of_spades.svg
// ace_of_clubs.svg
// ace_of_diamonds.svg
// ace_of_hearts.svg
// ace_of_spades.svg
// black_joker.svg
// jack_of_clubs.svg
// jack_of_diamonds.svg
// jack_of_hearts.svg
// jack_of_spades.svg
// king_of_clubs.svg
// king_of_diamonds.svg
// king_of_hearts.svg
// king_of_spades.svg
// queen_of_clubs.svg
    'd-12':'queen_of_diamonds',
    'h-12':'queen_of_hearts',
    's-12':'queen_of_spades',
    'r-14':'red_joker'

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
    let cardImage = document.createElement('img');
    let cardText = cardValue['suit'] + '-' + cardValue['number'];
    cardImage.src = './card_images/' + cardMapping[cardText] + '.svg';
    card.className = 'card';
    card.dataset.suit = cardValue['suit'];
    card.dataset.colour = 'hd'.includes(cardValue['suit']) ? 'r' : 'b'
    card.dataset.number = cardValue['number'];
    card.append(cardImage);
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
    let mm = document.querySelectorAll('.cardRow');
    mm.forEach(function(nn) {
        if(nn.length >= 1) {
            nn.childNodes.forEach(function(v) {
                v.setAttribute('draggable', 'false');
                v.removeEventListener("dragstart", handleDragStart);
            });
        } else {
            nn.setAttribute('draggable', 'false');
            nn.removeEventListener("dragstart", handleDragStart);
        }
    })
    mm.forEach(function(value) {

        value.lastChild.setAttribute('draggable', 'true');
        value.lastChild.addEventListener("dragstart", handleDragStart);
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