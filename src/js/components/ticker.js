import {sidebar, menuSearch, stickyNav, mobileNav} from '../views/Base';
import TinyGesture from 'tinygesture';
import {clickAndEnter, setContainerSize} from "./helperFunctions";

export default class Ticker {

    constructor(param) {
        param = Object.assign({}, Ticker.emptyParam, param);
        this.param = param;
        this.count = {
            position: 0,
            index: 0,
        };
        this.scrollState = {
            decrement: false,
            increment: true
        };
        this.scrollDown = this.scrollDown.bind(this);
        this.scrollUp = this.scrollUp.bind(this);
    }

    init() {

        //Timer setup
        let tickerInterval;
        let that = this;
        clickAndEnter(menuSearch.input, menuSearch.button, timerStop); //stop interval count on interaction with the menu search bar
        clickAndEnter(stickyNav.input, stickyNav.button, timerStop); //stop interval count on interaction with the sticky navigation search bar
        clickAndEnter(mobileNav.input, mobileNav.searchButton, timerStop); //stop interval count on interaction with the mobile menu search bar

        function timerStart(){tickerInterval = setInterval(()=>{ //execute scroll function at a set time interval
            that.scrollState.increment === true ? that.scrollUp(true) : that.scrollDown(true);
        }, that.param.interval);}

        //cancel interval function
        function timerStop() { if(tickerInterval) tickerInterval = clearInterval(tickerInterval)}

        //start timer
        timerStart();

        const gesture = new TinyGesture(this.param.parent);

        //control buttons
        if(this.param.leftButton && this.param.rightButton) {
            this.param.leftButton.addEventListener('click', this.scrollDown);
            this.param.rightButton.addEventListener('click', this.scrollUp);
        }

        //gesture control
        gesture.on('swiperight', this.scrollDown);
        gesture.on('swipeleft',  this.scrollUp);

        //pause the ticker while user interaction is ongoing
        this.param.parent.addEventListener('mouseover', timerStop);
        this.param.parent.addEventListener('mouseleave', timerStart);
        this.param.parent.addEventListener("touchstart", timerStop);
        this.param.parent.addEventListener("touchend", timerStart);
    }

    //sidebar ticker - no user input
    sidebarTicker() {
        let animateInterval;
        let that = this;
        clickAndEnter(sidebar.searchInput, sidebar.searchButton, timerStop);
        const childElements = this.param.childElements;
        setContainerSize('height', this.param.parentWrap, childElements, 0, 10);

       function timerStart(){animateInterval = setInterval(animate, 5000);}

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

        timerStart();
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
    async setDirection(arg) { //takes two parameters: 'increment' or 'decrement'
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
    interval: 10000 //unit is measured in seconds and must be round
};