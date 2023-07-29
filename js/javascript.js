// toggel Navbar
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNav);

function toggleNav() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open");
}
document.addEventListener("click", function (e) {
    if (e.target.closest(".nav-item")) {
        toggleNav();
    }
})
// end toggle Navbar
// sticky header
window.addEventListener("scroll", function () {
    if (this.pageYOffset > 60) {
        this.document.querySelector(".header").classList.add("sticky");
    } else {
        this.document.querySelector(".header").classList.remove("sticky");
    }
});
function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}
(() => {
    const filterContainer = document.querySelector(".product-tabs"),
        productItemsContainer = document.querySelector(".product-tabs-content"),
        productItems = document.querySelectorAll(".product-item"),
        popup = document.querySelector(".product-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        productDetailContainer = popup.querySelector(".pp-details"),
        productDetailsBtn = popup.querySelector(".pp-product-details-btn");
    let itemIndex, slideIndex, screenshots;
    // filterContainer
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("product-tab-item") &&
            !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            const target = event.target.getAttribute("data-target");
            productItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });
    productItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".product-item-inner")) {
            const productItem = event.target.closest(".product-item-inner").parentElement;
            itemIndex = Array.from(productItem.parentElement.children).indexOf(productItem)
            screenshots = productItems[itemIndex].querySelector(".product-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });
    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (productDetailContainer.classList.contains("active")) {
            productDetailsToggle();
        }
    });
    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    });
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    });
    function popupDetails() {
        if (!productItems[itemIndex].querySelector(".product-item-details")) {
            productDetailsBtn.style.display = "none";
            return;
        }
        productDetailsBtn.style.display = "block";
        const details = productItems[itemIndex].querySelector(".product-item-details").innerHTML;
        popup.querySelector(".pp-product-details").innerHTML = details;
        const title = productItems[itemIndex].querySelector(".product-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = productItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-product-category").innerHTML = category.split("-").join(" ");

    }
    productDetailsBtn.addEventListener("click", () => {
        productDetailsToggle();
    })
    function productDetailsToggle() {
        if (productDetailContainer.classList.contains("active")) {
            productDetailsBtn.querySelector("i").classList.remove("fa-minus");
            productDetailsBtn.querySelector("i").classList.add("fa-plus");
            productDetailContainer.classList.remove("active");
            productDetailContainer.style.maxHeight = 0 + "px";
        } else {
            productDetailsBtn.querySelector("i").classList.remove("fa-plus");
            productDetailsBtn.querySelector("i").classList.add("fa-minus");
            productDetailContainer.classList.add("active");
            productDetailContainer.style.maxHeight = productDetailContainer.scrollHeight + "px";
            popup.scrollTo(0, productDetailContainer.offsetTop)
        }
    }
})();