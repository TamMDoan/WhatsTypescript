// Import stylesheets
import './style.css';
//console.log("Testing ts");

const form: HTMLFormElement = document.querySelector('#defineform')!;

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/test').then(
  res => console.log(res)
)

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  return false; // prevent reload
};