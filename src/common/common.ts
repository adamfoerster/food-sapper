import { writable, Writable } from "svelte/store";

export interface IAlert {
  title?: string;
  text: string;
  duration?: number;
}
export interface IDanger {
  title?: string;
  text: string;
  duration?: number;
}
export type ISnackbar = IAlert | IDanger;

export const showErrorMessage = (text: string, title = null) => {
  console.log(title ? console.log(title, text) : console.log(text));
};

const _alert: Writable<IAlert> = writable(null);
const _danger: Writable<IDanger>  = writable(null);

export const snackStore = () => {
  return {
    alert$: _alert.subscribe,
    danger$: _danger.subscribe,
    setAlert: (alert: IAlert) => _alert.set(alert),
    setDanger: (danger: IDanger) => _danger.set(danger)
  };
};