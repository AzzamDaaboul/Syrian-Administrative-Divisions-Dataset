# Syrian Administrative Divisions Dataset

## Overview

This repository contains comprehensive data on Syrian administrative divisions, including governorates, municipalities, and geographic coordinates. The data is provided in multiple formats to support various use cases.

## Data Files

- **state-municipality.json**: Contains detailed information about Syrian governorates and their delegations, including Arabic names, postal codes, and geographic coordinates.
- **state-municipality-areas.json**: Similar data with alternative formatting and additional area details.
- **syria_administrative_province_state_boundary.geojson**: GeoJSON data with administrative boundaries for mapping applications.

## Features

- Complete list of all 14 Syrian governorates
- Detailed information on municipalities and delegations
- Bilingual support (English and Arabic)
- Geographic coordinates for mapping
- Administrative boundaries in GeoJSON format
- Postal codes for each area

## Usage

### Interactive Map

Open `index.html` in your browser to view an interactive map of Syrian administrative divisions.

### API

Start the server to access the data through a REST API:

```bash
npm install
node server.js
```

## Structure

*   **Governorate Level:**
    *   `Name`: English name
    *   `NameAr`: Arabic name
    *   `Delegations`: Array of Delegation objects

*   **Delegation Object:**
    *   `Name`: English name (often with specific locality)
    *   `NameAr`: Arabic name
    *   `PostalCode`: Postal code
    *   `Latitude`: Latitude
    *   `Longitude`: Longitude

## Purpose

Useful for location-based applications, geocoding, and administrative referencing in Syria.
