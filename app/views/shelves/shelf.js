import html from 'choo/html';

import { starRating } from '../partials/starRating';
import { modal } from '../partials/modal';

export const shelfView = (shelvesController, emit) => {
  const { __ } = shelvesController.i18n;

  if (shelvesController.targetShelf === null) {
    return [
      html`<section>
        <h2>${__('shelves.no_shelf_selected')}</h2>
        <article class="card">
          <header>
            <p>${__('shelves.not_logged_in')}</p>
          </header>
          <footer>
            <button>${__('global.menu_login')}</button>
          </footer>
        </article>
      </section>`,
    ];
  }

  if (typeof shelvesController.state.loadedShelves[shelvesController.targetShelf] === 'undefined') {
    shelvesController.getTargetShelf().then(() => {
      emit('render');
    });
  }

  const shelf = typeof shelvesController.state.loadedShelves[shelvesController.targetShelf] !== 'undefined'
    ? shelvesController.state.loadedShelves[shelvesController.targetShelf]
    : null;

  if (shelf === null) {
    return [
      html`<section>
        <h2>${__('shelves.loading')}</h2>
        <article class="card">
          <header>
            <i class="icon-loading animate-spin"></i>
          </header>
        </article>
      </section>`,
    ];
  }

  const shelfItems = shelf !== null ? shelf.shelfItems : [];

  // Returning an array in a view allows non-shared parent HTML elements.
  // This one doesn't have the problem right now, but it's good to remember.
  return [
    html`<section>
      <div class="flex two">
        <div class="two-third three-fourth-700">
          <h2>${shelf.name}</h2>
          <span>${__('shelves.owned_by')} <a href="/profile?user=${shelf.user.userName}" title=${shelf.user.userName}>${shelf.user.displayName}</a></span>
        </div>
        <div class="third sixth-700">
          <button class="pseudo" onclick=${() => {
            delete shelvesController.state.loadedShelves[shelvesController.targetShelf];
            emit('render');
          }}>
            Reload <i class="icon-reload"></i>
          </button>
        </div>
      </div>
      ${shelfItems.map((shelfItem, index) => {
        return html`<article class="card">
          <footer>
            <div class="flex one twelve-700">
              <div class="full sixth-700">
                <img src=${shelfItem.coverURL} alt="cover ${shelfItem.coverEdition}" />
              </div>
              <div class="full half-700">
                <h3>${shelfItem.name}</h3>
                <span>${shelfItem.author}</span>
              </div>
              <div class="full third-700">
                ${starRating(shelfItem.rating)}
                ${shelfItem.review !== null
                ? modal(`itemModal${index}`, shelvesController, html`<article>${shelfItem.review}</article>`, {
                  buttonText: 'My Review',
                  headerText: `${__('review.review_of')} ${shelfItem.name}`,
                })
                : null}
              </div>
            </div>
          </footer>
        </article>`;
      })}
    </section>`,
  ];
}