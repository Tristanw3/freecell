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

let gameInfo = {
    moveTracker: [],
    addMove(card, dropLocation) {
        const location = dropLocation.className.slice(-2);
        this.moveTracker.push({
            'card': card,
            'location': location
        });
    },
    undoMove() {
        if(this.moveTracker.length === 0) return;
        let lastMove = this.moveTracker.pop();
        let lastMoveSpot = document.getElementsByClassName(lastMove.location)[0];
        appendCard(lastMove.card, lastMoveSpot);   
    },
    grabbedCard: null
}

function getAllMoveableCards(){
    const allMoveableCardsSelectorQuery = `
        .leftFour .cardStack .card,
        .rightFour .cardStack .card:last-child,
        .cardRow .card:last-child
    `;
    const allMoveableCards = document.querySelectorAll(allMoveableCardsSelectorQuery);

    // working on moving stacks in bottom row
    // const topFour = document.querySelectorAll('.leftFour .cardStack');
    // let emptyTopCardSpaces = 0;
    // topFour.forEach(function(cardStack) {
    //     if (!cardStack.hasChildNodes) {
    //         emptyTopCardSpaces ++;
    //     }
    // });


    return allMoveableCards
}

function checkWin() {
    const cardCount = document.querySelectorAll('.rightFour .cardStack .card').length;
    if(cardCount === 52) {
        alert('win')
        return true;
    } else {
        return false;
    }
}

function addAllClickEvents() {
    let moveCards = getAllMoveableCards();
    moveCards.forEach(function(card) {
        card.addEventListener('click', clickEvent)
    });
}

function clickEvent(event) {
    const clickedCard = event.target;
    let hasMoved = false;
    const allTopRightCards = document.querySelectorAll('.rightFour .cardStack');
    const allTopRightCardsArray = [...allTopRightCards];
    hasMoved = allTopRightCardsArray.some(function(targetStack) {
        const checkAcePlacement = !targetStack.hasChildNodes() && clickedCard.dataset.number === '1';
        if(checkAcePlacement) {
            gameInfo.addMove(clickedCard, clickedCard.parentElement);
            appendCard(clickedCard, targetStack);
            return true
        } else if (targetStack.hasChildNodes()) {
            const cardData = clickedCard.dataset;
            const stackData = targetStack.lastChild.dataset;
            const checkNumberCardPlacement = (
                cardData.suit === stackData.suit
                && Number(cardData.number) === Number(stackData.number) + 1
            );
            if(checkNumberCardPlacement) {
                gameInfo.addMove(clickedCard, clickedCard.parentElement);
                appendCard(clickedCard, targetStack);
                return true
            }
        }
    });
    if(hasMoved) return;

    const allLowerMoveableCards = document.querySelectorAll('.cardRow');
    const allLowerMoveableCardsArray = [...allLowerMoveableCards];
    hasMoved = allLowerMoveableCardsArray.some(function(targetStack){
        if(targetStack.hasChildNodes()) {
            const cardData = clickedCard.dataset;
            const stackData = targetStack.lastChild.dataset;
            const checkDropLower = (
                cardData.colour !== stackData.colour
                && Number(cardData.number) + 1 === Number(stackData.number)
            );
            if(checkDropLower) {
                gameInfo.addMove(clickedCard, clickedCard.parentElement);
                appendCard(clickedCard, targetStack);
                return true;
            }
        } else {
            gameInfo.addMove(clickedCard, clickedCard.parentElement);
            appendCard(clickedCard, targetStack);
            return true;
        }
    });
    if(hasMoved) return;

    const allTopLeftCards = document.querySelectorAll('.leftFour .cardStack');
    const allTopLeftCardsArray = [...allTopLeftCards];
    allTopLeftCardsArray.some(function(targetStack) {
        if(!targetStack.hasChildNodes()) {
            gameInfo.addMove(clickedCard, clickedCard.parentElement);
            appendCard(clickedCard, targetStack);
            return true
        }
    });
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

function handleDragStart(event) {
    gameInfo.grabbedCard = event.target;
    makeDroppable(gameInfo.grabbedCard)
}

function getTargetLocation(event) {
    let target;
    if(event.target.className === 'card') {
        target = event.target.parentElement;
    } else {
        target = event.target;
    }
    return target
}

function appendCard(card, targetCardDropPoint) {
    // fix card offset for bottom rows
    if(targetCardDropPoint.className.includes('cardRow')) {
        card.style.top = String(220 + targetCardDropPoint.childElementCount * 20) + "px";
    } else {
        card.style.top = '';
    }
    targetCardDropPoint.append(card);
    removeEventListeners();
    checkWin();
    setDraggableCards();
    addAllClickEvents();
}

function handleDrop(event) {
    event.stopPropagation();
    // Track move
    let targetCardDropPoint = getTargetLocation(event);
    gameInfo.addMove(gameInfo.grabbedCard, gameInfo.grabbedCard.parentElement);
    appendCard(gameInfo.grabbedCard, targetCardDropPoint);  
}

function removeEventListeners() {
    let allCardsAndDropPoints = document.querySelectorAll('.card, .cardRow, .cardStack')
    allCardsAndDropPoints.forEach(function(position) {
        position.removeEventListener('click', clickEvent)
        position.removeEventListener("dragover", stopDragOver);
        position.removeEventListener('drop', handleDrop);
    });  
}

function makeDroppable(grabbedCard) {
    // left four
    const leftCards = document.querySelectorAll('.leftFour .cardStack');
    leftCards.forEach(function(targetStack) {
        if(targetStack.childElementCount === 0) {
            targetStack.addEventListener("dragover", stopDragOver);    
            targetStack.addEventListener('drop', handleDrop);
        }
    });
    // right four
    let rightCards = document.querySelectorAll('.rightFour .cardStack');
    rightCards.forEach(function(targetStack) {
        const checkAcePlacement = !targetStack.hasChildNodes() && grabbedCard.dataset.number === '1';
        if(checkAcePlacement) {
            targetStack.addEventListener("dragover", stopDragOver);
            targetStack.addEventListener('drop', handleDrop);
        } else if (targetStack.hasChildNodes()) {
            const checkNumberCardPlacement = (
                targetStack.lastChild.dataset.suit === grabbedCard.dataset.suit 
                && Number(targetStack.lastChild.dataset.number) + 1 === Number(grabbedCard.dataset.number)
            );
            if (checkNumberCardPlacement) {
                targetStack.lastChild.addEventListener("dragover", stopDragOver);
                targetStack.lastChild.addEventListener('drop', handleDrop);
            }
        }
    });
    // bottom row
    let bottomCards = document.querySelectorAll('.cardRow');
    bottomCards.forEach(function(cardStack) {
        if(cardStack.hasChildNodes()) {
            const checkDropLower = (
                grabbedCard.dataset.colour !== cardStack.lastChild.dataset.colour
                && Number(grabbedCard.dataset.number) + 1 === Number(cardStack.lastChild.dataset.number)
            );
            if(checkDropLower) {
                cardStack.addEventListener("dragover", stopDragOver);
                cardStack.addEventListener('drop', handleDrop);
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

    first28.forEach(function(cardData, index) {
        let columnNumber = Math.floor(index / 7);
        let card = createCard(cardData);
        appendCard(card, cardRows[columnNumber]);
    });

    second24.forEach(function(cardData, index) {
        let columnNumber = Math.floor(index / 6 + 4);
        let card = createCard(cardData);
        appendCard(card, cardRows[columnNumber]);
    });
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
    let m = array.length;
    while (m) {
        let i = Math.floor(Math.random() * m--);
        let t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        gameInfo.undoMove();
    }
}

document.onkeydown = KeyPress;

let initialCards = createAllCardsList();
opening(initialCards)

getAllMoveableCards()