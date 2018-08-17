function buildResultingVector(vectors) {
    const vector = vectors.reduce((result, nextVector) => {
        result.componentY += nextVector.componentY;
        result.componentX += nextVector.componentX;
        return result;
    }, {
        componentX: 0,
        componentY: 0
    });

    vector.componentX = +vector.componentX.toFixed(PRECISION);
    vector.componentY = +vector.componentY.toFixed(PRECISION);
    vector.color = "red";

    const vectorComponentsSquareSum = Math.pow(vector.componentX, 2) + Math.pow(vector.componentY, 2);
    vector.magnitude = +Math.sqrt(vectorComponentsSquareSum).toFixed(PRECISION);
    vector.direction = +toDegrees(Math.asin(vector.componentY / vector.magnitude)).toFixed(PRECISION);
    vector.direction = (vector.direction + 360) % 360;

    return vector;
}

const usedColors = [];

function paintVectors(vectors) {
    vectors.forEach((vector) => {
        let color;
        do {
            color = generateColor();
        } while (usedColors.includes(color));
    
        vector.color = color;
        usedColors.push(color);
    });
}

function generateColor() {
    const random255 = () => Math.floor(Math.random() * 255);

    let red = random255();
    let green = random255();
    let blue = random255();

    return `rgb(${red}, ${green}, ${blue})`;
}