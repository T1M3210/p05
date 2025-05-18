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
  
  // captcha
  btn.addEventListener('click', () => {
  alert('You win! Verifying human…');
  setTimeout(showCaptcha, 300);
});

/* non captcha
  btn.addEventListener('click', () => {
    alert('You win! Proceeding to the next page...');
    window.location.href = "/story2";  // Add next page later
  });
*/

function showCaptcha() {
    // Create overlay
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0", left: "0", width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: "1000"
    });

    // CAPTCHA box
    const box = document.createElement("div");
    Object.assign(box.style, {
      background: "#fff", padding: "20px 30px",
      borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      textAlign: "center"
    });

    const text = document.createElement("p");
    text.textContent = "Please verify you’re human:";
    text.style.marginBottom = "15px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "captcha-check";
    checkbox.style.transform = "scale(1.5)";
    checkbox.style.cursor = "pointer";

    const label = document.createElement("label");
    label.htmlFor = "captcha-check";
    label.textContent = " I’m not a robot";
    label.style.marginLeft = "8px";
    label.style.fontSize = "1.1rem";
    label.style.cursor = "pointer";

    const verifyBtn = document.createElement("button");
    verifyBtn.textContent = "Verify";
    verifyBtn.style.marginTop = "20px";
    verifyBtn.style.display = "block";
    verifyBtn.style.marginLeft = "auto";
    verifyBtn.style.marginRight = "auto";
    verifyBtn.style.padding = "10px 20px";
    verifyBtn.style.border = "none";
    verifyBtn.style.borderRadius = "5px";
    verifyBtn.style.backgroundColor = "#007bff";
    verifyBtn.style.color = "#fff";
    verifyBtn.style.cursor = "pointer";

    verifyBtn.addEventListener('click', () => {
      const response = prompt("Prove you're human by typing the first 20 digits of pi");

      if (response === "3.14159265358979323846") {
        alert("Only AI would know what the first 20 digits are! Gottem");
        
      } else {
        alert("Failed like a true human! You're in.");
        window.location.href = "/story2";  // Replace with actual next page
      }
    });

    box.append(text, checkbox, label, verifyBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }
});
