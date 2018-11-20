import {sidebar, breakingNews} from '../views/Base';
import TinyGesture from 'tinygesture';

export default class Ticker {
    ///////////******    custom functions:   ******///////////
    // childElements, parent, leftButton, rightButton, axis
    constructor(param) {
        param = Object.assign({}, Ticker.emptyParam, param);
        this.param = param;
        this.scrollState = {
            decrement: false,
            increment: true
        }
    }


    Ticker() {
        console.log(this.param);
        const gesture = new TinyGesture(this.param.parent);
        let index = 0;
        let position = 0;
        let timeOut;
        /*let scrollState = {
            decrement: false,
            increment: true
        };*/

        //scroll up function
        let scrollUp = (x = true)=> {
            x !== true ? intervalStop() : null; //if button is clicked pause the ticker

            if(index === this.param.childElements.length -1) { //change scroll direction
                this.param.leftButton.disabled = true;
                this.scrollStateToggle('decrement');
                //scrollState.increment = false;
                //scrollState.decrement = true;
            } else { //else keep scrolling
                this.param.leftButton.disabled = false;
                this.scrollStateToggle('increment');
                //scrollState.increment = true;
                //scrollState.decrement = false;
                index++;
                this.param.parent.removeAttribute('style');
                this.param.axis === 'Y' ?
                    position += this.param.childElements[index].offsetHeight
                    : position += this.param.childElements[index].offsetWidth;
                this.param.parent.style.transform += `translate${this.param.axis}(-${position}px)`;
                console.log(this.param.childElements[index]);
                console.log(index);

                this.param.childElements.forEach(el => {
                    if (el === this.param.childElements[index]) {
                        el.style.opacity = '1';
                    } else {
                        el.style.opacity = '0';
                    }
                });


            }
        };

        //scroll down function
        let scrollDown = (x =  true)=> {
            x !== true ? intervalStop() : null; //if button is clicked pause the ticker

            if(index === 0) {  //change scroll direction
                this.param.rightButton.disabled = true; //if scroll reaches scroll end disable user input
                this.scrollStateToggle('increment');
                //scrollState.increment = true;
                //scrollState.decrement = false;
            } else { //else keep scrolling
                this.param.rightButton.disabled = false;
                this.scrollStateToggle('decrement');
                //scrollState.increment = false;
                //scrollState.decrement = true;
                index--;
                this.param.parent.removeAttribute('style');
                this.param.axis === 'Y' ?
                    position -= this.param.childElements[index].offsetHeight
                    : position -= this.param.childElements[index].offsetWidth;
                this.param.parent.style.transform += `translate${this.param.axis}(-${position}px)`;
                console.log(this.param.childElements[index]);
                console.log(index);

                this.param.childElements.forEach(el => {

                   if(el === this.param.childElements[index]) {
                       el.style.opacity = '1';
                   } else {
                       el.style.opacity = '0';
                   }
                });

            }
        };

        //function to execute at every scroll
        let autoScrollLogic = ()=> {this.scrollState.increment === true ? scrollUp(true) : scrollDown(true);};

        //start timer
        let interval = setInterval(autoScrollLogic, 5000);

        //control timer
        function intervalStart() {
            interval = setInterval(autoScrollLogic, 5000);
        }

        function intervalStop() {
            if (timeOut) {
                clearTimeout(timeOut)
            }
            interval = clearInterval(interval);
            timeOut = setTimeout(function() {
                intervalStart()
            }, 8000)
        }

        //control buttons
        this.param.leftButton.addEventListener('click', scrollDown);
        this.param.rightButton.addEventListener('click', scrollUp);

        //gesture control
        gesture.on('swiperight',scrollDown);
        gesture.on('swipeleft', scrollUp);

        //create object with default parameters
        Ticker.emptyParam = {
            childElements: null,
            parent: null,
            leftButton: null,
            rightButton: null,
            axis: 'X'
        };
    }


    //twitter sidebar ticker
    sidebarTicker() {
        const childElements = document.querySelectorAll('.articles-display__sidebar__container__ul > *');
        this.setContainerSize('height', sidebar.tickerContainer, childElements);
        setInterval(()=> {
            this.moveUp(sidebar.tickerUl, sidebar.tickerUl.children[1].offsetHeight, 6, 'up');
            sidebar.tickerUl.insertBefore(sidebar.tickerUl.firstElementChild, childElements.lastChild);
        }, 5000);
    }
/*
    //breaking news strip ticker
    breakingNewsTicker() {
        const childElements = document.querySelectorAll('.breaking__news__text__ul-li');
        let index = 0;
        let position = 0;
        let timeOut;
        let scrollState = {
            decrement: false,
            increment: true
        };

        //scroll up function
        let scrollUp = (x = true)=> {
            x !== true ? intervalStop() : null; //if button is clicked pause the ticker

            if(index === childElements.length -1) { //change scroll direction
                breakingNews.left.disabled = true;
                scrollState.increment = false;
                scrollState.decrement = true;
            } else { //else keep scrolling
                breakingNews.ul.removeAttribute('style');
                position += 40;
                breakingNews.ul.style.transform += `translateY(-${position}px)`;
                index++;
                scrollState.increment = true;
                scrollState.decrement = false;
            }
        };

        //scroll down function
        let scrollDown = (x =  true)=> {
            x !== true ? intervalStop() : null; //if button is clicked pause the ticker

            if(index === 0) {  //change scroll direction
                breakingNews.right.disabled = true; //if scroll reaches scroll end disable user input
                scrollState.increment = true;
                scrollState.decrement = false;
            } else { //else keep scrolling
                breakingNews.right.disabled = false;
                scrollState.increment = false;
                scrollState.decrement = true;
                breakingNews.ul.removeAttribute('style');
                position -= 40;
                breakingNews.ul.style.transform += `translateY(-${position}px)`;
                index--;
            }
        };

        //function to execute at every scroll
        let autoScrollLogic = ()=> {scrollState.increment === true ? scrollUp(true) : scrollDown(true);};

        //start timer
        let interval = setInterval(autoScrollLogic, 3000);

        //control timer
        function intervalStart() {
            interval = setInterval(autoScrollLogic, 3000);
        }

        function intervalStop() {
            if (timeOut) {
                clearTimeout(timeOut)
            }
            interval = clearInterval(interval);
            timeOut = setTimeout(function() {
                intervalStart()
            }, 5000)
        }

        //control buttons
        breakingNews.left.addEventListener('click', scrollUp);
        breakingNews.right.addEventListener('click', scrollDown);
    }

    //headlines slider
    headlinesSlider() {
        const childElements = document.querySelectorAll('.headlines-display__container');

    }
*/

    ///////////******    reusable functions:   ******///////////

    scrollStateToggle(arg) { //pass either 'increment' or 'decrement'
        if(arg === 'increment') {
            this.scrollState.increment = true;
            this.scrollState.decrement = false;
        } else if(arg === 'decrement') {
            this.scrollState.increment = false;
            this.scrollState.decrement = true;
        }
    }

    //set the height or width of a container relative to the child elements total height
    setContainerSize(measurement, parentElement, childElementCollection) {
        //to use setContainerSize:
        //1. declare measurement type(width or height) as a string
        //2. parent element and a collection or array of child elements must be passed in as parameters

        //calculate and set container height
        let measurementTotal = 0;
        for(let i=0; i < childElementCollection.length-1; i++) {
            let el = childElementCollection[i];
            measurement === 'height' ? measurementTotal += el.offsetHeight : null;
            measurement === 'width' ? measurementTotal += el.offsetWidth: null;
        }
        measurement === 'height' ? parentElement.style.height = `${measurementTotal}px` : null;
        measurement === 'width' ? parentElement.style.width = `${measurementTotal}px`: null;
    }


    //move dom element to a certain direction
    moveUp(elem, distance, speed, direction) {
        //animation function input parameters: target element, moving distance per interval, speed, direction(up or down)
        elem.style.transform = `translateY(0px)`;
        let pos = 0;
        let id = setInterval(frame, speed);
        function frame() {
            if(direction === 'up') {
                let negative = -Math.abs(distance);
                if(pos === negative) {
                    clearInterval(id)
                } else {
                    pos--;
                    elem.style.transform = `translateY(${pos}px)`;
                }
            } else if(direction === 'down') {
                let positive = Math.abs(distance);
                if(pos === positive) {
                    clearInterval(id)
                } else {
                    pos++;
                    elem.style.transform = `translateY(${pos}px)`;
                }
            }

        }
    }
};
