import Rule from "./Rule.js";

const rules = [
    new Rule(
        "Your password must have a number",
        (input) => /\d/.test(input)
    ),
    new Rule(
        "Your password must contain an emoji",
        (input) => /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(input)
    ),
    new Rule(
        "Your password must include avogadro's number (Use * and ^ or e, 2 decimal places)",
        (input) => /(6\.02\*10\^23|6\.02e23)/.test(input)
    ),
    new Rule(
        "The digits in your password must add up to 79",
        (input) => {
            const digits = input.match(/\d/g) || [];
            const sum = digits.reduce((sum, digit) => sum + parseInt(digit), 0);
            return sum === 79;
        }
    ),
    new Rule(
        "Your password must contain today's date (YYYY-MM-DD)",
        (input) => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}-${mm}-${dd}`;
            return input.includes(dateStr);
        }
    )
];

export default rules;