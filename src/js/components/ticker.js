import {sidebar, breakingNews} from '../views/Base';
import TinyGesture from 'tinygesture';

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

    init() {
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
        timerStop();
        const childElements = this.param.childElements;
        this.setContainerSize('height', this.param.parentWrap, childElements, 10);

       function intervalStart(){
            animateInterval = setInterval(animate, 5000);
        }

        function timerStop() {
           if(animateInterval) {
               animateInterval = clearInterval(animateInterval);
           }
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
            this.param.rightButton.disabled = true; //if scroll reaches scroll end disable user input
            this.scrollStateToggle('increment');
            this.param.rightButton.disabled = false;
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
            this.param.leftButton.disabled = true;
            this.scrollStateToggle('decrement');
            this.param.leftButton.disabled = false;
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


    //set the height or width of a container relative to the child elements total height
    setContainerSize(measurement, parentElement, childElementCollection, noOfItemsToDisplay) {
        //to use setContainerSize:
        //1. declare measurement type(width or height) as a string
        //2. parent element and a collection or array of child elements must be passed in as parameters

        //calculate and set container height
        let measurementTotal = 0;
        for(let i=0; i < childElementCollection.length; i++) {
            let el = childElementCollection[i];


            if(i < noOfItemsToDisplay) {
                measurement === 'height' ? measurementTotal += el.offsetHeight : null;
                measurement === 'width' ? measurementTotal += el.offsetWidth: null;
            } else {
                break;
            }
        }
        measurement === 'height' ? parentElement.style.height = `${measurementTotal}px` : null;
        measurement === 'width' ? parentElement.style.width = `${measurementTotal}px`: null;
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
    tickerInterval: 5 //unit is measured in seconds and must be round
};