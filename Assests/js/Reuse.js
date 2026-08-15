function initMobileMenu() {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");

    if (!button || !menu) return;

    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const isHidden = menu.classList.toggle("hidden");
        button.setAttribute("aria-expanded", String(!isHidden));
    });
}

// Load Header
fetch("FilesReuse/header.html")
    .then(res => res.text())
    .then(data => {
        const header = document.getElementById("header");
        if (!header) return;

        header.innerHTML = data;
        initMobileMenu();
    });

// Load Footer
fetch("FilesReuse/footer.html")
    .then(res => res.text())
    .then(data => {
        const footer = document.getElementById("footer");
        if (!footer) return;

        footer.innerHTML = data;
    });

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
} else {
    initMobileMenu();
}
