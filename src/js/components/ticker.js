import {sidebar, breakingNews} from '../views/Base';

export default class Ticker {
    ///////////******    custom functions:   ******///////////

    //twitter sidebar ticker
    sidebarTicker() {
        const childElements = document.querySelectorAll('.articles-display__sidebar__container__ul > *');
        this.setContainerSize('height', sidebar.tickerContainer, childElements);
        setInterval(()=> {
            this.moveUp(sidebar.tickerUl, sidebar.tickerUl.children[1].offsetHeight, 6, 'up');
            sidebar.tickerUl.insertBefore(sidebar.tickerUl.firstElementChild, childElements.lastChild);
        }, 5000);
    }

    //breaking news strip ticker
    breakingNewsTicker() {
        const childElements = document.querySelectorAll('.breaking__news__text__ul-li');
        let index = 0;
        let position = 0;
        let scrollState = {
            decrement: false,
            increment: true
        };

        let totalHeight = 0;
        [... childElements].map(element=> {
            totalHeight += element.offsetHeight;
        });

        let scrollUp = (x = true)=> {
            if(x !== true) {
                clearInterval(autoScroll);
                clearTimeout(timeout);
                let timeout = setTimeout(()=> {
                    autoScroll = setInterval(autoScrollLogic, 1000)
                }, 10000);
            }

            if(index === childElements.length -1) {
                breakingNews.left.disabled = true;
                scrollState.increment = false;
                scrollState.decrement = true;
            } else {
                breakingNews.ul.removeAttribute('style');
                position += 40;
                breakingNews.ul.style.transform += `translateY(-${position}px)`;
                index++;
                scrollState.increment = true;
                scrollState.decrement = false;
                console.log(scrollState);
            }
        };

        let scrollDown = (x =  true)=> {
            if(x !== true) {
                clearInterval(autoScroll);
                clearTimeout(timeout);
                let timeout = setTimeout(()=> {
                    autoScroll = setInterval(autoScrollLogic, 1000)
                }, 10000);
            }

            if(index === 0) {
                breakingNews.right.disabled = true;
                scrollState.increment = true;
                scrollState.decrement = false;
            } else {
                breakingNews.right.disabled = false;
                scrollState.increment = false;
                scrollState.decrement = true;
                console.log(scrollState);
                breakingNews.ul.removeAttribute('style');
                position -= 40;
                breakingNews.ul.style.transform += `translateY(-${position}px)`;
                index--;
            }
        };

        let autoScrollLogic = ()=> {
            scrollState.increment === true ? scrollUp(true) : scrollDown(true);
        };

        let autoScroll = setInterval(autoScrollLogic, 1000);

        breakingNews.left.addEventListener('click', scrollUp);

        breakingNews.right.addEventListener('click', scrollDown);

    }


    ///////////******    reusable functions:   ******///////////

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
