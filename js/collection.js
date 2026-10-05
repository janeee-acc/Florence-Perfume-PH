// COLLECTION FILTER + SEARCH



// ELEMENTS
// Gets the category buttons and product cards.

const categoryButtons =
    document.querySelectorAll(".category");

const productCards =
    document.querySelectorAll(".product-card");







// FILTER BY CATEGORY
// Shows products that belong to the selected category.

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







// SEARCH PRODUCTS
// Finds products by name or category.

function searchProducts(searchTerm) {

    const term =
        searchTerm.toLowerCase().trim();

    let foundProducts = 0;


    productCards.forEach((card) => {


        // Get product name from image alt text.

        const image =
            card.querySelector("img");

        const productName =
            image
                ? image.alt.toLowerCase()
                : "";


        const category =
            card.dataset.category.toLowerCase();


        // Check if the product name contains the search term.
        // Example: "cloud" can find "A Cloud".

        const matchesProduct =
            productName.includes(term);


        // Check if the search term exactly matches a category.
        // This prevents "men" from matching "women".

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







// CATEGORY BUTTONS
// Changes the displayed products when a category is clicked.

categoryButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedCategory =
                button.dataset.category;


            // Update the active category button.

            categoryButtons.forEach(
                (item) => {
                    item.classList.remove("active");
                }
            );


            button.classList.add("active");


            // Remove the search term from the URL.

            const url =
                new URL(window.location.href);

            url.searchParams.delete("search");

            window.history.replaceState(
                {},
                "",
                url
            );


            // Remove the no-results message.

            const oldMessage =
                document.querySelector(
                    ".no-results"
                );

            if (oldMessage) {
                oldMessage.remove();
            }


            // Show products from the selected category.

            filterProducts(
                selectedCategory
            );

        }
    );

});







// READ SEARCH FROM URL
// Gets the search term sent from the navigation search box.

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const searchTerm =
    urlParams.get("search");


if (searchTerm) {


    // Remove the active category
    // because search results are being displayed.

    categoryButtons.forEach(
        (button) => {
            button.classList.remove("active");
        }
    );


    const foundProducts =
        searchProducts(searchTerm);







    // NO RESULTS
    // Shows a message when no product matches the search.

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


    // DEFAULT CATEGORY
    // Shows Unisex products when the Collection page first loads.

    filterProducts("unisex");

}