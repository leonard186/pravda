//executes callback function on click or Enter key press
export const clickAndEnter = (inputElement, button, callbackFunction)=> {

    //inputElement should be the text input element
    inputElement.addEventListener('keyup', (e)=> { //execute on Enter Key
        e.preventDefault();
        e.stopPropagation();
        e.keyCode === 13 ? callbackFunction() : null;

    });
    //button can be any clickable element
    button.addEventListener('click', callbackFunction); //execute on click
};


export const applyFunctionToButtons = (buttons, callBackFn)=> {
    buttons.forEach(button => button.addEventListener('click', callBackFn, false));
};