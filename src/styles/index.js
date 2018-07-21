import black from './skin-black';
import blackLight from './skin-black-light';
import blue from './skin-blue';
import blueLight from './skin-blue-light';
import green from './skin-green';
import greenLight from './skin-green-light';
import purple from './skin-purple';
import purpleLight from './skin-purple-light';
import red from './skin-red';
import redLight from './skin-red-light';
import yellow from './skin-yellow';
import yellowLight from './skin-yellow-light';

const themes = {
  'skin-black': black,
  'skin-black-light': blackLight,
  'skin-blue': blue,
  'skin-blue-light': blueLight,
  'skin-green': green,
  'skin-green-light': greenLight,
  'skin-purple': purple,
  'skin-purple-light': purpleLight,
  'skin-red': red,
  'skin-red-light': redLight,
  'skin-yellow': yellow,
  'skin-yellow-light': yellowLight,
};

const defaultTheme = 'skin-purple';

export default React.createContext({
  theme: themes[defaultTheme], // default value
  toggleTheme: () => { console.warn('cannot toogle theme before initializing it') },
  getTheme: (name) => name ? themes[name] || themes[defaultTheme] : themes // getOne.. or getAll
});
