const categoryButtons = document.querySelectorAll(".category");
const productCards = document.querySelectorAll(".product-card");


function filterProducts(selectedCategory) {

    productCards.forEach((card) => {

        card.classList.toggle(
            "hidden",
            card.dataset.category !== selectedCategory
        );

    });

}


categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.category;


        // Change active button

        categoryButtons.forEach((item) => {

            item.classList.remove("active");

        });

        button.classList.add("active");


        // Filter products

        filterProducts(selectedCategory);

    });

});


// Default category
// Show Unisex when the Collection page first loads

filterProducts("unisex");