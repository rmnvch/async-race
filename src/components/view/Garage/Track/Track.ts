import { ICar } from '../../../../types/index';

export const createTrack = (data: ICar) => {
    const track = document.createElement('li');
    track.classList.add('garage__track');
    track.setAttribute('data-id', `${data.id}`);
    track.setAttribute('data-color', `${data.color}`);

    track.innerHTML = `
    <div class="garage__controls">
      <button role="button" data-btn="go" class="btn garage__go">GO!</button>
      <button role="button" data-btn="stop" disabled class="btn garage__stop">STOP</button>
    </div>
    <div class="garage__vehicle">
      <svg width="70pt" fill="${data.color}" height="70pt" version="1.1" viewbox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
          <path d="m406 78.402c-21.289 0-38.73 17.145-39.199 38.324 0.34375 17.047 7.9023 26.301 16.625 32.723-6.6445 3.25-12.434 8.5898-16.102 15.926-10.699 26.562-18.805 54.883-28.176 78.918-6.3633 13.152-6.3477 30.703 0.17578 43.746 2.6289 3.6523 6.9609 6.4023 10.148 8.75h-21.875v-112c0-2.9297-2.668-5.5977-5.6016-5.5977h-118.65c-2.5664 0.48828-4.5977 2.9883-4.5508 5.5977v117.59c0 2.9297 2.668 5.5977 5.6016 5.5977h45.852l4.7266 23.449c0.48047 2.5078 2.8711 4.5156 5.4258 4.5508h3.5l-2.4492 7.3477c-9.5703 3.8984-21.141 11.754-31.324 23.977-11.125 13.352-20.125 31.473-20.125 52.672 0 2.9336 2.668 5.5977 5.6016 5.5977h17.148c1.9492 19.703 14.133 36.473 31.148 44.797h-88.551c-2.9336 0.27344-5.3516 3.1914-5.0742 6.125 0.27344 2.9336 3.1914 5.3516 6.125 5.0742h436.8c2.957 0.054687 5.6016-2.6406 5.6016-5.5977 0-2.9609-2.6406-5.6406-5.6016-5.6016h-31.852c18.766-9.0586 31.852-28.219 31.852-50.398 0-17.359-8.0234-32.941-20.477-43.223l17.676-9.9727c2.9414-1.6953 3.5859-6.3125 1.2266-8.75-12.336-12.695-30.391-20.527-49.176-22.051-5.6445-0.66797-11.379-0.16797-16.625 0.35156-11.023-22.828-22.945-48.16-34.648-71.57l22.75 3.8516c3.1523 0.5 6.4141-2.2344 6.4766-5.4258v-44.797c0-2.9336-2.668-5.5977-5.6016-5.6016-22.082-0.54297-46.441 1.4492-63.875 4.7266-2.25 0.39062-4.1562 2.3008-4.5508 4.5508l-22.926-3.3242c-6.9531-17.809-14.48-35.539-21.176-53.375-1.9727-3.9414-3.9922-7.3242-6.125-10.148 16.426-4.4609 28.723-19.199 29.051-36.922l11.551-0.69922c2.9336-0.18359 5.4336-3.0195 5.25-5.9492-0.18359-2.9336-3.0195-5.4336-5.9492-5.25l-12.25 0.875c-4.0547-18.059-21.277-28.758-37.801-28.871zm27.824 40.773c-0.83594 14.762-12.844 26.426-27.824 26.426-13.707 0-25.008-9.7891-27.477-22.75zm-33.426 37.625c5.4688 0.89844 9.2539 8.6172 11.727 13.473 7.3516 18.68 14.914 37.344 22.398 55.996 0.77344 1.6484 2.4023 2.8672 4.1992 3.1523 12.836 1.7891 25.66 3.6836 38.5 5.4258 5.4141 1.5977 6.8477 4.293 7.6992 8.4023-0.16016 5.0352-2.6445 6.8633-5.7734 8.5742l-52.852-10.5-15.574-25.898c-2.2227-3.4961-8.5273-2.832-9.9766 1.0508l-9.8008 29.398-38.852-4.375c9.7109-25.312 16.914-49.031 25.375-71.047 5.1758-9.5977 14.52-13.496 22.926-13.648zm128.8 67.371v32.375l-27.125-4.5508c-4.0664-0.70312-7.8164 4.3672-5.9492 8.0508l37.273 74.547c-22.102 17.734-47.418 48.41-68.602 79.797h-103.77c-0.29297-14.707-1.6992-27.625-5.7734-38.5-4.5938-12.254-12.832-21.988-25.199-28.172-15.988-7.125-38.68-8.9922-56.352-6.2969l1.9258-5.4258h97.125c0.28906 14.859 1.4883 28.754 5.6016 39.723 2.3242 6.1992 5.5195 11.605 10.148 15.574 4.6328 3.9688 10.734 6.3008 17.5 6.3008h56c1.6719 0 3.3281-0.79297 4.375-2.1016 10.66-13.766 19.965-23.648 27.301-36.922 0.91797-1.7422 1.9258-2.7422 1.9258-5.7734 0-34.066-4.3633-57.121-8.75-76.297-1.1133-4.8711-2.3125-9.4883-3.3242-14 8.8945-3.4805 11.625-10.836 12.602-19.25-0.3125-8.3398-3.9336-12.348-9.8008-16.625 15.504-1.8984 30.582-2.4219 42.875-2.4531zm-121.8 7.3516 10.676 17.676c0.78906 1.332 2.1562 2.3086 3.6758 2.625l50.398 10.148c1.2852 5.5547 2.5078 11.105 3.8516 16.973 4.2773 18.699 8.3398 40.422 8.3984 73.148-3.2031 6.3086-8.1328 12.637-12.074 17.848-2.9609-2.3594-6.8086-3.707-9.9766-4.8984 1.7266-20.875 3.582-41.797 5.25-62.645 0-6.5312-1.918-12.77-6.4766-17.324-4.5547-4.5547-11.02-7.582-19.773-10.5-14.91-3.4141-29.992-6.6719-44.977-9.9727l11.023-33.074zm-315 37.273v11.199h95.199v-11.199zm169.23 39.199h118.3c12 1.7109 13.848 6.4727 14.352 16.801h-129.32zm-158.02 5.6016v11.199h106.4v-11.199zm301.52 0.875 17.148 3.5-4.8984 49.875c-5.9141 4.7109-8.0078 12.059-9.9766 18.551-4.5625 0.375-8.4688-1.9258-11.551-3.6758-2.7188-2.332-5.125-6.0234-7-11.023-3.3164-8.8438-4.7578-21.504-5.0742-35.699h16.625c2.9336 0 5.6016-2.668 5.6016-5.6016 0-5.5977 0.10938-10.949-0.875-15.926zm-323.93 32.723v11.199h128.8v-11.199zm480.55 0.34766c13.305 1.1133 25.43 6.4844 35.176 13.824l-106.23 59.848c0.73047-13.07 2.7617-23.18 5.9492-31.672 11.234-14.254 22.723-27.109 33.426-37.273 11.301-4.2891 20.715-5.1406 31.676-4.7227zm-236.6 10.148c10.031 5.0156 15.797 12.078 19.602 22.227 3.3516 8.9336 4.7578 20.598 5.0742 34.473h-127.57c1.4688-15.496 7.8516-29.371 16.625-39.898 9.4844-11.383 21.066-19.094 28-21.699 15.223-3.6172 42.445-2.2539 58.273 4.8984zm103.25 17.5h28c3.5664 0.67188 6.3164 1.8359 9.1016 3.5-3.0391 3.7539-5.4922 6.7266-6.3008 7.6992h-40.074c1.3594-6.5391 5.0938-9.6406 9.2734-11.199zm-313.6 5.6016v11.199h95.199v-11.199zm442.4 22.398c9.3438 0 16.801 7.457 16.801 16.801s-7.457 16.801-16.801 16.801-16.801-7.4531-16.801-16.801c0-9.3438 7.457-16.801 16.801-16.801zm-77.352 8.9258c-0.66016 5.8203-1.0508 12.129-1.0508 19.074 0.085937 3.8672 5.0508 6.6602 8.3984 4.7266l14.699-8.2266c2.6133 18.852 14.66 34.699 31.148 42.699h-220.15c17.02-8.3242 29.203-25.094 31.148-44.797h123.55c1.8789 0 3.7266-1.0312 4.7266-2.625 2.4219-3.6328 4.9805-7.2344 7.5234-10.848zm-207.38 13.473h31.852c-2.2773 6.5625-8.543 11.199-15.926 11.199-7.3828 0-13.645-4.6367-15.926-11.199z"/>
        </g>
      </svg>
      <span class="garage__vehicle-msg">Bummer!!!</span>
    </div>
    <span class="garage__name">${data.name}</span>
    <div class="garage__change">
      <button role="button" data-btn="change" class="btn garage__upd">
        <svg enable-background="new 0 0 48 48" fill="#fff" height="20px" version="1.1" viewbox="0 0 48 48" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M44.929,14.391c-0.046,0.099-0.102,0.194-0.183,0.276L16.84,42.572  c-0.109,0.188-0.26,0.352-0.475,0.434l-13.852,3.88c-0.029,0.014-0.062,0.016-0.094,0.026l-0.047,0.014  c-0.008,0.003-0.017,0.001-0.024,0.004c-0.094,0.025-0.187,0.046-0.286,0.045c-0.098,0.003-0.189-0.015-0.282-0.041  c-0.021-0.006-0.04-0.002-0.061-0.009c-0.008-0.003-0.013-0.01-0.021-0.013c-0.088-0.033-0.164-0.083-0.24-0.141  c-0.039-0.028-0.08-0.053-0.113-0.086s-0.058-0.074-0.086-0.113c-0.058-0.075-0.107-0.152-0.141-0.24  c-0.004-0.008-0.01-0.013-0.013-0.021c-0.007-0.02-0.003-0.04-0.009-0.061c-0.025-0.092-0.043-0.184-0.041-0.281  c0-0.1,0.02-0.193,0.045-0.287c0.004-0.008,0.001-0.016,0.004-0.023l0.014-0.049c0.011-0.03,0.013-0.063,0.026-0.093l3.88-13.852  c0.082-0.216,0.246-0.364,0.434-0.475l27.479-27.48c0.04-0.045,0.087-0.083,0.128-0.127l0.299-0.299  c0.015-0.015,0.034-0.02,0.05-0.034C34.858,1.87,36.796,1,38.953,1C43.397,1,47,4.603,47,9.047  C47,11.108,46.205,12.969,44.929,14.391z M41.15,15.5l-3.619-3.619L13.891,35.522c0.004,0.008,0.014,0.011,0.018,0.019l2.373,4.827  L41.15,15.5z M3.559,44.473l2.785-0.779l-2.006-2.005L3.559,44.473z M4.943,39.53l3.558,3.559l6.12-1.715  c0,0-2.586-5.372-2.59-5.374l-5.374-2.59L4.943,39.53z M12.49,34.124c0.008,0.004,0.011,0.013,0.019,0.018L36.15,10.5l-3.619-3.619  L7.663,31.749L12.49,34.124z M38.922,3c-1.782,0-3.372,0.776-4.489,1.994l-0.007-0.007L33.912,5.5l8.619,8.619l0.527-0.528  l-0.006-0.006c1.209-1.116,1.979-2.701,1.979-4.476C45.031,5.735,42.296,3,38.922,3z" fill-rule="evenodd"/></svg>
      </button>
      <button role="button" data-btn="delete" class="btn garage__del">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0" y="0" height="25px" version="1.1" viewbox="0 0 29 29" xml:space="preserve"><path d="M10 3v3h9V3a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1z"/><path d="M4 5v1h21V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1zM6 8l1.812 17.209A2 2 0 0 0 9.801 27H19.2a2 2 0 0 0 1.989-1.791L23 8H6zm4.577 16.997a.999.999 0 0 1-1.074-.92l-1-13a1 1 0 0 1 .92-1.074.989.989 0 0 1 1.074.92l1 13a1 1 0 0 1-.92 1.074zM15.5 24a1 1 0 0 1-2 0V11a1 1 0 0 1 2 0v13zm3.997.077a.999.999 0 1 1-1.994-.154l1-13a.985.985 0 0 1 1.074-.92 1 1 0 0 1 .92 1.074l-1 13z"/></svg>
      </button>
    </div>
  `;

    return track;
};
