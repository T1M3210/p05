//Write rule class
export default class Rule{
    constructor(str){
        this.str = str;
        this.pass = false;
    }
export default class Rule {
    constructor(str, condition) {
        this.str = str; // text for rule
        this.condition = condition; 
        this.pass = false; 
    }

    validate(input) {
        this.pass = this.condition(input);
        return this.pass;
    }
}