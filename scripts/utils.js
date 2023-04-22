export function AddClassOnHtmlElement(element, className) {
    element.classList.add(className);
}

export function RemoveClassOnHtmlElement(element, className) {
    element.classList.remove(className);
}

export function AddClassOnHtmlElements(elements, className) {
    elements.forEach(element => {
        console.log(element);
        AddClassOnHtmlElement(element, className);
    });
}

export function RemoveClassOnHtmlElements(elements, className) {
    elements.forEach(element => {
        console.log(element);
        RemoveClassOnHtmlElement(element, className);
    });
}
