import Rule from './Rule.js';

document.addEventListener('DOMContentLoaded', () => {
  const rules = window.rules.map(r => new Rule(r.str, r.condition));
  const rulesDiv = document.getElementById('rules-list');
  const textarea = document.getElementById('enter-password');
  const submitBtn = document.querySelector('input[type=submit]');
  submitBtn.style.display = 'none';

  let turtleIndex = 0;
  let turtleActive = false;
  const turtleEmoji = '🐢';
  let turtleInterval = null;

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

  ruleElements[0].classList.remove('hidden');

  textarea.addEventListener('input', () => {
    const val = textarea.value.replace(turtleEmoji, ''); 
    let allPassed = true;

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const div = ruleElements[i];

      const passed = rule.validate(val, { today: getToday() });
      div.style.backgroundColor = passed ? 'lightgreen' : 'lightcoral';

      if (!passed) {
        for (let j = i + 1; j < ruleElements.length; j++) {
          ruleElements[j].classList.add('hidden');
        }
        allPassed = false;
        break;
      } else {
        if (i + 1 < ruleElements.length) {
          ruleElements[i + 1].classList.remove('hidden');
        }
      }
    }

    submitBtn.style.display = allPassed ? '' : 'none';

    const firstTwoPassed = rules[0].pass && rules[1].pass;

    if (firstTwoPassed && !turtleActive) {
      turtleActive = true;
      turtleIndex = 0;
      textarea.value = turtleEmoji + val;

      turtleInterval = setInterval(() => {
        let currentVal = textarea.value.replace(turtleEmoji, '');
        turtleIndex++;

        if (turtleIndex > currentVal.length) {
          clearInterval(turtleInterval);
          alert('The turtle reached the end! You lose.');
          location.reload();
          return;
        }

        const before = currentVal.slice(0, turtleIndex);
        const after = currentVal.slice(turtleIndex);
        textarea.value = before + turtleEmoji + after;
      }, 3000); 
    }
  });

  textarea.addEventListener('keydown', (e) => {
    const pos = textarea.selectionStart;
    if (turtleActive && pos === turtleIndex) {
      e.preventDefault();
    }
  });
});
