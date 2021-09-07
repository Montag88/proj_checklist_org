export default function configureTheme(theme) {
  let currentTheme = {};
  switch (theme) {
    case 'light':
      currentTheme = {
        bg: 'white',
        accent: 'royalblue',
        text: 'black',
        hover: 'lightgrey',
        scrollbar: 'rgba(0,0,0,.3)',
        svg: 'black',
      };
      break;
    case 'dark':
      currentTheme = {
        bg: 'black',
        accent: 'forestgreen',
        text: 'white',
        hover: 'darkgrey',
        scrollbar: 'rgba(200,200,200,.3)',
        svg: 'gold',
      };
      break;
    default:
  }
  return currentTheme;
}
