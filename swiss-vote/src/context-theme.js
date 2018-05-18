import { createContext } from 'react';

const { Provider, Consumer } = createContext({
    colors: {
        blue: '#2677bb',
        green: '#007500',
        grey: '#a5a6a9',
        red: '#db2f27',
        orange: '#f67944',
        darkGrey: '#0b3536'
    }
});

export { Provider, Consumer };