document.addEventListener('DOMContentLoaded', function () {

    // Preloader
    window.addEventListener('load', function () {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('preloader-fade-out');
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 5000); //Adjust preloader delay as needed
    });

    //Menu
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

    mobileMenuToggle.onclick = function () {

        const desktopMenu = document.querySelector(".nav-menu");

        desktopMenu.classList.toggle("active")
        mobileMenuToggle.classList.toggle("active")
    }

    // //Locomotive Scroll using Lenis
    // const lenis = new Lenis({
    //     smoothTouch: false
    // });

    // lenis.on('scroll', ScrollTrigger.update)

    // gsap.ticker.add((time) => {
    //     lenis.raf(time * 1000)
    // })

    // function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf)
    // }

    // requestAnimationFrame(raf)

    // Hero Animation
    const heroCanvas = document.getElementById("hero-sequence");
    const heroContext = heroCanvas.getContext("2d");

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    heroCanvas.width = viewportWidth;
    heroCanvas.height = viewportHeight;

    const heroFrameCount = 240;
    const heroCurrentFrame = index => (
        `images/sequences/herobanner/herobanner_${index.toString().padStart(5, '0')}.webp`
    );

    const heroImages = [];
    const hero = {
        frame: 0
    };

    for (let i = 0; i < heroFrameCount; i++) {
        const img = new Image();
        img.src = heroCurrentFrame(i);
        heroImages.push(img);
    }

    gsap.to(hero, {
        frame: heroFrameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.5
        },
        onUpdate: renderHero
    });

    heroImages[0].onload = renderHero;

    // Logo Animation
    const logo = document.querySelector(".hero-logo");
    const logoStartY = viewportHeight + logo.offsetHeight;
    const logoEndY = -logo.offsetHeight - (viewportHeight * 0.25);

    gsap.fromTo(logo, {
        y: logoStartY
    }, {
        y: logoEndY,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=100%",
            scrub: 0.5
        }
    });

    function renderHero() {
        heroContext.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        const image = heroImages[hero.frame];
        const aspectRatio = image.width / image.height;
        let width = heroCanvas.width;
        let height = heroCanvas.width / aspectRatio;
        if (height < heroCanvas.height) {
            height = heroCanvas.height;
            width = heroCanvas.height * aspectRatio;
        }
        const x = (heroCanvas.width - width) / 2;
        const y = (heroCanvas.height - height) / 2;
        heroContext.drawImage(image, x, y, width, height);
    }

    // Scrolling Car Animation
    const carCanvas = document.getElementById("scrolling-car-sequence");
    const carContext = carCanvas.getContext("2d");

    const containerWidth = carCanvas.parentElement.clientWidth;
    const containerHeight = carCanvas.parentElement.clientHeight;

    carCanvas.width = containerWidth;
    carCanvas.height = containerHeight;

    const carFrameCount = 60;
    const carCurrentFrame = index => (
        `images/sequences/scrollingcar/scrollingcar_${index.toString().padStart(5, '0')}.webp`
    );

    const carImages = [];
    const scrollingCar = {
        frame: 0
    };

    for (let i = 0; i < carFrameCount; i++) {
        const img = new Image();
        img.src = carCurrentFrame(i);
        carImages.push(img);
    }

    gsap.to(scrollingCar, {
        frame: carFrameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".scrolling-car",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
        },
        onUpdate: renderScrollingCar
    });

    carImages[0].onload = renderScrollingCar;

    function renderScrollingCar() {
        carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
        const image = carImages[scrollingCar.frame];
        const aspectRatio = image.width / image.height;

        let width = carCanvas.width;
        let height = carCanvas.height;
        let x = 0;
        let y = 0;

        if (aspectRatio > 1) {
            // Image is wider, adjust height
            height = carCanvas.width / aspectRatio;
            y = (carCanvas.height - height) / 2;
        } else {
            // Image is taller, adjust width
            width = carCanvas.height * aspectRatio;
            x = (carCanvas.width - width) / 2;
        }

        carContext.drawImage(image, x, y, width, height);
    }

    // Move scrolling-car-container animation
    const carContainer = document.querySelector(".scrolling-car-container");
    gsap.to(carContainer, {
        x: viewportWidth - (viewportWidth * 0.25), // Move to the right end of the viewport
        ease: "none",
        scrollTrigger: {
            trigger: ".scrolling-car",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
        }
    });

    // Car Towards User Animation
    const carTowardsUserCanvas = document.getElementById("car-towards-user-sequence");
    const carTowardsUserContext = carTowardsUserCanvas.getContext("2d");

    carTowardsUserCanvas.width = viewportWidth;
    carTowardsUserCanvas.height = viewportHeight;

    const carTowardsUserFrameCount = 72;
    const carTowardsUserCurrentFrame = index => (
        `images/sequences/cartowardsuser/cartowardsuser_${index.toString().padStart(5, '0')}.webp`
    );

    const carTowardsUserImages = [];
    const carTowardsUser = {
        frame: 0
    };

    for (let i = 0; i < carTowardsUserFrameCount; i++) {
        const img = new Image();
        img.src = carTowardsUserCurrentFrame(i);
        carTowardsUserImages.push(img);
    }

    gsap.to(carTowardsUser, {
        frame: carTowardsUserFrameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".car-towards-user",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.5
        },
        onUpdate: renderCarTowardsUser
    });

    carTowardsUserImages[0].onload = renderCarTowardsUser;

    function renderCarTowardsUser() {
        carTowardsUserContext.clearRect(0, 0, carTowardsUserCanvas.width, carTowardsUserCanvas.height);
        const image = carTowardsUserImages[carTowardsUser.frame];
        const aspectRatio = image.width / image.height;
        let width = carTowardsUserCanvas.width;
        let height = carTowardsUserCanvas.width / aspectRatio;
        if (height < carTowardsUserCanvas.height) {
            height = carTowardsUserCanvas.height;
            width = carTowardsUserCanvas.height * aspectRatio;
        }
        const x = (carTowardsUserCanvas.width - width) / 2;
        const y = (carTowardsUserCanvas.height - height) / 2;
        carTowardsUserContext.drawImage(image, x, y, width, height);
    }
});