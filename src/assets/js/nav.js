((global, doc) => {
    if (typeof document.body.classList !== 'object') {
        return;
    }

    let nav = doc.querySelector('#nav-main');
    let navMenuBtn = doc.querySelector('#nav-menu-btn');
    let main = doc.querySelector('#wrapper-main');
    let navHeight = nav.clientHeight;
    let isMenuActive = false;
    let timer = 0;

    navMenuBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (isMenuActive === false) {
            show();
        } else {
            hide();
        }
    });

    nav.addEventListener('click', function () {
        if (isMenuActive === true) {
            hide();
        }
    });

    watchViewport(() => {
        if (isMenuActive === true) {
            hide();
        }
    });

    function watchViewport(cb) {
        // fire method on window resize once the resize event completes
        if (typeof addEventListener === 'function') {
            global.addEventListener('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(cb, 100);
            }, false);
        }
    }

    function show() {
        nav.classList.add('expanded');
        navMenuBtn.classList.add('expanded');

        main.style.paddingTop = (navHeight) + 'px'; // 24 for the header padding top

        isMenuActive = true;
    }

    function hide() {
        nav.classList.remove('expanded');
        navMenuBtn.classList.remove('expanded');

        main.style.paddingTop = 0;

        isMenuActive = false;
    }
})(window, document);
