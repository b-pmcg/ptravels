import Leaflet from 'leaflet';
import React from 'react';
import PtravelsMap from './ptravels-map';

/*Main react app*/

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/'

const App = () => (
  <div>
    <h2>Panes</h2>
    <PtravelsMap />
  </div>
)

export default App
