import { app } from './createApp';

export function doAction(namespace, method, payload, dispatch = app._store.dispatch) {
  dispatch({
    type: method?`${namespace}/${method}`:`${namespace}`,
    payload: payload
  })
}

export function getState(namespace, store = app._store) {
  if (namespace) return store.getState()[namespace];
  else store.getState();
}

export function getModel(namespace) {
  for (let i=0;i<app._models.length;i++) if (app._models[i].namespace === namespace) return app._models[i];
  return null;
}

export function hasModel(namespace) {
  return app._models.some(model => model.namespace === namespace);
}

const cached = {};
export function registerModel(model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}