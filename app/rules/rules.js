import Rule from "./Rule";

const rules = [
    new Rule(
        "Your password must have a number",
        (input) => /\d/.test(input)
    ),
];

export default rules;