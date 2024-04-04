const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)


    // typewriter at the hero

    const words = ["developer", "engineer", "architect"];

    const mainTimeline = gsap.timeline({
        repeat: -1
    })

    words.forEach((word) => {
        const textTimeLine = gsap.timeline({
            repeat: 1,
            yoyo: true,
            repeatDelay: 4
        });

        textTimeLine.to("#typewriter", {
            text: word,
            duration: 1,
            onUpdate: () => {
                cursorTimeline.restart()
                cursorTimeline.pause()
            },
            onComplete: () => {
                cursorTimeline.play()
            }
        });

        mainTimeline.add(textTimeLine);
    });


    let cursorTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: .8
    })

    // Blinking cursor
    cursorTimeline.to("#cursor", {
        opacity: 1,
        duration: 0
    }).to("#cursor", {
        opacity: 0,
        duration: 0,
        delay: .8
    });


    /* hero slide in effect */
    const heroTimeline = gsap.timeline({
        onStart: () => {
            document.querySelector(".container").style.overflow = "hidden"
            document.querySelector(".container").style.height = "99svh"
        },
        onComplete: () => {
            document.querySelector(".container").style.overflow = ""
            document.querySelector(".container").style.height = ""
        }
    });
    Array.from(document.querySelectorAll(".hero > div")).forEach((el, index) => {

        heroTimeline.from(el, {
            ...(index === 0 ? { x: -200 } : { right: -200 }),
            opacity: 0,
            duration: 1
        }, 0)
    });


    console.log(window.innerHeight)


    heroTimeline.from(".services", {
        y: `${(document.querySelector(".services").getBoundingClientRect().height)}`,
    })


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


});