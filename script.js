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

    /* ---------- WHATSAPP BUTTON ---------- */

    const whatsappButton = document.createElement("a");

    whatsappButton.href = "https://wa.me/2349061492981";
    whatsappButton.target = "_blank";
    whatsappButton.className = "whatsapp-button";
    whatsappButton.textContent = "Contact HALIB via WhatsApp";

    document.body.appendChild(whatsappButton);

});


// =================================
// HALIB SUPABASE CONTACT FORM
// =================================

const SUPABASE_URL = " https://psaasimqjdofsjxmdshu.supabase.co";
const SUPABASE_KEY = " sb_publishable_USxx5dHYI3C-S4Ia0vZQVQ_a4-kCNa2";

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formStatus = document.getElementById("formStatus");
        const submitButton = contactForm.querySelector('button[type="submit"]');

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            service: document.getElementById("service").value,
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        formStatus.textContent = "Sending your message...";
        submitButton.disabled = true;

        try {

            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/enquiries`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`,
                        "Prefer": "return=minimal"
                    },

                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }

            formStatus.textContent = "Your message has been sent successfully!";

            contactForm.reset();

        } catch (error) {

            console.error("HALIB submission error:", error);

            formStatus.textContent =
                "Unable to send your message. Please try again.";

        } finally {

            submitButton.disabled = false;

        }

    });

}
