/* ---------------- AUDIO ---------------- */
const popSound = document.getElementById("popSound");

/* ---------------- PAGE LOGIC ---------------- */
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const finalName = document.getElementById("finalName");
const nameInput = document.getElementById("nameInput");

/* ---------------- COLORS ---------------- */
function glitterColors(){
  return ["#ff6ec7","#c77dff","#7bdff2","#ffd166","#a0c4ff","#ffc8dd"];
}

/* ---------------- CURSOR GLITTER ---------------- */
document.addEventListener("mousemove",(e)=>{
  confetti({
    particleCount:3,
    startVelocity:6,
    spread:360,
    gravity:0.25,
    ticks:50,
    origin:{x:e.clientX/window.innerWidth, y:e.clientY/window.innerHeight},
    colors:glitterColors()
  });
});

/* ---------------- ONE-TIME BACKGROUND CONFETTI ---------------- */
window.addEventListener("load", () => {
  const colors = glitterColors();
  confetti({
    particleCount: 600,
    spread: 180,
    origin: { x: 0.5, y: 0 },
    colors: colors,
    gravity:2,
    scalar: 1.2
  });

  // Show step1
  step1.style.display = "flex";
});

/* ---------------- GO NEXT ---------------- */
function goNext(){
  if(!nameInput.value.trim()){alert("Enter your name first 🎉"); return;}
  
  step1.style.display="none";
  step2.style.display="flex";
  finalName.textContent = nameInput.value;

  // Play pop sound once
  popSound.currentTime=0;
  popSound.play().catch(()=>{});

  // Small corner party popper bursts
  confetti({particleCount:200, angle:60, spread:80, startVelocity:70, origin:{x:0,y:1}, colors:glitterColors()});
  confetti({particleCount:200, angle:120, spread:80, startVelocity:70, origin:{x:1,y:1}, colors:glitterColors()});

  // --- GLITTER RAIN starts ONLY after next page ---
  const end = Date.now() + 15000;
  (function rain(){
    confetti({
      particleCount:16,
      spread:140,
      gravity:0.4,
      origin:{x:Math.random(), y:-0.1},
      colors:glitterColors()
    });
    if(Date.now()<end) requestAnimationFrame(rain);
  })();

  // Fade-in message box with confetti burst
  const msgBox = document.getElementById("msgBox");
  setTimeout(() => {
    msgBox.classList.add("show");

    // Confetti around message box
    const rect = msgBox.getBoundingClientRect();
    confetti({
      particleCount:50,
      spread:70,
      startVelocity:50,
      origin:{
        x: (rect.left + rect.width/2)/window.innerWidth,
        y: (rect.top + rect.height/2)/window.innerHeight
      },
      colors: glitterColors()
    });
  }, 400); // delay so greeting appears first

  // ---------------- GIFT BOX for specific names ----------------
  const giftNames = ["shloka", "vihan"]; // add more names here
  const enteredName = nameInput.value.trim().toLowerCase();

  if(giftNames.includes(enteredName)) {
    const gift = document.createElement("div");
    gift.id = "giftBox";
    gift.title = "Click me! 🎁";
    document.body.appendChild(gift);

    const modal = document.getElementById("giftModal");
    const closeBtn = document.getElementById("closeModal");

    gift.addEventListener("click", () => {
        modal.style.display = "block"; // show modal
        // Customize message per name
        modal.querySelector("p").textContent = `! 😌 Hope u had a great time in "INDIA" 😌 !`
        `!! VIST AGAIN 🙏 !! `;
    });

    // Close modal when X is clicked
    closeBtn.addEventListener("click", () => modal.style.display = "none");

    // Close modal if clicked outside the modal-content
    window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display="none"; });
  }
}
