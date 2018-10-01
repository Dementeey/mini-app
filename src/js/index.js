import Model from './model';
import View from './view';
import Controller from './controller';

const model = new Model('girls');
const view = new View(model.resultData);


const controller = new Controller(model, view);


console.log(controller);

console.log(model.resultData);
console.log('model');
