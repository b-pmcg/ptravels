/* global describe, expect, it, jest */

import Leaflet from 'leaflet'
import React from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'

import { Map, Marker, TileLayer } from '../src/'

describe('Marker', () => {
  it('adds the marker to the map', () => {
    Leaflet.Marker = jest.fn()
    const position = [0, 0]

    renderIntoDocument(
      <Map center={position} zoom={10}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </Map>,
    )

    expect(Leaflet.Marker.mock.calls[0][0]).toBe(position)
  })
})