class Vector {

    constructor(magnitude, direction) {
        if (!magnitude) {
            throw new Error(`Both magniture and direction of a vector must be provided!`);
        }

        this.setDirection(+direction);
        this.magnitude = +magnitude;
        this.buildVectorComponents();
    }

    setDirection(direction) {
        if (direction <= 360 && direction >= 0) {
            this.direction = direction;
        } else {
            throw new Error(`The direction of a vector ought to be between 0 and 360 degrees. 
                The provided value is ${direction}`);
        }
    }

    buildVectorComponents() {
        const {magnitude, direction} = this;
        
        if (direction % 90 === 0) {
           this.setHorOrVertComponent();
        } else {
            const opposite = magnitude * sineFromDegrees(direction);
            const adjacent = magnitude * cosineFromDegrees(direction);
        
            this.componentY = +opposite.toFixed(PRECISION);
            this.componentX = +adjacent.toFixed(PRECISION);
        }
        
    }

    setHorOrVertComponent() {
        const {magnitude, direction} = this;

        switch(direction / 90) {
            case 0:
            case 4:
                this.componentX = magnitude;
                break;
            case 1:
                this.componentY = magnitude;
                break;
            case 2:
                this.componentX = -magnitude;
                break;
            case 3:
                this.componentY = -magnitude;
        }

        this.componentX = this.componentX || 0;
        this.componentY = this.componentY || 0;
    }

}