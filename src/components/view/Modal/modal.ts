export const createWinnerModal = (data: { name: string; time: number }) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const text = document.createElement('p');
    const small = document.createElement('small');

    wrapper.classList.add('modal');
    content.classList.add('modal__content');
    text.classList.add('modal__text');
    small.classList.add('modal__small');

    text.textContent = `${data.name} is the fastest Pizza Guy today!!! Winning time is ${data.time}s`;
    small.textContent = 'Press "reset" to start another race';

    content.append(text, small);
    wrapper.append(content);

    return wrapper;
};
