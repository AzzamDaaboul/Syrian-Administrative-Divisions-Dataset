# Quick Reference Guide

## Dataset Files Overview

| File | Size | Records | Description |
|------|------|---------|-------------|
| `state-municipality.json` | 17 KB | 14 governorates, 67 delegations | Basic governorate and delegation data with coordinates |
| `governorates-extended.json` | 13 KB | 14 governorates, 65 districts | Extended data with population, area, phone codes, ISO codes |
| `state-municipality-areas.json` | 13 KB | 14 governorates | Alternative format with area details |
| `syria_administrative_province_state_boundary.geojson` | 377 KB | 14 features | GeoJSON boundaries for mapping |
| `statistics.json` | 4 KB | - | Comprehensive statistics and rankings |
| `data-metadata.json` | 3 KB | - | Dataset metadata and sources |

## Quick Stats

- **Total Governorates:** 14
- **Total Districts:** 65+
- **Total Municipalities:** 67
- **Total Population:** 21.6 million (2019)
- **Total Area:** 185,180 km²
- **Data Year:** 2019 (population), 2024 (boundaries)

## Governorates Quick List

| # | Name | Arabic | Code | Population | Area (km²) | Capital |
|---|------|--------|------|------------|------------|---------|
| 1 | Damascus | دمشق | DI | 2,079,000 | 105 | Damascus |
| 2 | Rural Damascus | ريف دمشق | RD | 2,836,000 | 18,032 | Douma |
| 3 | Aleppo | حلب | HL | 4,868,000 | 18,482 | Aleppo |
| 4 | Homs | حمص | HM | 1,803,000 | 42,223 | Homs |
| 5 | Hama | حماة | HI | 1,628,000 | 8,883 | Hama |
| 6 | Latakia | اللاذقية | LA | 1,008,000 | 2,297 | Latakia |
| 7 | Tartus | طرطوس | TA | 797,000 | 1,890 | Tartus |
| 8 | Idlib | إدلب | ID | 1,501,000 | 6,097 | Idlib |
| 9 | Deir ez-Zor | دير الزور | DY | 1,239,000 | 33,060 | Deir ez-Zor |
| 10 | Raqqa | الرقة | RA | 944,000 | 19,616 | Raqqa |
| 11 | Al-Hasakah | الحسكة | HA | 1,512,000 | 23,334 | Al-Hasakah |
| 12 | Daraa | درعا | DR | 1,027,000 | 3,730 | Daraa |
| 13 | As-Suwayda | السويداء | SU | 370,000 | 5,550 | As-Suwayda |
| 14 | Quneitra | القنيطرة | QU | 90,000 | 1,861 | Quneitra |

## Phone Area Codes

| Code | Governorate(s) |
|------|---------------|
| 011 | Damascus, Rural Damascus |
| 014 | Quneitra |
| 015 | Daraa |
| 016 | As-Suwayda |
| 021 | Aleppo |
| 022 | Raqqa |
| 023 | Idlib |
| 031 | Homs |
| 033 | Hama |
| 041 | Latakia |
| 043 | Tartus |
| 051 | Deir ez-Zor |
| 052 | Al-Hasakah |

## ISO 3166-2 Codes

| Code | Governorate |
|------|------------|
| SY-DI | Damascus |
| SY-RD | Rural Damascus |
| SY-HL | Aleppo |
| SY-HM | Homs |
| SY-HI | Hama |
| SY-LA | Latakia |
| SY-TA | Tartus |
| SY-ID | Idlib |
| SY-DY | Deir ez-Zor |
| SY-RA | Raqqa |
| SY-HA | Al-Hasakah |
| SY-DR | Daraa |
| SY-SU | As-Suwayda |
| SY-QU | Quneitra |

## API Endpoints

When running `node server.js` on port 3000:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/governorates` | GET | All governorates with delegations (basic) |
| `/api/governorates/:governorate` | GET | Specific governorate by value |
| `/api/governorates-extended` | GET | Extended governorate data |
| `/api/statistics` | GET | Statistical summary |
| `/api/metadata` | GET | Dataset metadata |
| `/api/boundaries` | GET | GeoJSON boundaries |

## Command Line Tools

```bash
# Install dependencies
npm install

# Start API server
node server.js

# Validate data
node validate-data.js

# Normalize data
node normalize-data.js

# Run Python example
python3 examples/data_analysis.py

# Run Node.js examples
node examples/node_examples.js
```

## Common Queries

### Find governorate by name (JavaScript)
```javascript
const data = require('./governorates-extended.json');
const aleppo = data.find(g => g.Name === 'Aleppo');
```

### Get all delegations in Damascus (JavaScript)
```javascript
const data = require('./state-municipality.json');
const damascus = data.find(g => g.Name === 'DAMASCUS');
const delegations = damascus.Delegations;
```

### Calculate total population (Python)
```python
import json
data = json.load(open('governorates-extended.json'))
total = sum(g['Population'] for g in data)
```

### Find by phone code (JavaScript)
```javascript
const data = require('./governorates-extended.json');
const byCode = data.filter(g => g.PhoneCode === '011');
```

## Data Fields Reference

### governorates-extended.json
- `Name` - English name
- `NameAr` - Arabic name
- `Code` - Two-letter code
- `ISO3166_2` - ISO subdivision code (SY-XX)
- `Capital` - Capital city
- `CapitalAr` - Capital in Arabic
- `Area_km2` - Area in square kilometers
- `Population` - Population count
- `PopulationYear` - Year of estimate (2019)
- `PhoneCode` - Telephone area code
- `Districts` - Array of districts with populations
- `Description` - English description
- `DescriptionAr` - Arabic description

### state-municipality.json
- `Name` - Governorate name
- `NameAr` - Arabic name
- `Value` - Standardized value
- `Delegations` - Array of delegation objects
  - `Name` - Delegation name
  - `NameAr` - Arabic name
  - `Value` - Standardized value
  - `PostalCode` - Postal code
  - `Latitude` - Latitude (WGS84)
  - `Longitude` - Longitude (WGS84)

## File Locations

```
Syrian-Administrative-Divisions-Dataset/
├── README.md                    # Main documentation
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── package.json                 # npm package file
├── .gitignore                   # Git ignore rules
├── index.html                   # Interactive map
├── demo.html                    # Data showcase
├── server.js                    # REST API server
├── validate-data.js             # Data validator
├── normalize-data.js            # Data normalizer
├── search.js                    # Search functionality
├── state-municipality.json      # Basic data
├── state-municipality-areas.json # Alternative format
├── governorates-extended.json   # Extended data
├── statistics.json              # Statistics
├── data-metadata.json           # Metadata
├── syria_administrative_province_state_boundary.geojson # Boundaries
└── examples/                    # Code examples
    ├── README.md                # Examples documentation
    ├── data_analysis.py         # Python examples
    └── node_examples.js         # Node.js examples
```

## Support & Documentation

- **Full Documentation:** [README.md](README.md)
- **Data Standards:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code Examples:** [examples/README.md](examples/README.md)
- **Version History:** [CHANGELOG.md](CHANGELOG.md)
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
