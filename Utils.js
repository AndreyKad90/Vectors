function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function sineFromDegrees(degrees) {
    return Math.sin(toRadians(degrees));
}

function cosineFromDegrees(degrees) {
    return Math.cos(toRadians(degrees));
}

function getValueOfElement(element) {
    return document.querySelector(element).value;
}