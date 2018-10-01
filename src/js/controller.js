export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // this.model.getFetch();
    this.view.promise(this.model.getFetch());
    // this.view.getRequest();
    // view.setQuery(this.view.getRequest());


  }

}
