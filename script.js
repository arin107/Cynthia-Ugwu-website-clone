var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

function firstpageanime(){
    var tl=gsap.timeline();
    console.log(tl)
    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelm",{
        y:0,
        ease:Expo.easeInOut,
        duration:1.5,
        stagger:.2,
        delay:-1
    })
    .from("#herofooter",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay:-1
    })
}

function circlechaptakaro(){
    var xscale=1;
    var yscale=1;
    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout)
        var xdiff=dets.clientX-xprev;
        var ydiff=dets.clientY-yprev;

        xscale= gsap.utils.clamp(.8,1.2,xdiff)
        yscale= gsap.utils.clamp(.8,1.2,ydiff)

        xprev=dets.clientX;
        yprev=dets.clientY;
        circlemousefollower(xscale,yscale)

        timeout=this.setTimeout(function(){
            document.querySelector("#minicircle").style.transform=`translate(${dets.x}px,${dets.y}px) scale(1,1)`
        },100)
    })
}

function circlemousefollower(xscale,yscale){
    document.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform=`translate(${dets.x}px,${dets.y}px) scale(${xscale},${yscale})`

})
}


circlemousefollower()
circlechaptakaro()
firstpageanime()

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diffrot=0;

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:.5
        })
    })
    elem.addEventListener("mousemove",function(dets){
        var diff=dets.clientY-elem.getBoundingClientRect().top;
        diffrot= dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot)
        })
    })
})