import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCRipple} from '@material/ripple';

const content = document.getElementById('main-content');

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
drawer.open = true;

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
list.wrapFocus = true;
list.listen('MDCList:action', (event) => {
    const title = document.getElementsByClassName('mdc-top-app-bar__title').item(0);
    let songName = list.listElements[event.detail.index].innerHTML;
    songName = songName.substring(songName.indexOf('>')+1, songName.indexOf('</'));

    let lyrics = '';
    let rawFile = new XMLHttpRequest();
    const getSrc = 'assets/' + songName + '.txt';
    title.innerHTML = songName;
    rawFile.open('GET', getSrc, true);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            lyrics += rawFile.responseText;
            content.innerText = lyrics;
        }
    };
    rawFile.send();
    drawer.open = !drawer.open;
});

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});