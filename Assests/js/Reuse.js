// Load Header
fetch("FilesReuse/header.html")
    .then(res => res.text())
    .then(data => {
        const header = document.getElementById("header");
        if (!header) return;

        header.innerHTML = data;
    });

// Load Footer
fetch("FilesReuse/footer.html")
    .then(res => res.text())
    .then(data => {
        const footer = document.getElementById("footer");
        if (!footer) return;

        footer.innerHTML = data;
    });

// Mobile Menu Toggle
document.addEventListener("click", function (e) {
    const button = e.target.closest("#mobile-menu-button");

    if (button) {
        const menu = document.getElementById("mobile-menu");
        if (!menu) return;

        menu.classList.toggle("hidden");
    }
});
