document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SCROLL REVEAL
    // =========================

    const revealItems = document.querySelectorAll(
        ".journey-item, .letter-card, .last-letter, .final-message, .final-photo, .last-words, .the-end"
    );

    revealItems.forEach(item => {
        item.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(item => observer.observe(item));


    // =========================
    // BACK TO TOP
    // =========================

    const backTop = document.createElement("button");

    backTop.className = "back-top";
    backTop.innerHTML = "↑";
    backTop.setAttribute("aria-label", "Kembali ke atas");

    document.body.appendChild(backTop);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backTop.classList.add("visible");
        } else {
            backTop.classList.remove("visible");
        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =========================
    // PAGE TRANSITION
    // =========================

    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        link.addEventListener("click", event => {

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 250);

        });

    });

});