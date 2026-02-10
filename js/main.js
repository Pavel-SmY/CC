// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('mainNav');

    if (burger && nav) {
        burger.addEventListener('click', function () {
            nav.classList.toggle('nav--open');
            burger.classList.toggle('burger--active');
        });

        // Close nav when clicking a link
        nav.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('nav--open');
                burger.classList.remove('burger--active');
            });
        });
    }

    // Sticky header shadow on scroll
    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,.06)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
});
