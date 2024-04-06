

document.addEventListener("DOMContentLoaded", () => {
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




    heroTimeline.from(".services", {
        y: `${(document.querySelector(".services").getBoundingClientRect().height)}`,
    })

});