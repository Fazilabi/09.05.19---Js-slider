let slider = document.querySelector(".slider");
let items = document.querySelectorAll(".slider .items .item");

let nextNav = document.querySelector(".next");
let prevNav = document.querySelector(".prev");

// Generate Dots
let dots = generateDots(items.length, getActiveIndex_inSlider());
slider.append(dots);


function generateDots(count, activeIndex) {
    let div = document.createElement("div");
    div.classList.add("dots");
    for (let i = 0; i < count; i++) {
        let span = document.createElement("span");
        if (i == activeIndex) {
            span.classList.add("active");
        }
        span.setAttribute("data-index", i)
        span.addEventListener("click", function () {
            if (!this.classList.contains("active")) {
                document.querySelector(".dots span.active").classList.remove("active");
                this.classList.add("active");
                document.querySelector(".slider .items .item.active").classList.remove("active");
                items[this.getAttribute("data-index")].classList.add("active");
            }
        });



        div.append(span);
    }
    return div;
}

function getActiveIndex_inSlider() {
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("active")) {
            return i;
        }
    }
}


nextNav.addEventListener("click", function () {
    next();
});

prevNav.addEventListener("click", function () {
    let activeItem = document.querySelector(".slider .items .item.active");
    activeItem.classList.remove("active");
    if (activeItem.previousElementSibling != null) {
        activeItem.previousElementSibling.classList.add("active");
    } else {
        items[items.length - 1].classList.add("active");
    }

    let activeDots = document.querySelector(".dots span.active");
    activeDots.classList.remove("active");
    if (activeDots.previousElementSibling != null) {
        activeDots.previousElementSibling.classList.add("active");
    } else {
        document.querySelector(".slider .dots span:last-child").classList.add("active");
    }
});


function next() {
    let activeItem = document.querySelector(".slider .items .item.active");
    activeItem.classList.remove("active");

    if (activeItem.nextElementSibling != null) {
        activeItem.nextElementSibling.classList.add("active");
    } else {
        items[0].classList.add("active");
    }

    let activeDots = document.querySelector(".dots span.active");
    activeDots.classList.remove("active");

    if (activeDots.nextElementSibling != null) {
        activeDots.nextElementSibling.classList.add("active");
    } else {
        document.querySelector(".slider .dots span:first-child").classList.add("active");
    }
};

let intervalSlider = setInterval(() => {
    next();
}, 3000);


slider.addEventListener("mouseover",function(){
    clearInterval(intervalSlider);
});

slider.addEventListener("mouseleave",function(){
    intervalSlider = setInterval(() => {
        next();
    }, 3000);
});

