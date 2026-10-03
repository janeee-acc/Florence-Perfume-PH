/* =========================================================
   FLORENCE PERFUME PH
   COLLECTION FILTER + SEARCH
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const categoryButtons =
    document.querySelectorAll(".category");

const productCards =
    document.querySelectorAll(".product-card");


/* =========================================================
   FILTER BY CATEGORY
========================================================= */

function filterProducts(selectedCategory) {

    productCards.forEach((card) => {

        const category =
            card.dataset.category;

        card.classList.toggle(
            "hidden",
            category !== selectedCategory
        );

    });

}


/* =========================================================
   SEARCH PRODUCTS
========================================================= */

function searchProducts(searchTerm) {

    const term =
        searchTerm.toLowerCase().trim();

    let foundProducts = 0;


    productCards.forEach((card) => {

        /* Get product name from image alt text */

        const image =
            card.querySelector("img");

        const productName =
            image
                ? image.alt.toLowerCase()
                : "";


        const category =
            card.dataset.category.toLowerCase();


        /*
            Check product name.
            Example:
            "cloud" → A Cloud
            "wood" → Wood Sages / Santal Woody
        */

        const matchesProduct =
            productName.includes(term);


        /*
            Check category.
            Use exact matching so
            "men" does not match "women".
        */

        const matchesCategory =
            term === category;


        const matches =
            matchesProduct ||
            matchesCategory;


        if (matches) {

            card.classList.remove("hidden");

            foundProducts++;

        } else {

            card.classList.add("hidden");

        }

    });


    return foundProducts;

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

categoryButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedCategory =
                button.dataset.category;


            /* Update active button */

            categoryButtons.forEach(
                (item) => {
                    item.classList.remove("active");
                }
            );


            button.classList.add("active");


            /* Remove search from URL */

            const url =
                new URL(window.location.href);

            url.searchParams.delete("search");

            window.history.replaceState(
                {},
                "",
                url
            );


            /* Remove no-results message */

            const oldMessage =
                document.querySelector(
                    ".no-results"
                );

            if (oldMessage) {
                oldMessage.remove();
            }


            /* Show selected category */

            filterProducts(
                selectedCategory
            );

        }
    );

});


/* =========================================================
   READ SEARCH FROM URL
========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const searchTerm =
    urlParams.get("search");


if (searchTerm) {

    /*
        Remove active state because
        we are showing search results.
    */

    categoryButtons.forEach(
        (button) => {
            button.classList.remove("active");
        }
    );


    const foundProducts =
        searchProducts(searchTerm);


    /* =====================================================
       NO RESULTS
    ===================================================== */

    if (foundProducts === 0) {

        const productGrid =
            document.querySelector(
                ".products-grid"
            );


        if (productGrid) {

            const message =
                document.createElement("p");

            message.className =
                "no-results";

            message.textContent =
                `No fragrances found for "${searchTerm}".`;

            productGrid.appendChild(
                message
            );

        }

    }

} else {

    /*
        Default category:
        Show Unisex when Collection
        first loads.
    */

    filterProducts("unisex");

}