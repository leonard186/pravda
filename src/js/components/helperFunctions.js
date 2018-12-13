//executes callback function on click or Enter key press
export const clickAndEnter = (inputElement, button, callbackFunction)=> {

    //inputElement should be the text input element
    if(inputElement) {
        inputElement.addEventListener('keyup', (e)=> { //execute on Enter Key
            e.preventDefault();
            e.stopPropagation();
            e.keyCode === 13 ? callbackFunction() : null;
            setTimeout(()=> {//reset input field after submit
                e.keyCode === 13 ? inputElement.value = '' : null;
            }, 1000)
        });
    }


    //button can be any element
    if(button) {
        button.addEventListener('click', ()=> {
            callbackFunction();//execute callback function
            setTimeout(()=> {//reset input field after submit
                inputElement.value = '';
            }, 1000)
        });
    }
};

export const applyFunctionToButtons = (buttons, callBackFn)=> {
    buttons.forEach(button => button.addEventListener('click', callBackFn, false));
};

//set the height or width of a container relative to the child elements total height
export const setContainerSize = (measurement, parentElement, childElementCollection,margin, noOfItemsToDisplay)=> {
    //to use setContainerSize:
    //1. declare measurement type(width or height) as a string
    //2. parent element and a collection or array of child elements must be passed in as parameters

    //calculate and set container height
    let measurementTotal = 0;
    for(let i=0; i < childElementCollection.length; i++) {
        let el = childElementCollection[i];


        if(i < noOfItemsToDisplay) {
            measurement === 'height' ? measurementTotal += el.offsetHeight + margin : null;
            measurement === 'width' ? measurementTotal += el.offsetWidth: null;
        } else {
            break;
        }
    }
    measurement === 'height' ? parentElement.style.height = `${measurementTotal}px` : null;
    measurement === 'width' ? parentElement.style.width = `${measurementTotal}px`: null;
};