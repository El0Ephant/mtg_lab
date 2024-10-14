import { Mtg } from "./api/mtg";
import { ColorStats } from "./widgets/colorStats";
import { ManaCostStats } from "./widgets/manaCostStats";
import { State } from "./model/state";
document.addEventListener("DOMContentLoaded", setup)

const state = new State();

// Image hover
let attached = false;
let imageContainer = document.getElementById('image');

const followMouse = (event) => {
    imageContainer.style.left = event.x + "px";
    imageContainer.style.top = event.y + "px";
}

function showImage(src) {
    if (!attached) {
        attached = true;
        imageContainer.src = src;
        imageContainer.style.display = "block";
        document.addEventListener("pointermove", followMouse);
    }
}

function hideImage() {
    attached = false;
    imageContainer.style.display = "";
    document.removeEventListener("pointermove", followMouse);
}


function setup() {
    const mtg = new Mtg();
    updateSearchList(mtg, { '-type': 'basic' });
    updateBasics(mtg);
    updateStats();

    const form = document.getElementById('searchForm');
    form.addEventListener('submit', handleSearchForm.bind(null, mtg));

    const formatList = document.getElementById('formatList');
    formatList.addEventListener('change', handleSearchForm.bind(null, mtg));

    const searchNonBasic = document.getElementById('searchNonBasic');
    const searchBasic = document.getElementById('searchBasic');

    const toBasicButton = document.getElementById('toBasic');
    toBasicButton.addEventListener('click', ()=>{
        searchBasic.style.display = 'flex';
        searchNonBasic.style.display = 'none';
    });

    const toNonBasicButton = document.getElementById('toNonBasic');
    toNonBasicButton.addEventListener('click', ()=>{
        searchNonBasic.style.display = 'flex';
        searchBasic.style.display = 'none';
    });
}

function handleSearchForm(mtg, event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const format = document.getElementById('formatList').value;

    updateSearchList(mtg, { 'name': name, 'format': format, '-type': 'basic' });
}

function updateBasics(mtg) {
    const menu = document.getElementById('listBasic');
    menu.innerHTML = ''
    mtg.loadCards({ 'type': 'basic' })
        .then((cards) => {
            const menu = document.getElementById('listBasic');
            const list = document.createElement('ul');

            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<button>${card.name}</button>`;
                if (card.image_uris !== undefined) {
                    listItem.firstElementChild.addEventListener('pointerenter', showImage.bind(null, card.image_uris.normal));
                    listItem.firstElementChild.addEventListener('pointerleave', hideImage);
                }
                listItem.firstElementChild.addEventListener('click', () => {
                    const status = state.addCard(card);
                    if (status.statUpdate) {
                        updateStats()
                    }
                    if (status.deckUpdate) {
                        updateDeck()
                    }
                });
                list.appendChild(listItem);

            })
            menu.appendChild(list);
        })
}

function updateSearchList(mtg, params) {
    const menu = document.getElementById('listNonBasic');
    menu.innerHTML = ''
    mtg.loadCards(params)
        .then((cards) => {
            const menu = document.getElementById('listNonBasic');
            const list = document.createElement('ul');

            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<button>${card.name}</button>`;
                if (card.image_uris !== undefined) {
                    listItem.firstElementChild.addEventListener('pointerenter', showImage.bind(null, card.image_uris.normal));
                    listItem.firstElementChild.addEventListener('pointerleave', hideImage);
                }
                listItem.firstElementChild.addEventListener('click', () => {
                    const status = state.addCard(card);
                    if (status.statUpdate) {
                        updateStats()
                    }
                    if (status.deckUpdate) {
                        updateDeck()
                    }
                });
                list.appendChild(listItem);

            })
            menu.appendChild(list);
        })
}

function updateDeck() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    state.cardObjects.forEach((card, id, map) => {
        const container = document.createElement('div');
        container.innerHTML = card.image_uris === undefined ? "<div class='placeholder'></div>" : `<img src='${card.image_uris.normal}' style='height: 250px;'></img>`;
        const buttons = document.createElement('div');
        buttons.className = 'row';

        buttons.innerHTML += `<button>-</button>${state.cardAmounts.get(id)}<button>+</button>`;
        buttons.children[0].addEventListener('click', () => {
            const status = state.removeCard(card);
            if (status.statUpdate) {
                updateStats()
            }
            if (status.deckUpdate) {
                updateDeck()
            }
        });
        buttons.children[1].addEventListener('click', () => {
            const status = state.addCard(card);
            if (status.statUpdate) {
                updateStats()
            }
            if (status.deckUpdate) {
                updateDeck()
            }
        });
        container.appendChild(buttons);
        grid.appendChild(container);
    });
}

function updateStats() {
    const colorStats = document.getElementById("colorStats");
    colorStats.innerHTML = "";
    const manaStats = document.getElementById("manaStats");
    manaStats.innerHTML = "";

    new ColorStats().buildStats(document.getElementById("colorStats"), state.colorData);
    new ManaCostStats().buildStats(document.getElementById("manaStats"), state.costData);
}