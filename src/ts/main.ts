import Driver from './driver';

window.onload = () => {
  // get parent element
  const exampleSection = document.querySelector(
    'section.example'
  ) as HTMLElement;

  const example = new Driver('example');
  example.build(exampleSection);
};
