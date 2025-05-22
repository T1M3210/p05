import rules from '../rules.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('enter-password');
    const submitBtn = document.getElementById('submit-btn');
    const rulesContainer = document.getElementById('rules-container');

    function renderRules(password) {
        rulesContainer.innerHTML = "";
        let allPassed = true;

        rules.forEach((rule, index) => {
            const passed = rule.validate(password);
            const ruleDiv = document.createElement('div');
            ruleDiv.className = 'd-block my-3 container-sm text-center p-3';
            ruleDiv.style.backgroundColor = passed ? 'lightgreen' : 'lightcoral';
            ruleDiv.style.borderRadius = '5px';
            ruleDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            ruleDiv.innerHTML = `<h3>Rule ${index + 1}: ${rule.str}</h3>`;
            rulesContainer.appendChild(ruleDiv);
            if (!passed) allPassed = false;
        });

        submitBtn.disabled = !allPassed;
        submitBtn.style.display = allPassed ? 'inline-block' : 'none';
    }

    textarea.addEventListener('input', () => {
        renderRules(textarea.value);
        // Auto resize
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    });

    renderRules('');
});