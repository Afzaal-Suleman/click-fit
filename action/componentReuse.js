function loadComponent(id, path, callback) {
    fetch(path)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error(err));
}

loadComponent("loadingScreen", "components/loadingScreen.html", function() {
    setTimeout(() => {
        $('#loadingScreen').fadeOut(500, function() {
            $(this).remove();
            $('#mainContent').fadeIn(500);
        });
    }, 2000);
});

loadComponent("navbar", "components/navbar.html");
loadComponent("hero", "components/hero.html");
loadComponent("equipment", "components/equipment.html");
loadComponent("progressImage", "components/progressImage.html");
loadComponent("footer", "components/footer.html");
