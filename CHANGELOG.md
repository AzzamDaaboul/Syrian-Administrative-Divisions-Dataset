# Changelog

All notable changes to the Syrian Administrative Divisions Dataset will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-10-02

### Added
- **governorates-extended.json**: New comprehensive data file with extended governorate information
  - Population data (2019 estimates)
  - Area measurements in km²
  - Capital cities for each governorate
  - Phone area codes
  - ISO 3166-2 codes
  - District-level information with populations
  - Bilingual descriptions (English and Arabic)
  
- **data-metadata.json**: Dataset metadata file
  - Data sources and references
  - Dataset version information
  - Coverage statistics
  - Data quality indicators
  - Maintainer information

- **statistics.json**: Comprehensive statistical summary
  - Total area and population figures
  - Governorate rankings by area and population
  - Population density calculations
  - Percentage distributions
  - Phone code mappings

- **CONTRIBUTING.md**: Contribution guidelines
  - Data standards and formatting rules
  - Geographic data specifications
  - Validation requirements
  - Submission process
  - Data quality checklist

- **CHANGELOG.md**: This file to track all dataset changes

### Enhanced
- README.md updated with:
  - New data files documentation
  - Enhanced features list
  - Data dictionary section
  - Statistics and insights
  - Usage examples
  - Contributing guidelines reference

## [1.0.0] - Previous Release

### Initial Release
- Basic governorate and delegation data (state-municipality.json)
- Alternative formatting (state-municipality-areas.json)
- GeoJSON boundary data
- Interactive map visualization (index.html)
- REST API server (server.js)
- Search functionality (search.js)
- Data normalization script (normalize-data.js)
- Basic README documentation

## Data Sources

All data additions are sourced from:
- Syrian Central Bureau of Statistics (2019)
- OpenStreetMap (2024)
- GeoNames database
- ISO 3166-2 standards

## Notes

- Population figures are pre-conflict estimates and may not reflect current demographics
- Administrative boundaries may have changed due to ongoing regional situations
- This dataset is maintained for educational and development purposes
