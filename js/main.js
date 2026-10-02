/* =========================================================
   FLORENCE PERFUME PH
   HOME PAGE - CAROUSELS
========================================================= */


/* =========================================================
   BEST SELLER - INFINITE SWIPE CAROUSEL
========================================================= */

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


    /* =====================================================
       CREATE COPIES FOR INFINITE LOOP
    ===================================================== */

    bestSellerItems.forEach((item) => {

        bestSellerTrack.appendChild(
            item.cloneNode(true)
        );

    });


    bestSellerItems
        .slice()
        .reverse()
        .forEach((item) => {

            bestSellerTrack.insertBefore(
                item.cloneNode(true),
                bestSellerTrack.firstChild
            );

        });


    let singleSetWidth = 0;


    /* =====================================================
       CALCULATE WIDTH OF ONE COMPLETE SET
    ===================================================== */

    function calculateBestSellerWidth() {

        const allItems =
            bestSellerTrack.querySelectorAll(
                ".best-seller-item"
            );


        singleSetWidth = 0;


        for (
            let i = 0;
            i < bestSellerItems.length;
            i++
        ) {

            singleSetWidth +=
                allItems[i]
                    .getBoundingClientRect()
                    .width;

        }


        /*
            Start at the middle copy.
            This allows scrolling in both directions.
        */

        bestSellerViewport.scrollLeft =
            singleSetWidth;


        updateBestSellerDots();

    }


    /* =====================================================
       UPDATE DOT / CURRENT FOCUS
    ===================================================== */

    function updateBestSellerDots() {

        if (singleSetWidth === 0) {
            return;
        }


        const itemWidth =
            bestSellerItems[0]
                .getBoundingClientRect()
                .width;


/*
    Find the current product position
    inside the original 6 products.
*/

        const scrollInsideSet =
            bestSellerViewport.scrollLeft -
            singleSetWidth;


        let currentItem =
            Math.round(
                scrollInsideSet / itemWidth
            );


/*
    Keep the index between 0 and 5.
*/

        currentItem =
            (
                currentItem %
                bestSellerItems.length +
                bestSellerItems.length
            ) %
            bestSellerItems.length;

/*
    6 products = 3 indicators.
    Each indicator represents 2 products.
*/

        const activeDot =
            Math.floor(currentItem / 2);


        bestSellerDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === activeDot
                );

            }
        );

    }


    /* =====================================================
       INFINITE SWIPE
    ===================================================== */

    bestSellerViewport.addEventListener(
        "scroll",
        function () {

            if (singleSetWidth === 0) {
                return;
            }


            /*
                Reached the right copy.
                Move silently back to the middle.
            */

            if (
                bestSellerViewport.scrollLeft >=
                singleSetWidth * 2
            ) {

                bestSellerViewport.scrollLeft -=
                    singleSetWidth;

            }


            /*
                Reached the left copy.
                Move silently forward to the middle.
            */

            if (
                bestSellerViewport.scrollLeft <= 0
            ) {

                bestSellerViewport.scrollLeft +=
                    singleSetWidth;

            }


            updateBestSellerDots();

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    window.addEventListener(
        "load",
        calculateBestSellerWidth
    );


    window.addEventListener(
        "resize",
        calculateBestSellerWidth
    );

}

/* =========================================================
   COLLECTION - INFINITE SWIPE CAROUSEL
========================================================= */

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


    /* =====================================================
       CREATE COPIES FOR INFINITE LOOP
    ===================================================== */

    collectionCards.forEach((card) => {

        collectionTrack.appendChild(
            card.cloneNode(true)
        );

    });


    collectionCards
        .slice()
        .reverse()
        .forEach((card) => {

            collectionTrack.insertBefore(
                card.cloneNode(true),
                collectionTrack.firstChild
            );

        });


    let singleCollectionWidth = 0;


    /* =====================================================
       CALCULATE WIDTH OF ONE COMPLETE SET
    ===================================================== */

    function calculateCollectionWidth() {

        const allCards =
            collectionTrack.querySelectorAll(
                ".collection-card"
            );


        singleCollectionWidth = 0;


        for (
            let i = 0;
            i < collectionCards.length;
            i++
        ) {

            singleCollectionWidth +=
                allCards[i]
                    .getBoundingClientRect()
                    .width;

        }


        /*
            Add the margin between cards.
        */

        const cardStyle =
            window.getComputedStyle(
                allCards[0]
            );


        const marginRight =
            parseFloat(
                cardStyle.marginRight
            ) || 0;


        singleCollectionWidth +=
            marginRight *
            collectionCards.length;


        /*
            Start at the middle copy.
        */

        collectionViewport.scrollLeft =
            singleCollectionWidth;

    }


    /* =====================================================
       INFINITE SWIPE
    ===================================================== */

    collectionViewport.addEventListener(
        "scroll",
        function () {

            if (
                singleCollectionWidth === 0
            ) {
                return;
            }


            /*
                Reached the right copy.
                Move silently back to the middle.
            */

            if (
                collectionViewport.scrollLeft >=
                singleCollectionWidth * 2
            ) {

                collectionViewport.scrollLeft -=
                    singleCollectionWidth;

            }


            /*
                Reached the left copy.
                Move silently forward to the middle.
            */

            if (
                collectionViewport.scrollLeft <= 0
            ) {

                collectionViewport.scrollLeft +=
                    singleCollectionWidth;

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    window.addEventListener(
        "load",
        calculateCollectionWidth
    );


    window.addEventListener(
        "resize",
        calculateCollectionWidth
    );

}