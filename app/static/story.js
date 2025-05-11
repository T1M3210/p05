document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('obstacle-btn');

  let escapeCount = 0;
  const maxEscapes = 5;
  
  btn.addEventListener('mouseover', () => {
    if (escapeCount < maxEscapes) {
      const x = Math.floor(Math.random() * (window.innerWidth - 100));
      const y = Math.floor(Math.random() * (window.innerHeight - 100));
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
      escapeCount++;
    }
  });
  

  btn.addEventListener('click', () => {
    alert('You win! Proceeding to the next page...');
    window.location.href = "/story2";  // Add next page later
  });
});
