console.log('%c welcome to QOVOX ', 'background: #222; color: #bada55; font-size: 20px; padding: 4px;');
console.log('%c By the team leader QOVOX ', 'background: #222; color: #bada55; font-size: 20px; padding: 4px;');
console.log('%c Mahmoud ', 'background: #222; color: #bada55; font-size: 20px; padding: 4px;');


document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    if (menuBtn && sideMenu && overlay) {

        const openNav = function () {
            sideMenu.style.width = "280px";
            overlay.style.display = "block";
        };

        const closeNav = function () {
            sideMenu.style.width = "0";
            overlay.style.display = "none";
        };

        menuBtn.addEventListener("click", openNav);

        if (closeBtn) {
            closeBtn.addEventListener("click", closeNav);
        }

        overlay.addEventListener("click", closeNav);

        const links = document.querySelectorAll('.side-nav a');
        links.forEach(function (anchor) {
            anchor.addEventListener("click", function (e) {

                const targetId = this.getAttribute('href');

                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();

                    if (targetId === "#") {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        closeNav();
                        return;
                    }

                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        closeNav();
                        setTimeout(function () {
                            targetElement.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            });
        });
    }


    const backToTop = document.createElement('button');
    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    const textElement = document.getElementById('typewriter');

    if (textElement) {

        const phrases = ["Code Your Vision", "Build Your Future", "Digital Solutions"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {

            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }



    const bubble = document.getElementById('welcome-bubble');
    const closeBubble = document.getElementById('close-bubble');

    if (bubble) {
        setTimeout(function () {
            bubble.classList.add('show');
        }, 3000);
    }

    if (bubble && closeBubble) {
        closeBubble.addEventListener("click", function () {
            bubble.classList.remove('show');
        });
    }



    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {

        window.addEventListener("mousemove", function (e) {

            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = posX + "px";
            cursorDot.style.top = posY + "px";

            cursorOutline.animate({
                left: posX + "px",
                top: posY + "px"
            }, { duration: 500, fill: "forwards" });
        });

        window.addEventListener("mousedown", function () {
            cursorOutline.classList.add("cursor-click");
        });

        window.addEventListener("mouseup", function () {
            cursorOutline.classList.remove("cursor-click");
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');

        interactiveElements.forEach(function (el) {
            el.addEventListener("mouseenter", function () {
                cursorOutline.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", function () {
                cursorOutline.classList.remove("cursor-hover");
            });
        });
    }



    const hammer = document.querySelector('.hammer-cursor');

    if (hammer) {

        window.addEventListener('mousemove', function (e) {
            requestAnimationFrame(function () {
                hammer.style.left = e.clientX + 'px';
                hammer.style.top = e.clientY + 'px';
            });
        });

        window.addEventListener('mousedown', function (e) {

            hammer.classList.add('hammer-clicking');
            hammer.style.transform = 'translate(-20%, -20%) rotate(-45deg) scale(0.8)';

            for (let i = 0; i < 8; i++) {

                const spark = document.createElement('div');
                spark.className = 'spark';
                document.body.appendChild(spark);

                const size = Math.random() * 8 + 4;
                spark.style.width = size + 'px';
                spark.style.height = size + 'px';

                spark.style.left = e.clientX + 'px';
                spark.style.top = e.clientY + 'px';

                const destinationX = (Math.random() - 0.5) * 150;
                const destinationY = (Math.random() - 0.5) * 150;

                const animation = spark.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: 'translate(' + destinationX + 'px, ' + destinationY + 'px)', opacity: 0 }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });

                animation.onfinish = function () {
                    spark.remove();
                };
            }
        });

        window.addEventListener('mouseup', function () {
            hammer.classList.remove('hammer-clicking');
            hammer.style.transform = 'translate(-20%, -20%)';
        });
    }


    const canvas = document.getElementById('matrix-bg');

    if (canvas) {

        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#840000c9";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {

                const text = letters.charAt(Math.floor(Math.random() * letters.length));

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

});

console.log("QOVOX script loaded successfully!");
console.error("NO ERROR")

console.log("DONE!")
