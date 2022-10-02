export const createTitle = (appView: string, page: number, total: number) => {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1');
    title.classList.add('app__title');
    title.innerHTML = `
    ${appView} <span>(${total})</span>
  `;

    const pageEl = document.createElement('h3');
    pageEl.classList.add('app__page');
    pageEl.innerHTML = `Page <span>#${page}</span>`;

    fragment.append(title, pageEl);

    return fragment;
};
