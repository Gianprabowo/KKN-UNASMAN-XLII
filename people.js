const personCards = document.querySelectorAll(".person-card");
const modal = document.getElementById("personModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalNumber = document.getElementById("modalNumber");
const modalName = document.getElementById("modalName");
const modalMajor = document.getElementById("modalMajor");
const modalRole = document.getElementById("modalRole");
const modalQuote = document.getElementById("modalQuote");
const modalMemory = document.getElementById("modalMemory");

/* =========================================
   OPEN PERSON
========================================= */
function openPerson(card) {
    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.name;
    modalNumber.textContent =
        String(Number(card.dataset.index) + 1)
        .padStart(2, "0");
    modalName.textContent =
        card.dataset.name;
    modalMajor.textContent =
        card.dataset.major;
    modalRole.textContent =
        card.dataset.role;
    modalQuote.textContent =
        card.dataset.quote;
    modalMemory.textContent =
        card.dataset.memory;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

/* =========================================
   CLOSE
========================================= */

function closePerson() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

/* =========================================
   CARD CLICK
========================================= */
personCards.forEach(card => {
    card.addEventListener("click", () => {
        openPerson(card);
    });
});

/* =========================================
   CLOSE BUTTON
========================================= */
modalClose.addEventListener(
    "click",
    closePerson
);

/* =========================================
   CLICK OUTSIDE
========================================= */
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closePerson();
    }
});
/* =========================================
   ESCAPE
========================================= */
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {
        closePerson();
    }
});