
        const comparison = document.querySelector('#comparison');
        const fonts = ['Plus Jakarta Sans', 'Geist Mono', 'Public Sans', 'Comfortaa'];
        fonts.forEach(font => {
            const card = document.querySelector('#font-card').content.cloneNode(true);
            card.querySelector('h2').textContent = font;
            card.querySelector('article').style.setProperty('--font', '"' + font + '"');
            comparison.append(card);
        });
        document.querySelector('#size').addEventListener('input', event => {
            comparison.style.setProperty('--body-size', event.target.value + 'px');
            document.querySelector('#size-value').textContent = event.target.value + ' px';
        });
        document.querySelector('#weight').addEventListener('change', event => comparison.style.setProperty('--weight', event.target.value));
        document.querySelector('#theme').addEventListener('click', event => {
            const light = document.body.classList.toggle('light');
            event.target.textContent = light ? 'Latar gelap' : 'Latar terang';
            event.target.setAttribute('aria-pressed', String(light));
        });
    
