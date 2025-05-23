import Rule from './Rule.js';

function getToday() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

const rulesList = window.rules.map(r => new Rule(r.str, r.condition));

const rulesDiv = document.getElementById('rules-list');
rulesDiv.innerHTML = '';
rulesList.forEach((rule, i) => {
    const div = document.createElement('div');
    div.id = "rule";
    div.className = 'd-block my-3 container-sm text-center rule-box';
    div.style.backgroundColor = 'lightcoral';
    div.style.borderRadius = '8px';
    div.innerHTML = `<h3>${rule.str}</h3>`;
    div.dataset.ruleIndex = i;
    rulesDiv.appendChild(div);
});

const textarea = document.getElementById('enter-password');
const form = textarea.closest('form');
const submitBtn = form.querySelector('input[type=submit]');
submitBtn.style.display = 'none';

textarea.addEventListener('input', () => {
    const value = textarea.value;
    let allPassed = true;
    rulesList.forEach((rule, i) => {
        const valid = rule.validate(value, { today: getToday() });
        const div = rulesDiv.querySelector(`.rule-box[data-rule-index="${i}"]`);
        div.style.backgroundColor = valid ? 'lightgreen' : 'lightcoral';
        allPassed = allPassed && valid;
    });
    submitBtn.style.display = allPassed ? '' : 'none';
});
