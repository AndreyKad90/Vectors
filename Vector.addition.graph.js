const buildVectorAdditionGraph = (() => {
    const PLUS_SIGN_WIDTH = 10;
    const PLUS_SIGN_COLOR = 'black';

    const EQUALS_SIGN_WIDTH = PLUS_SIGN_WIDTH;
    const EQUALS_SIGN_COLOR = PLUS_SIGN_COLOR;

    const ARROW_SIDE_MARGIN = 20;

    let canvasCtx = null;
    let canvasHeight;
    let canvasMiddle;
    
    
    return (vectors, selector) => {
        const canvas = document.querySelector(selector);
        canvasCtx = canvas.getContext("2d");

        const resultingVector = buildResultingVector(vectors);
        calculateCanvasDimensions([...vectors, resultingVector]);

        let currentX = PADDING;

        vectors.forEach((vector, index) => {
            drawVector(vector, currentX);
            currentX += Math.abs(vector.componentX) + ARROW_SIDE_MARGIN;

            if (index < vectors.length - 1) {
                drawPlusSign(currentX);
                currentX += PLUS_SIGN_WIDTH + ARROW_SIDE_MARGIN;
            } else {
                drawEqualsSign(currentX);
                currentX += EQUALS_SIGN_WIDTH + ARROW_SIDE_MARGIN;
            }
        });

        drawVector(resultingVector, currentX);
    };

    function drawVector(vector, currentX) {
        const halfComponentY = vector.componentY / 2;
        const halfComponentX = vector.componentX / 2;
        const middleX = currentX + Math.abs(vector.componentX) / 2;

        const startY = canvasMiddle + halfComponentY;
        const endY = canvasMiddle - halfComponentY;

        const startX = Math.floor(middleX - halfComponentX);
        const endX = Math.floor(middleX + halfComponentX);

        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY);
        canvasCtx.strokeStyle = vector.color;
        canvasCtx.lineWidth = 3;
        canvasCtx.lineTo(endX, endY);
        canvasCtx.stroke();

        drawVectorArrows(vector, endX, endY);
    }

    function drawVectorArrows(vector, startX, startY) {
        drawVectorArrowPart(vector, startX, startY);
        drawVectorArrowPart(vector, startX, startY, true);
    }

    function drawVectorArrowPart(vector, startX, startY, rightArrow) {
        const direction = rightArrow ? 360 - vector.direction : vector.direction;
        const theta = direction - ARROW_ANGLE;
        const tenthOfMagnitude = vector.magnitude / 10;
        const arrowLength = tenthOfMagnitude > DEFAULT_ARROW_LENGTH ? tenthOfMagnitude : DEFAULT_ARROW_LENGTH;

        const verticalShift = sineFromDegrees(theta) * arrowLength;
        const horizontalShift = cosineFromDegrees(theta) * arrowLength;

        const endX = startX - horizontalShift;
        const endY = rightArrow ? startY - verticalShift : startY + verticalShift;

        canvasCtx.moveTo(startX, startY);
        canvasCtx.lineTo(endX, endY);
        canvasCtx.stroke();
    }

    function drawPlusSign(startX) {
        const halfPlusSignLine = PLUS_SIGN_WIDTH / 2;

        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, canvasMiddle);
        canvasCtx.strokeStyle = PLUS_SIGN_COLOR;
        canvasCtx.lineTo(startX + PLUS_SIGN_WIDTH, canvasMiddle);
        canvasCtx.stroke();

        const startVerticalLineX = startX + halfPlusSignLine;
        canvasCtx.moveTo(startVerticalLineX, canvasMiddle - halfPlusSignLine);
        canvasCtx.lineTo(startVerticalLineX, canvasMiddle + halfPlusSignLine);
        canvasCtx.stroke();
    }

    function drawEqualsSign(startX) {
        const quarterOfWidth = EQUALS_SIGN_WIDTH / 4;
        const upperLineY = canvasMiddle - quarterOfWidth;
        const lowerLineY = canvasMiddle + quarterOfWidth;
        const endX = startX + EQUALS_SIGN_WIDTH;

        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, upperLineY);
        canvasCtx.strokeStyle = EQUALS_SIGN_COLOR;
        canvasCtx.lineTo(endX, upperLineY);
        canvasCtx.stroke();

        canvasCtx.moveTo(startX, lowerLineY);
        canvasCtx.lineTo(endX, lowerLineY);
        canvasCtx.stroke();
    }

    function calculateCanvasDimensions(allVectors) {
        canvasCtx.canvas.height = canvasHeight = calculateCanvasHeight(allVectors);
        canvasCtx.canvas.width = calculateCanvasWidth(allVectors, allVectors.length - 2, 1);

        canvasMiddle = Math.floor(canvasHeight / 2);
    }

    function calculateCanvasHeight(vectors) {
        let maxVectorHeight = 0;
    
        vectors.forEach(({magnitude}) => {
            const yAbs = Math.abs(magnitude);
    
            if (maxVectorHeight < yAbs) {
                maxVectorHeight = yAbs;
            }
        });
    
        return maxVectorHeight + PADDING * 2;
    }

    function calculateCanvasWidth(vectors, plusSigns, equalSigns) {
        let graphWidth = 0;
    
        vectors.forEach(({magnitude}) => {
            graphWidth += Math.abs(magnitude);
        });
    
        const totalMargin = (vectors.length - 1) * 
                            (ARROW_SIDE_MARGIN * 2) + 
                            (plusSigns * PLUS_SIGN_WIDTH) + 
                            (equalSigns * EQUALS_SIGN_WIDTH);
    
        return graphWidth + PADDING * 2 + totalMargin;
    }
})();

