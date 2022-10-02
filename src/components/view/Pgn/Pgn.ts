export const createPgn = (qty: number, view: string, pageNumber = 1) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('app__pgn');
    for (let i = 1; i <= qty; i += 1) {
        const page = document.createElement('span');
        page.textContent = i.toString();
        page.setAttribute('role', 'button');
        page.setAttribute('data-btn', `pgn-${view}`);
        if (i === pageNumber) page.classList.add('pgn-active');
        wrapper.append(page);
    }
    return wrapper;
};
