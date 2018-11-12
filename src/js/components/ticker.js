import {sidebar} from '../views/Base';

export default class Ticker {
    ///////////******    custom functions:   ******///////////

    //twitter sidebar ticker
    sidebarTicker() {
        const childElements = document.querySelectorAll('.articles-display__sidebar__container__ul > *');
        this.setContainerSize('height', sidebar.tickerContainer, childElements);
        setInterval(()=> {
            this.moveUp(sidebar.tickerUl, sidebar.tickerUl.children[1].offsetHeight, 5);
            sidebar.tickerUl.insertBefore(sidebar.tickerUl.firstElementChild, childElements.lastChild);
            sidebar.tickerUl.style.transform = 'translateY(0px)';
        }, 5000);
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
    moveUp(elem, distance, speed) {
        //animation function input parameters: target element, moving distance, speed
        elem.style.transform = `translateY(0px)`;
        let pos = 0;
        let id = setInterval(frame, speed);
        function frame() {
            let negative = -Math.abs(distance);
            //console.log(negative);
            if(pos === negative) {
                clearInterval(id)
            } else {
                pos--;
                elem.style.transform = `translateY(${pos}px)`;
            }
        }
    }
};


