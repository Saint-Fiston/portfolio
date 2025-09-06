import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Modal code
  const skillNames = document.querySelectorAll('.skill-name');
  skillNames.forEach(skill => {
    skill.addEventListener('click', () => {
      const aboutSkill = skill.querySelector('.about-skill').innerHTML;
      showModal(aboutSkill);
    });
  });

  function showModal(content) {
    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <span class="close-modal">&times;</span>
        <div class="modal-content">${content}</div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').onclick = () => {
      modal.remove();
    };

    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }

  // Typewriter code
  const texts = [
    document.querySelector(".text1"),
    document.querySelector(".text2"),
    document.querySelector(".text3")
  ];

  const originalTexts = texts.map(el => el.textContent);
  const speed = 120;

  function typeText(index = 0, charIndex = 0) {
    if (index >= texts.length) return;
    texts[index].textContent = originalTexts[index].slice(0, charIndex);
    if (charIndex < originalTexts[index].length) {
      setTimeout(() => typeText(index, charIndex + 1), speed);
    } else {
      setTimeout(() => typeText(index + 1, 0), speed * 2);
    }
  }

  texts.forEach(el => el.textContent = ""); // Clear all texts
  typeText();
});

function scrollDown() {
    window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // Pre-saved answers
  const expectedAnswers = [
    `def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False`,
    `body {
    background-color: lightblue;
    font-family: Arial, sans-serif;
}`,
    `SELECT first_name, last_name
FROM users
WHERE country = 'South Africa';`,
    `function checkNumber(num) {
    if (num === 10) {
        return "It's ten!";
    } else {
        return "It's not ten.";
    }
}`,
    `function WelcomeComponent() {
    return (
        <>
            <h1>Hello World</h1>
            <p>Welcome to the app.</p>
        </>
    );
}`
    
  ];

  document.querySelectorAll(".in-card").forEach((card) => {
    const editBtn = card.querySelector(".edit-btn");
    const runBtn = card.querySelector(".run-btn");
    const codeEditor = card.querySelector(".code-editor");
    const feedback = card.querySelector(".feedback");
    const cardId = parseInt(card.dataset.id); // link to expectedAnswers
    let textarea = null;

    // Edit
    editBtn.addEventListener("click", () => {
      const codeBlock = codeEditor.querySelector("code");
      if (!textarea) {
        textarea = document.createElement("textarea");
        textarea.value = codeBlock.textContent;
        textarea.classList.add("code-input");
        codeEditor.innerHTML = "";
        codeEditor.appendChild(textarea);
        textarea.focus();
      }
    });

    // Run
    runBtn.addEventListener("click", () => {
      if (textarea) {
        const newCode = textarea.value.trim();

        // Restore pre/code
        const newPre = document.createElement("pre");
        const newCodeTag = document.createElement("code");
        newCodeTag.textContent = newCode;
        newPre.appendChild(newCodeTag);
        codeEditor.innerHTML = "";
        codeEditor.appendChild(newPre);
        textarea = null;

        const expected = expectedAnswers[cardId];
        if (!expected) {
          feedback.textContent = "⚠️ No expected answer found for this card.";
          return;
        }

        if (newCode === expected.trim()) {
          feedback.textContent = "✅ Ran Succesfully";
          card.classList.add("correct");
          card.classList.remove("incorrect");
        } else {
          feedback.textContent = "❌ Error in Code.";
          card.classList.add("incorrect");
          card.classList.remove("correct");
        }
      }
    });
  });
});
