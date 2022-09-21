class convert {
    constructor(expression) {
        this.expression = expression.replace(/\s{2,}/g, ' ').trim().split(' ')
    }

    // conversion steps
    appendSeccondExpression() {
        if (this.expression.length === 5) {
            this.expression = ['0'].concat(this.expression);
        }
    }
    convertAsterisksToRanges() {
        this.expression[0] = this.convertAsterisk(this.expression[0], '0-59');
        this.expression[1] = this.convertAsterisk(this.expression[1], '0-59');
        this.expression[2] = this.convertAsterisk(this.expression[2], '0-23');
        this.expression[3] = this.convertAsterisk(this.expression[3], '1-31');
        this.expression[4] = this.convertAsterisk(this.expression[4], '1-12');
        this.expression[5] = this.convertAsterisk(this.expression[5], '0-6');
    }
    convertRanges() {
        for (let i = 0; i < this.expression.length; i++) {
            this.expression[i] = this.convertRange(this.expression[i]);
        }
    }
    convertSteps() {
        const stepValuePattern = /^(.+)\/(\w+)$/;
        for (let i = 0; i < this.expression.length; i++) {
            const match = stepValuePattern.exec(this.expression[i]);
            const isStepValue = match !== null && match.length > 0;
            if (isStepValue) {
                const baseDivider = match[2];
                if (isNaN(baseDivider)) {
                    throw baseDivider + ' is not a valid step value';
                }
                const values = match[1].split(',');
                let stepValues = [];
                const divider = parseInt(baseDivider, 10);
                for (let j = 0; j <= values.length; j++) {
                    let value = parseInt(values[j], 10);
                    if (value % divider === 0) {
                        stepValues.push(value);
                    }
                }
                this.expression[i] = stepValues.join(',');
            }
        }
    }
    normalizeIntegers() {
        for (let i = 0; i < this.expression.length; i++) {
            const numbers = this.expression[i].split(',');
            for (let j = 0; j < numbers.length; j++) {
                numbers[j] = parseInt(numbers[j]);
            }
            this.expression[i] = numbers;
        }
    }

    // conversion tools
    convertAsterisk(expression, replecement) {
        if (expression.indexOf('*') !== -1) {
            return expression.replace('*', replecement);
        }
        return expression;
    }
    
    replaceWithRange(expression, text, init, end) {
        const numbers = [];
        let last = parseInt(end);
        let first = parseInt(init);
    
        if (first > last) {
            last = parseInt(init);
            first = parseInt(end);
        }
    
        for (let i = first; i <= last; i++) {
            numbers.push(i);
        }
    
        return expression.replace(new RegExp(text, 'i'), numbers.join());
    }
    
    convertRange(expression) {
        const rangeRegEx = /(\d+)-(\d+)/;
        let match = rangeRegEx.exec(expression);
        while (match !== null && match.length > 0) {
            expression = this.replaceWithRange(expression, match[0], match[1], match[2]);
            match = rangeRegEx.exec(expression);
        }
        return expression;
    }
}

export default function interprete(expression) {
    const converter = new convert(expression)

    converter.appendSeccondExpression();
    converter.convertAsterisksToRanges();
    converter.convertRanges();
    converter.convertSteps();
    converter.normalizeIntegers();

    return converter.expression.join(' ');
}