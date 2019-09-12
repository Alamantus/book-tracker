import { ViewController } from '../controller';

export class SearchController extends ViewController {
  constructor(state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'search', {
      lastSearch: undefined,
      done: false,
      results: {
        humans: [],
        series: [],
        works: [],
      },
      openModal: null,
    });

    // If using controller methods in an input's onchange or onclick instance,
    // either bind the class's 'this' instance to the method first...
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  get doneSearching() {
    return this.state.done;
  }

  get results() {
    return this.state.results;
  }

  get hasQuery() {
    return this.appState.query.hasOwnProperty('for') && this.appState.query.for.trim() !== '';
  }

  get openModal() {
    return this.state.openModal;
  }

  set openModal(modalId) {
    this.state.openModal = modalId;
  }

  search() {
    if (this.hasQuery) {
      this.state.done = false;
      this.state.lastSearch = this.appState.query.for;

      const searchTerm = this.appState.query.for.trim();

      return fetch(`/api/search?for=${searchTerm}&lang=${this.appState.language}`)
        .then(response => response.json())
        .then(responseJSON => {
          this.state.results = responseJSON;
          this.state.done = true;
        });
    }
    return Promise.resolve();
  }

  getCovers(inventaireURI) {
    // This should only be callable after results are displayed.
    const workIndex = this.results.works.findIndex(work => work.uri === inventaireURI);
    if (workIndex > -1) { // This should never be false, but just in case...
      if (typeof this.state.results.works[workIndex].covers === 'undefined') {
        // Only fetch covers if not already fetched.
        return fetch(`/api/books/covers?uri=${inventaireURI}&lang=${this.appState.language}`)
          .then(response => response.json())
          .then(responseJSON => {
            this.state.results.works[workIndex].covers = responseJSON;
          });
      }
    }

    return Promise.resolve();
  }
}