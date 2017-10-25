import Leaflet from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PtravelsMap from './ptravels-map';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(baseTheme);


/*Main react app*/

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/'

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
        <PtravelsMap />
    </MuiThemeProvider>
  </div>
)

export default App
