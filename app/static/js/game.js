import rules from './rules.js';

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('enter-password');
    const submitBtn = document.getElementById('submit-btn');
    const rulesContainer = document.getElementById('rules-container');

    console.log("Password Game loaded");
    console.log("Textarea:", textarea);
    console.log("Submit button:", submitBtn);
    console.log("Rules container:", rulesContainer);
    console.log("Rules loaded:", rules);

    function renderRules(password) {
        rulesContainer.innerHTML = "";
        let allPassed = true;

        rules.forEach((rule, index) => {
            const passed = rule.validate(password);
            const ruleDiv = document.createElement('div');
            console.log(rule.str());
            ruleDiv.className = 'd-block my-3 container-sm text-center p-3';
            ruleDiv.style.backgroundColor = passed ? 'lightgreen' : 'lightcoral';
            ruleDiv.style.borderRadius = '5px';
            ruleDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            
            ruleDiv.innerHTML = `<h3>Rule ${index + 1}: ${rule.str}</h3>`;
            
            rulesContainer.appendChild(ruleDiv);
            
            if (!passed) {
                allPassed = false;
            }
        });

        submitBtn.disabled = !allPassed;
    }

    textarea.addEventListener('input', () => {
        renderRules(textarea.value);
    });

    renderRules('');
});