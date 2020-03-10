export const showErrorMessage = (text: string, title = null) => {
  console.log(title ? console.log(title, text) : console.log(text));
};
