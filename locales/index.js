//library
import LocalizedStrings from 'react-native-localization';

//Translations
import en from './en.json';
import vi from './vi.json';


let strings = new LocalizedStrings({
  
    "en":en,
    "vi":vi
});


export const Translate = strings;
