import {sidebar, menuSearch, stickyNav, mobileNav, allButtons} from '../views/Base';
import TinyGesture from 'tinygesture';
import {applyFunctionToButtons, clickAndEnter, setContainerSize} from "./HelperFunctions";

//Ticker allows to slide through different sub elements manually or automatically
export default class Ticker {

    constructor(param) {
        param = Object.assign({}, Ticker.default, param);
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
        this.reset = this.reset.bind(this);
        this.init = this.init.bind(this);
    }

    reset() { //reset position
        this.count = {
            position: 0,
            index: 0,
        };
        this.scrollState = {
            decrement: false,
            increment: true
        };
    }

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
        let headlinesChildElements = [... document.querySelectorAll('.headlines-display__container')];
        if(arg === 'increment') {
            if(this.param.axis === 'Y') {
                this.count.position += this.param.childElements[this.count.index].offsetHeight
            } else if(this.param.axis === 'X') {
                this.param.forHeadlines === true ? this.count.position += headlinesChildElements[this.count.index].offsetWidth :
                this.count.position += this.param.childElements[this.count.index].offsetWidth;
            }
        } else if(arg === 'decrement') {
            if(this.param.axis === 'Y') {
                this.count.position -= this.param.childElements[this.count.index].offsetHeight
            } else if(this.param.axis === 'X') {
                this.param.forHeadlines === true ? this.count.position -= headlinesChildElements[this.count.index].offsetWidth :
                this.count.position -= this.param.childElements[this.count.index].offsetWidth;
            }
        }
    }

    //call this function if fade in effect is required
    toggleOpacity() {
        if(this.param.fadeIn === true && this.param.forHeadlines === false){
            this.param.childElements.forEach(el => {
                if (el === this.param.childElements[this.count.index]) {
                    el.style.opacity = '1';
                } else {
                    el.style.opacity = '0';
                }
            });
        }
    }

    //initiate ticker (with user interaction supported)
    init() {
        //Timer setup
        let tickerInterval;
        let that = this;

        //execute scroll function at a set time-interval
        function timerStart() {
            tickerInterval = setInterval(()=> {
                that.scrollState.increment === true ? that.scrollUp(true) : that.scrollDown(true);
            }, that.param.interval);
        }

        //cancel interval function
        function timerStop() { if(tickerInterval) tickerInterval = clearInterval(tickerInterval)}

        //assign start/stop/reset functions to all buttons and search boxes
        clickAndEnter(menuSearch.input, menuSearch.button, timerStop); //stop interval count on interaction with the menu search bar
        clickAndEnter(stickyNav.input, stickyNav.button, timerStop); //stop interval count on interaction with the sticky navigation search bar
        clickAndEnter(mobileNav.input, mobileNav.searchButton, timerStop); //stop interval count on interaction with the mobile menu search bar
        applyFunctionToButtons(allButtons, timerStop); // stop the timer when any of the category buttons is clicked

        clickAndEnter(stickyNav.input, stickyNav.button, this.reset); //reset position on interaction with the sticky navigation search bar
        clickAndEnter(mobileNav.input, mobileNav.searchButton, this.reset); //reset position on interaction with the mobile menu search bar
        clickAndEnter(menuSearch.input, menuSearch.button, this.reset); //reset position on interaction with the menu search bar
        applyFunctionToButtons(allButtons, this.reset);//reset position when any of the category buttons is clicked

        applyFunctionToButtons(allButtons, timerStart);
        clickAndEnter(menuSearch.input, menuSearch.button, timerStart); //stop interval count on interaction with the menu search bar
        clickAndEnter(stickyNav.input, stickyNav.button, timerStart); //stop interval count on interaction with the sticky navigation search bar
        clickAndEnter(mobileNav.input, mobileNav.searchButton, timerStart); //stop interval count on interaction with the mobile menu search bar

        //start timer
        timerStart();

        //control arrows
        if(this.param.leftButton && this.param.rightButton) {
            //pause the ticker while user interaction is ongoing
            this.param.leftButton.addEventListener('mouseover', timerStop);
            this.param.rightButton.addEventListener('mouseover', timerStop);
            //on click move to next slide
            this.param.leftButton.addEventListener('click', this.scrollDown);
            this.param.rightButton.addEventListener('click', this.scrollUp);
            //restart timer when user stops interacting with the arrow buttons
            this.param.leftButton.addEventListener('mouseleave', timerStart);
            this.param.rightButton.addEventListener('mouseleave', timerStart);
        }

        //initialize gesture feature
        const gesture = new TinyGesture(this.param.parent);
        //gesture control
        gesture.on('swiperight', this.scrollDown);
        gesture.on('swipeleft',  this.scrollUp);

        //pause the ticker while user interaction is ongoing
        this.param.parent.addEventListener('mouseover', timerStop);
        this.param.parent.addEventListener('mouseleave', timerStart);
        this.param.parent.addEventListener("touchstart", timerStop);
        this.param.parent.addEventListener("touchend", timerStart);
    }

    //initiate sidebar ticker (no user interaction supported)
    sidebarTicker() {
        //Timer setup
        let animateInterval;
        let that = this;
        function timerStart(){animateInterval = setInterval(animate, 5000);}
        function timerStop() {
            sidebar.searchButton.innerHTML = '<img class="articles-display__sidebar__heading__search-button-spinner" src="./img/spinner.gif" alt="spinner">';
            if(animateInterval) animateInterval = clearInterval(animateInterval);
        }

        //reset ticker position
        function reset() {
            that.param.parent.removeAttribute('style');
            that.param.parent.style.transform = `translate${that.param.axis}(0px)`;
            sidebar.tickerUl.insertBefore(that.param.parent.firstElementChild, null);
        }

        //move the ticker up
        function animate() {
            that.param.parent.style.transition = 'transform .5s ease-out';
            that.param.parent.style.transform += `translate${that.param.axis}(-${childElements[1].offsetHeight}px)`;
            setTimeout(reset, 500);
        }

        //stop the timer when a search query is sent
        clickAndEnter(sidebar.searchInput, sidebar.searchButton, timerStop);

        //resize parent element on relative to child elements height
        const childElements = this.param.childElements;
        setContainerSize('height', this.param.parentWrap, childElements, 0, 10);

        //start the timer
        timerStart();
    }
};

//create object with default parameters
Ticker.default = {
    childElements: null,
    parent: null,
    parentWrap: null,
    leftButton: null,
    rightButton: null,
    axis: 'X',
    fadeIn: false,
    forHeadlines: false,
    interval: 10000 //unit is measured in seconds and must be round
};