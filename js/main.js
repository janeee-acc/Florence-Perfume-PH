// MAIN JAVASCRIPT

// FEATURED FLORENCE SCENTS CAROUSEL

const bestSellerViewport =
    document.querySelector(".best-seller-viewport");

const bestSellerTrack =
    document.getElementById("bestSellerTrack");

const bestSellerItems =
    Array.from(
        document.querySelectorAll(".best-seller-item")
    );

const bestSellerDots =
    document.querySelectorAll(
        "#bestSellerDots .dot"
    );


if (
    bestSellerViewport &&
    bestSellerTrack &&
    bestSellerItems.length > 0
) {

    let singleSetWidth = 0;
    let carouselReady = false;
    let resizeTimer;


    // CREATE CAROUSEL COPIES
    // Creates one copy before and after the original products.

    const originalItems =
        bestSellerItems.map((item) =>
            item.cloneNode(true)
        );


    const beforeFragment =
        document.createDocumentFragment();

    originalItems
        .slice()
        .reverse()
        .forEach((item) => {

            beforeFragment.appendChild(item);

        });


    bestSellerTrack.insertBefore(
        beforeFragment,
        bestSellerTrack.firstChild
    );


    const afterFragment =
        document.createDocumentFragment();

    originalItems.forEach((item) => {

        afterFragment.appendChild(item);

    });


    bestSellerTrack.appendChild(
        afterFragment
    );


    // CALCULATE CAROUSEL WIDTH
    // One complete set is the width of all original products.

    function calculateBestSellerWidth() {

        if (
            bestSellerTrack.scrollWidth === 0
        ) {

            return;

        }


        singleSetWidth =
            bestSellerTrack.scrollWidth / 3;

    }


    // SET INITIAL POSITION
    // Starts on the middle copy of the products.

    function initializeBestSeller() {

        calculateBestSellerWidth();


        if (
            singleSetWidth <= 0
        ) {

            return;

        }


        carouselReady = false;


        bestSellerViewport.scrollLeft =
            singleSetWidth;


        carouselReady = true;


        updateBestSellerDots();

    }


    // UPDATE DOTS
    // Six products are represented by three indicators.

    function updateBestSellerDots() {

        if (
            bestSellerDots.length === 0 ||
            singleSetWidth <= 0
        ) {

            return;

        }


        const positionInsideSet =
            (
                bestSellerViewport.scrollLeft -
                singleSetWidth
            );


        const itemWidth =
            singleSetWidth /
            bestSellerItems.length;


        let currentProduct =
            Math.round(
                positionInsideSet /
                itemWidth
            );


        currentProduct =
            (
                currentProduct %
                bestSellerItems.length +
                bestSellerItems.length
            ) %
            bestSellerItems.length;


        const activeDot =
            Math.floor(
                currentProduct / 2
            );


        bestSellerDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === activeDot
                );

            }
        );

    }


    // INFINITE SWIPE
    // Moves the carousel back to the middle copy when needed.

    bestSellerViewport.addEventListener(
        "scroll",
        function () {

            if (
                !carouselReady ||
                singleSetWidth <= 0
            ) {

                return;

            }


            if (
                bestSellerViewport.scrollLeft >=
                singleSetWidth * 2
            ) {

                carouselReady = false;


                bestSellerViewport.scrollLeft -=
                    singleSetWidth;


                carouselReady = true;

            }


            else if (
                bestSellerViewport.scrollLeft <= 0
            ) {

                carouselReady = false;


                bestSellerViewport.scrollLeft +=
                    singleSetWidth;


                carouselReady = true;

            }


            updateBestSellerDots();

        }
    );


    // INITIALIZE AFTER PAGE LOAD

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                initializeBestSeller,
                100
            );

        }
    );


    // HANDLE RESIZE
    // Recalculates the carousel without adding new copies.

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        if (
                            !carouselReady
                        ) {

                            return;

                        }


                        const oldWidth =
                            singleSetWidth;


                        if (
                            oldWidth <= 0
                        ) {

                            return;

                        }


                        const oldScroll =
                            bestSellerViewport.scrollLeft;


                        const positionInsideSet =
                            (
                                oldScroll -
                                oldWidth
                            );


                        const ratio =
                            positionInsideSet /
                            oldWidth;


                        calculateBestSellerWidth();


                        const newPosition =
                            singleSetWidth +
                            (
                                ratio *
                                singleSetWidth
                            );


                        carouselReady = false;


                        bestSellerViewport.scrollLeft =
                            newPosition;


                        carouselReady = true;


                        updateBestSellerDots();

                    },
                    150
                );

        }
    );

}


// EXPLORE FLORENCE FRAGRANCES CAROUSEL

const collectionViewport =
    document.querySelector(".collection-viewport");

const collectionTrack =
    document.getElementById("collectionTrack");

const collectionCards =
    Array.from(
        document.querySelectorAll(".collection-card")
    );


if (
    collectionViewport &&
    collectionTrack &&
    collectionCards.length > 0
) {

    let singleCollectionWidth = 0;
    let collectionReady = false;
    let collectionResizeTimer;


    // CREATE CAROUSEL COPIES
    // Creates one copy before and after the original cards.

    const originalCards =
        collectionCards.map((card) =>
            card.cloneNode(true)
        );


    const collectionBefore =
        document.createDocumentFragment();

    originalCards
        .slice()
        .reverse()
        .forEach((card) => {

            collectionBefore.appendChild(card);

        });


    collectionTrack.insertBefore(
        collectionBefore,
        collectionTrack.firstChild
    );


    const collectionAfter =
        document.createDocumentFragment();

    originalCards.forEach((card) => {

        collectionAfter.appendChild(card);

    });


    collectionTrack.appendChild(
        collectionAfter
    );


    // CALCULATE COLLECTION WIDTH
    // Measures one complete set of collection cards.

    function calculateCollectionWidth() {

        if (
            collectionTrack.scrollWidth === 0
        ) {

            return;

        }


        singleCollectionWidth =
            collectionTrack.scrollWidth / 3;

    }


    // INITIALIZE COLLECTION
    // Starts on the middle copy.

    function initializeCollection() {

        calculateCollectionWidth();


        if (
            singleCollectionWidth <= 0
        ) {

            return;

        }


        collectionReady = false;


        collectionViewport.scrollLeft =
            singleCollectionWidth;


        collectionReady = true;

    }


    // INFINITE SWIPE
    // Keeps the collection carousel looping.

    collectionViewport.addEventListener(
        "scroll",
        function () {

            if (
                !collectionReady ||
                singleCollectionWidth <= 0
            ) {

                return;

            }


            if (
                collectionViewport.scrollLeft >=
                singleCollectionWidth * 2
            ) {

                collectionReady = false;


                collectionViewport.scrollLeft -=
                    singleCollectionWidth;


                collectionReady = true;

            }


            else if (
                collectionViewport.scrollLeft <= 0
            ) {

                collectionReady = false;


                collectionViewport.scrollLeft +=
                    singleCollectionWidth;


                collectionReady = true;

            }

        }
    );


    // INITIALIZE AFTER PAGE LOAD

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                initializeCollection,
                100
            );

        }
    );


    // HANDLE RESIZE
    // Keeps the same relative position after resizing.

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                collectionResizeTimer
            );


            collectionResizeTimer =
                setTimeout(
                    function () {

                        if (
                            !collectionReady
                        ) {

                            return;

                        }


                        const oldWidth =
                            singleCollectionWidth;


                        if (
                            oldWidth <= 0
                        ) {

                            return;

                        }


                        const oldScroll =
                            collectionViewport.scrollLeft;


                        const positionInsideSet =
                            (
                                oldScroll -
                                oldWidth
                            );


                        const ratio =
                            positionInsideSet /
                            oldWidth;


                        calculateCollectionWidth();


                        const newPosition =
                            singleCollectionWidth +
                            (
                                ratio *
                                singleCollectionWidth
                            );


                        collectionReady = false;


                        collectionViewport.scrollLeft =
                            newPosition;


                        collectionReady = true;

                    },
                    150
                );

        }
    );

}


// SEARCH

const searchButton =
    document.getElementById("searchButton");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


if (
    searchButton &&
    searchBox &&
    searchInput
) {


    // OPEN / CLOSE SEARCH

    searchButton.addEventListener(
        "click",
        function () {

            searchBox.classList.toggle(
                "active"
            );


            if (
                searchBox.classList.contains(
                    "active"
                )
            ) {

                searchInput.focus();

            }

            else {

                searchInput.value = "";

            }

        }
    );


    // SEARCH ON ENTER

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) {

                return;

            }


            const searchTerm =
                searchInput.value.trim();


            if (
                searchTerm === ""
            ) {

                return;

            }


            window.location.href =
                "collection.html?search=" +
                encodeURIComponent(
                    searchTerm
                );

        }
    );


    // CLOSE SEARCH WITH ESC

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                searchBox.classList.remove(
                    "active"
                );

                searchInput.value = "";

            }

        }
    );

}