import {sidebar, menuSearch, allButtons} from '../views/Base';
import TinyGesture from 'tinygesture';
import {applyFunctionToButtons, clickAndEnter, setContainerSize} from "./helperFunctions";

export default class Ticker {
    ///////////******    custom functions:   ******///////////
    constructor(param) {
        param = Object.assign({}, Ticker.emptyParam, param);
        this.param = param;
        this.count = {
            position: 0,
            index: 0,
            timerStore: []
        };
        this.scrollState = {
            decrement: false,
            increment: true
        };
        this.scrollDown = this.scrollDown.bind(this);
        this.scrollUp = this.scrollUp.bind(this);
        this.timer = this.timer.bind(this);
        this.resetTickerPos = this.resetTickerPos.bind(this);
    }

    timer() {
        const setTimer = () => {
            let startInterval = setTimeout(setTimer, 1000);
            this.count.timerStore.push(startInterval);
             if(this.count.timerStore.length === this.param.tickerInterval) {
                this.scrollState.increment === true ? this.scrollUp(true) : this.scrollDown(true);
                this.count.timerStore = [];
            }
        };
        return setTimer();
    }

    //reset ticker position to 0
    resetTickerPos() {
        this.count.position = 0;
        this.count.index = 0;
        this.count.timerStore = [];
        this.scrollState.decrement = false;
        this.scrollState.increment = true;
    }

    init() {
        clickAndEnter(menuSearch.input, menuSearch.button, this.resetTickerPos);
        applyFunctionToButtons(allButtons, this.resetTickerPos);
        this.timer();
        const gesture = new TinyGesture(this.param.parent);
        let scrollUpReset = ()=> {
            this.scrollUp();
            this.count.timerStore = [];
        };

        let scrollDownReset = ()=> {
            this.scrollDown();
            this.count.timerStore = [];
        };
        //control buttons
        if(this.param.leftButton && this.param.rightButton) {
            this.param.leftButton.addEventListener('click', scrollDownReset);
            this.param.rightButton.addEventListener('click', scrollUpReset);
        }


        //gesture control
        gesture.on('swiperight', scrollDownReset);
        gesture.on('swipeleft',  scrollUpReset);
    }

    //sidebar ticker - no user input
    sidebarTicker() {
        let animateInterval;
        let that = this;
        clickAndEnter(sidebar.searchInput, sidebar.searchButton, timerStop);
        const childElements = this.param.childElements;
        setContainerSize('height', this.param.parentWrap, childElements, 0, 10);

       function intervalStart(){animateInterval = setInterval(animate, 5000);}

        function timerStop() {
            sidebar.searchButton.innerHTML = '<img class="articles-display__sidebar__heading__search-button-spinner" src="./img/spinner.gif" alt="spinner">';
            if(animateInterval) animateInterval = clearInterval(animateInterval);
        }

        function reset() {
            that.param.parent.removeAttribute('style');
            that.param.parent.style.transform = `translate${that.param.axis}(0px)`;
            sidebar.tickerUl.insertBefore(that.param.parent.firstElementChild, null);
        }

        function animate() {
            that.param.parent.style.transition = 'transform .5s ease-out';
            that.param.parent.style.transform += `translate${that.param.axis}(-${childElements[1].offsetHeight}px)`;
            setTimeout(reset, 500);
        }

        intervalStart();
    }

    ///////////******    reusable functions:   ******///////////

    scrollDown() {
        if(this.count.index === 0) {  //change scroll direction
            if(this.param.rightButton) this.param.rightButton.disabled = true; //if scroll reaches scroll end disable user input
            this.scrollStateToggle('increment');
            if(this.param.rightButton) this.param.rightButton.disabled = false;
        } else { //else keep scrolling
            this.scrollStateToggle('decrement');
            this.count.index--;
            this.toggleOpacity();
            this.param.parent.removeAttribute('style');
            this.setDirection('decrement');
            this.param.parent.style.transform += `translate${this.param.axis}(-${this.count.position}px)`;
        }
    }

    scrollUp() {
        if(this.count.index === this.param.childElements.length -1) { //change scroll direction
            if(this.param.leftButton) this.param.leftButton.disabled = true;
            this.scrollStateToggle('decrement');
            if(this.param.leftButton) this.param.leftButton.disabled = false;
        } else { //else keep scrolling
            this.scrollStateToggle('increment');
            this.count.index++;
            this.toggleOpacity();
            this.param.parent.removeAttribute('style');
            this.setDirection('increment');
            this.param.parent.style.transform += `translate${this.param.axis}(-${this.count.position}px)`;
        }
    }

    scrollStateToggle(arg) { //pass either 'increment' or 'decrement'
        if(arg === 'increment') {
            this.scrollState.increment = true;
            this.scrollState.decrement = false;
        } else if(arg === 'decrement') {
            this.scrollState.increment = false;
            this.scrollState.decrement = true;
        }
    }

    //read current element dimensions and change position
    setDirection(arg) { //takes two parameters: 'increment' or 'decrement'
        if(arg === 'increment') {
            if(this.param.axis === 'Y') {
                this.count.position += this.param.childElements[this.count.index].offsetHeight
            } else if(this.param.axis === 'X') {
                this.count.position += this.param.childElements[this.count.index].offsetWidth;
            }
        } else if(arg === 'decrement') {
            if(this.param.axis === 'Y') {
                this.count.position -= this.param.childElements[this.count.index].offsetHeight
            } else if(this.param.axis === 'X') {
                this.count.position -= this.param.childElements[this.count.index].offsetWidth;
            }
        }

    }

    //call this function if fade in effect is required
    toggleOpacity() {
        if(this.param.fadeIn === true){
            this.param.childElements.forEach(el => {
                if (el === this.param.childElements[this.count.index]) {
                    el.style.opacity = '1';
                } else {
                    el.style.opacity = '0';
                }
            });
        }
    }
};


//create object with default parameters
Ticker.emptyParam = {
    childElements: null,
    parent: null,
    parentWrap: null,
    leftButton: null,
    rightButton: null,
    axis: 'X',
    fadeIn: false,
    tickerInterval: 10 //unit is measured in seconds and must be round
};