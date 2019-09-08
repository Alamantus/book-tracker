import { ViewController } from '../controller';

export class HomeController extends ViewController {
  constructor(state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'home', {
      messages: [
        'hello',
        'test',
        'yay',
      ],
    });

    // If using controller methods in an input's onchange or onclick instance,
    // either bind the class's 'this' instance to the method first...
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  get messages() {
    return [...this.state.messages];
  }
}