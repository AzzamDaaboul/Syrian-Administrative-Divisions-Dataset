# Syrian Administrative Divisions Dataset

## Overview

This repository contains comprehensive data on Syrian administrative divisions, including governorates, districts, municipalities, and geographic coordinates. The data is provided in multiple formats to support various use cases, including GIS applications, demographic analysis, and location-based services.

[![Data Validation](https://img.shields.io/badge/data-validated-brightgreen)](validate-data.js)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-Open%20Data-green)](LICENSE)

## Quick Stats

- **14 Governorates** covering 185,180 km²
- **65+ Districts** with detailed information
- **67 Municipalities/Delegations** with coordinates
- **Population Data**: ~21.6 million (2019 estimates)
- **Bilingual**: Full English and Arabic support

## Data Files

### Core Data Files

- **state-municipality.json** (17 KB)
  - Basic governorate and delegation data
  - Postal codes and geographic coordinates
  - 67 municipalities with precise locations

- **state-municipality-areas.json** (13 KB)
  - Alternative formatting of governorate data
  - Additional area details and codes

- **governorates-extended.json** (13 KB) 🆕
  - Comprehensive governorate information
  - Population and area statistics
  - District-level breakdowns
  - Phone area codes and ISO codes
  - Bilingual descriptions

- **syria_administrative_province_state_boundary.geojson** (377 KB)
  - Official administrative boundaries
  - GeoJSON format for mapping applications
  - Compatible with Leaflet, Mapbox, and other GIS tools

### Supporting Files

- **statistics.json** 🆕
  - Comprehensive statistical summary
  - Population and area rankings
  - Density calculations and distributions

- **data-metadata.json** 🆕
  - Dataset information and data sources
  - Version history and update dates
  - Data quality indicators

## Features

### Geographic Data
- ✅ Complete list of all 14 Syrian governorates
- ✅ Detailed information on 65+ districts
- ✅ 67 municipalities with precise coordinates
- ✅ Administrative boundaries in GeoJSON format
- ✅ Coordinates accurate to 5 decimal places

### Demographics & Statistics
- 📊 Population data (2019 estimates)
- 📊 Area measurements in km²
- 📊 Population density calculations
- 📊 Capital cities for each governorate

### Localization
- 🌍 Bilingual support (English and Arabic)
- 🌍 Proper Arabic script with UTF-8 encoding
- 🌍 Official transliterations

### Infrastructure Data
- 📞 Phone area codes for each governorate
- 📮 Postal codes for all municipalities
- 🔢 ISO 3166-2 codes for governorates

## Usage

### Interactive Map

Open `index.html` in your browser to view an interactive map of Syrian administrative divisions with clickable regions.

### REST API

Start the server to access the data through a REST API:

```bash
npm install
node server.js
```

The API will be available at `http://localhost:3000` with the following endpoints:

- `GET /api/governorates` - Get all governorates with delegations
- `GET /api/governorates/:governorate` - Get specific governorate data
- `GET /api/boundaries` - Get GeoJSON boundary data

### Command Line

#### Data Validation

Run the validation script to check data integrity:

```bash
node validate-data.js
```

#### Data Normalization

Merge and normalize data from multiple sources:

```bash
node normalize-data.js
```

### Programming Examples

#### JavaScript/Node.js

```javascript
const fs = require('fs');

// Load extended governorate data
const governorates = JSON.parse(
  fs.readFileSync('governorates-extended.json', 'utf8')
);

// Find a specific governorate
const damascus = governorates.find(g => g.Code === 'DI');
console.log(`${damascus.Name} - Population: ${damascus.Population.toLocaleString()}`);

// Get all coastal governorates
const coastal = governorates.filter(g => 
  g.Description.includes('coast') || g.Description.includes('port')
);
```

#### Python

```python
import json

# Load governorate data
with open('governorates-extended.json', 'r', encoding='utf-8') as f:
    governorates = json.load(f)

# Calculate total population
total_pop = sum(g['Population'] for g in governorates)
print(f"Total Population: {total_pop:,}")

# Sort by area
by_area = sorted(governorates, key=lambda g: g['Area_km2'], reverse=True)
print(f"Largest: {by_area[0]['Name']} ({by_area[0]['Area_km2']:,} km²)")
```

#### Fetch API (Browser)

```javascript
// Fetch governorate data from API
fetch('http://localhost:3000/api/governorates')
  .then(response => response.json())
  .then(data => {
    data.forEach(gov => {
      console.log(`${gov.Name} (${gov.NameAr}): ${gov.Delegations.length} delegations`);
    });
  });
```

## Data Structure

### Governorate Level (governorates-extended.json)

```json
{
  "Name": "Damascus",
  "NameAr": "دمشق",
  "Code": "DI",
  "ISO3166_2": "SY-DI",
  "Capital": "Damascus",
  "CapitalAr": "دمشق",
  "Area_km2": 105,
  "Population": 2079000,
  "PopulationYear": 2019,
  "PhoneCode": "011",
  "Districts": [...],
  "Description": "English description",
  "DescriptionAr": "الوصف العربي"
}
```

### Municipality/Delegation Level (state-municipality.json)

```json
{
  "Name": "DAMASCUS",
  "NameAr": "دمشق",
  "Value": "DAMASCUS",
  "Delegations": [
    {
      "Name": "OLD DAMASCUS (Al-Hamidiyah)",
      "NameAr": "دمشق القديمة (الحميدية)",
      "Value": "OLD DAMASCUS",
      "PostalCode": "11011",
      "Latitude": 33.511539,
      "Longitude": 36.304386
    }
  ]
}
```

### Field Descriptions

#### Governorate Fields
- `Name`: Official English name
- `NameAr`: Official Arabic name
- `Code`: Two-letter governorate code
- `ISO3166_2`: ISO 3166-2 subdivision code (format: SY-XX)
- `Capital`: Capital city name in English
- `CapitalAr`: Capital city name in Arabic
- `Area_km2`: Area in square kilometers
- `Population`: Population estimate
- `PopulationYear`: Year of population estimate
- `PhoneCode`: Telephone area code
- `Districts`: Array of district objects with populations
- `Description`: English description of the governorate
- `DescriptionAr`: Arabic description of the governorate

#### Delegation Fields
- `Name`: English name (often includes locality)
- `NameAr`: Arabic name
- `Value`: Standardized code value
- `PostalCode`: Postal/ZIP code
- `Latitude`: Latitude coordinate (WGS84)
- `Longitude`: Longitude coordinate (WGS84)

## Statistics

### Largest Governorates by Area

| Rank | Governorate | Area (km²) | % of Total |
|------|------------|------------|------------|
| 1 | Homs | 42,223 | 22.8% |
| 2 | Deir ez-Zor | 33,060 | 17.9% |
| 3 | Al-Hasakah | 23,334 | 12.6% |
| 4 | Raqqa | 19,616 | 10.6% |
| 5 | Aleppo | 18,482 | 10.0% |

### Largest Governorates by Population

| Rank | Governorate | Population | % of Total |
|------|------------|------------|------------|
| 1 | Aleppo | 4,868,000 | 22.5% |
| 2 | Rural Damascus | 2,836,000 | 13.1% |
| 3 | Damascus | 2,079,000 | 9.6% |
| 4 | Homs | 1,803,000 | 8.3% |
| 5 | Hama | 1,628,000 | 7.5% |

*Population data from 2019 estimates*

### Phone Area Codes

| Code | Governorate(s) |
|------|---------------|
| 011 | Damascus, Rural Damascus |
| 021 | Aleppo |
| 022 | Raqqa |
| 023 | Idlib |
| 031 | Homs |
| 033 | Hama |
| 041 | Latakia |
| 043 | Tartus |
| 014 | Quneitra |
| 015 | Daraa |
| 016 | As-Suwayda |
| 051 | Deir ez-Zor |
| 052 | Al-Hasakah |

## Data Quality & Sources

### Data Sources

This dataset is compiled from multiple authoritative sources:

- **Syrian Central Bureau of Statistics** - Population and administrative data (2019)
- **OpenStreetMap** - Geographic coordinates and boundaries (2024)
- **GeoNames** - Place names and location data
- **ISO 3166-2** - Standard subdivision codes
- **UN OCHA** - Humanitarian data and administrative boundaries

### Data Quality

- ✅ **Completeness**: All 14 governorates covered with comprehensive data
- ✅ **Accuracy**: Geographic coordinates accurate to 5 decimal places (~1m precision)
- ✅ **Consistency**: Standardized naming and formatting across all files
- ✅ **Validation**: Automated validation script ensures data integrity
- ⚠️ **Timeliness**: Population data from 2019 may not reflect recent changes

### Important Notes

1. **Population Data**: Figures are pre-2020 estimates and may not reflect demographic changes due to ongoing conflicts and displacement
2. **Administrative Changes**: Some areas have undergone administrative reorganization
3. **Boundaries**: Geographic boundaries are approximations for reference purposes
4. **Neutrality**: Data is presented factually without political bias

## Use Cases

This dataset is useful for:

- 📱 **Location-based applications** - Geocoding and address validation
- 🗺️ **GIS and Mapping** - Creating administrative boundary maps
- 📊 **Data Analysis** - Demographic and geographic studies
- 🏛️ **Government Services** - Administrative reference systems
- 📚 **Education** - Teaching geography and demographics
- 🌐 **Web Development** - Country/region selector dropdowns
- 📦 **Logistics** - Delivery zone planning
- 🏥 **Humanitarian Aid** - Resource allocation planning

## Contributing

We welcome contributions to improve and expand this dataset! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Data standards and formatting guidelines
- How to submit updates and corrections
- Validation requirements
- Code of conduct

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Validation

To ensure data quality, run the validation script:

```bash
node validate-data.js
```

This checks:
- JSON validity
- Required fields presence
- Coordinate bounds
- Data type consistency
- Cross-file consistency

## License

This dataset is provided as Open Data for public use. When using this data, please:
- Attribute the sources appropriately
- Do not use for illegal purposes
- Verify data accuracy for critical applications

## Acknowledgments

Special thanks to:
- Syrian Central Bureau of Statistics
- OpenStreetMap contributors
- All community contributors

## Related Projects

- [Syria GeoJSON](https://github.com/codeforsyria/syria-geojson) - Additional Syrian geographic data
- [Arab Administrative Divisions](https://github.com/homaily/Arab-Administrative-Divisions) - Broader regional data

## Support

For questions, issues, or suggestions:
- 📝 Open an [Issue](https://github.com/AzzamDaaboul/Syrian-Administrative-Divisions-Dataset/issues)
- 💬 Start a [Discussion](https://github.com/AzzamDaaboul/Syrian-Administrative-Divisions-Dataset/discussions)
- 📧 Contact the maintainer through GitHub

---

**Last Updated**: October 2024 | **Version**: 2.0.0 | **Data Year**: 2019-2024
