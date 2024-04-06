const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


const switchTheme = (themeData) => {
    switch (themeData) {
        case "dark": {
            console.log("case dark")
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            break;
        }
        default: {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark")
        }
    }
}

const initTheme = () => document.body.setAttribute("data-theme", localStorage.getItem("theme") ?? "light");
// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    switchOffLoader();
    console.log("finish", Date.now())

    initTheme();
    gsap.registerPlugin(ScrollTrigger, TextPlugin)




    // header effect
    const headerTimeLine = gsap.timeline({});
    const headerInfo = document.querySelector("header").getBoundingClientRect();

    headerTimeLine.from("header", {
        top: `-${headerInfo.height}`,
        duration: .5
    })

    Array.from(document.querySelectorAll("#nav__links li")).forEach((el, index) => {
        headerTimeLine.from(el, {
            y: `-${(headerInfo.height / 2) + el.offsetHeight}`,
            duration: .1,
            delay: (0.1) * index,
            ease: "expo.out",
        });
    });

    headerTimeLine.from(".bulb", {
        top: -100,
        delay: 1,
        duration: .1,
    });


    //mobile toggle bar

    const sideBar = document.querySelector(".side__bar")
    const mobToggle = document.querySelectorAll(".mob__bar")
    const toggleMobIcon = () => mobToggle.forEach((el) => el.classList.toggle("mob__nav__close"));
    Array.from(mobToggle).forEach((el) => {
        el.addEventListener("click", (e) => {

            toggleMobIcon();
            sideBar.classList.toggle("hide__sidenav");
        });
    });


    // hide onclick
    Array.from(document.querySelectorAll('[data-hide="true"]')).forEach((el) => {
        el.addEventListener("click", () => {
            toggleMobIcon();
            sideBar.classList.add("hide__sidenav");
        });
    });

    //toggle theme
    [document.querySelector("#toggle__theme"), document.querySelector(".argon")].forEach((el) => {
        el.addEventListener("click", (el) => {
            const themeData = document.body.getAttribute("data-theme")
            switchTheme(themeData);
        });
    })
});



function switchOffLoader() {
    document.querySelector(".loader").style.display = "none";
}