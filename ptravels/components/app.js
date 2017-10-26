import Leaflet from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PtravelsMap from './ptravels-map';
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
