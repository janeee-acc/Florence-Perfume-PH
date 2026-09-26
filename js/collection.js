const categoryButtons = document.querySelectorAll(".category");
const productCards = document.querySelectorAll(".product-card");


function filterProducts(selectedCategory) {

    productCards.forEach((card) => {

        if (card.dataset.category === selectedCategory) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

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


// =========================================================
// DEFAULT CATEGORY
// Show Unisex when the Collection page first loads
// =========================================================

filterProducts("unisex");