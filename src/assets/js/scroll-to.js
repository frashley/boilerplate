((doc) => {
    let body = doc.body;

    body.addEventListener('click', (e) => {
        if (e.target.nodeName.toLowerCase() === 'a' && e.target.hasAttribute('data-scroll-to')) {
            e.preventDefault();
        }
    });
})(document);
