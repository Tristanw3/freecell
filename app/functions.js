function createAllCardsList() {
    let allCards = [];
    let cardSuit = ['A', 'B', 'C', 'D'];
    let cardVal = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    cardSuit.forEach(function(suit) {
        cardVal.forEach(function(value) {
            allCards.push(suit + String(value))
        });
    });
    return allCards;
}

let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    console.log(dragSrcEl)
}

function handleDrop(e) {
    console.log("drop[ fire")
    e.stopPropagation();

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}

let leftFourCards = document.querySelectorAll('.leftFour .cardStack');
leftFourCards.forEach(function(ele) {
    ele.addEventListener("dragover", stopDragOver);    
    ele.addEventListener('drop', handleDrop);
});

function stopDragOver(e) {e.preventDefault();}

function createCard(cardValue) {
    let card = document.createElement('div');
    card.innerText = cardValue;
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.addEventListener("dragstart", handleDragStart)
    return card
}

function opening(cardList) {
    let cardRows = document.getElementsByClassName('cardRow');
    
    for (let index = 0; index < cardList.length; index++) {
        let colNum = Math.floor(index / 7)
        let x = createCard(cardList[index]);
        let cardPos = index % 7
        x.style.top = "-" + String(cardPos * 150) + "px"
        cardRows[colNum].append(x)
            
    }
}

let initialCards = createAllCardsList();

opening(initialCards)