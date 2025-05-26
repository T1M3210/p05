export default class Rule {
    constructor(str, condition) {
        this.str = str;
        if (typeof condition === 'string' && condition.startsWith('/')) {
            const match = condition.match(/^\/(.+)\/([gimsuy]*)$/);
            if (match) {
                this.condition = (input) => new RegExp(match[1], match[2]).test(input);
            } else {
                throw new Error('Invalid regex: ' + condition);
            }
        } else if (typeof condition === 'function') {
            this.condition = condition;
        } else {
            this.condition = condition;
        }
        this.pass = false;
    }

    validate(input, helpers = {}) {
        if (typeof this.condition === 'function') {
            this.pass = this.condition(input);
        } else if (typeof this.condition === 'string') {
            if (this.condition === 'sumDigits == 79') {
                const sum = input.split('').reduce((acc, c) => acc + (/\d/.test(c) ? +c : 0), 0);
                this.pass = (sum === 79);
            } else if (this.condition === 'includesTodayDate') {
                this.pass = input.includes(helpers.today);
            } else {
                this.pass = false;
            }
        } else {
            this.pass = false;
        }
        return this.pass;
    }
}