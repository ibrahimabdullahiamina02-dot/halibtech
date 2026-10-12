/* =========================================
   HALIB WEBSITE JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {

    console.log("HALIB Tech & Media Group website loaded.");


    /* ---------- CURRENT YEAR ---------- */

    const yearElements = document.querySelectorAll(".current-year");

    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });


    /* ---------- SMOOTH INTERNAL LINKS ---------- */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});