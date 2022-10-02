export const createFormElement = () => {
    const form = document.createElement('form');
    form.classList.add('garage__form', 'form');
    form.innerHTML = `
  <div class="garage__add">  
    <input role="input" data-input="text" class="form__input" placeholder="Enter your Pizza Guy name" type="text" name="" id="">
    <input role="input" data-input="color" type="color" value="#ffffff">
    <button role="button" data-btn="create" class="btn form__create form__btn">Create</button>
    <button role="button" data-btn="updateHidden" class="btn form__update form__btn hidden-btn">Update</button>
  </div>
  <div class="garage__race">
    <button role="button" data-btn="race" class="btn form__race form__btn">Pizza Race</button>
    <button role="button" data-btn="reset" class="btn form__reset form__btn">Reset</button>
    <button role="button" data-btn="generate" class="btn form__generate form__btn">Hire Pizza Guys</button>
  </div>
  `;

    return form;
};
