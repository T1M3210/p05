import Rule from './Rule.js';

document.addEventListener('DOMContentLoaded', () => {
  const rules = window.rules.map(r => new Rule(r.str, r.condition));
  const rulesDiv = document.getElementById('rules-list');
  const textarea = document.getElementById('enter-password');
  const submitBtn = document.querySelector('input[type=submit]');
  submitBtn.style.display = 'none';

function getToday() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

  const ruleElements = rules.map((rule, index) => {
    const div = document.createElement('div');
    div.className = 'rule-box my-3 container-sm text-center hidden';
    div.style.backgroundColor = 'lightcoral';
    div.style.borderRadius = '8px';
    div.style.padding = '10px';
    div.innerHTML = `<h3>${rule.str}</h3>`;
    div.id = `rule-${index}`;
    rulesDiv.appendChild(div);
    return div;
  });

  // Show only the first rule to start
  ruleElements[0].classList.remove('hidden');

  textarea.addEventListener('input', () => {
    const val = textarea.value;
    let allPassed = true;

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const div = ruleElements[i];

      const passed = rule.validate(val, { today: getToday() });
      div.style.backgroundColor = passed ? 'lightgreen' : 'lightcoral';

      if (!passed) {
        // Hide all rules after this one
        for (let j = i + 1; j < ruleElements.length; j++) {
          ruleElements[j].classList.add('hidden');
        }
        allPassed = false;
        break;
      } else {
        // Show the next rule
        if (i + 1 < ruleElements.length) {
          ruleElements[i + 1].classList.remove('hidden');
        }
      }
    }

    submitBtn.style.display = allPassed ? '' : 'none';
  });
});
