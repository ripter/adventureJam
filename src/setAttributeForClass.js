
export default function setAttributeForClass(parent, class_name, attribute, value) {
    var elements = parent.getElementsByClassName(class_name);
    for(var i = 0; i < elements.length; i++) {
        elements[i].setAttribute(attribute, value);
    }
}
