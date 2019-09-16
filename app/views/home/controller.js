import { ViewController } from '../controller';

export class HomeController extends ViewController {
  constructor(state, i18n) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, i18n, 'home', {
      recentReviews: [],
      recentUpdates: [],
    });

    // If using controller methods in an input's onchange or onclick instance,
    // either bind the class's 'this' instance to the method first...
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  get recentReviews() {
    return [...this.state.recentReviews];
  }
  get recentUpdates() {
    return [...this.state.recentUpdates];
  }
}