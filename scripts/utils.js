export function AddClassOnHtmlElement(element, className) {
    element.classList.add(className);
}

export function AddClassOnHtmlElements(elements, className) {
    elements.forEach(element => {
        console.log(element);
        AddClassOnHtmlElement(element, className);
    });
}
