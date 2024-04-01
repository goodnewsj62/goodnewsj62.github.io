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
    })


});