export const AddClassOnHtmlElement = (element, className) => element.classList.add(className);

export const RemoveClassOnHtmlElement = (element, className) => element.classList.remove(className);

export const AddClassOnHtmlElements = (elements, className) => {
    elements.forEach(element => {
        console.log(element);
        AddClassOnHtmlElement(element, className);
    });
};

export const RemoveClassOnHtmlElements = (elements, className)=>  {
    elements.forEach(element => {
        console.log(element);
        RemoveClassOnHtmlElement(element, className);
    });
}

export const GetRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
