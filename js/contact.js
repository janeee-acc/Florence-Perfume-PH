/* =========================================================
   FLORENCE PERFUME PH
   CONTACT PAGE
========================================================= */

const contactForm = document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please complete all fields.");

            return;

        }


        /*
            BACKEND CONNECTION WILL BE ADDED LATER.

            For now, this confirms that the form
            is working correctly.
        */

        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    });

}