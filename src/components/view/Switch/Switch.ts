export const createSwitchElement = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('app__view-switch');
    wrapper.innerHTML = `
    <button role="button" data-btn="garage" class="btn btn-controls active-view">Garage</button>
    <button role="button" data-btn="rankings" class="btn btn-controls">Rankings</button>
  `;
    return wrapper;
};
