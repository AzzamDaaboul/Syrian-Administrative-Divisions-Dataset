# Contributing to Syrian Administrative Divisions Dataset

Thank you for your interest in contributing to this project! This document provides guidelines and standards for contributing data to the repository.

## Data Standards

### Naming Conventions

- **English Names**: Use official transliterations from Arabic. Follow standard romanization systems (e.g., UN or ISO standards)
- **Arabic Names**: Use proper Arabic script with appropriate diacritics when available
- **Consistency**: Maintain consistent naming across all data files

### Data Format

#### JSON Structure

All JSON files should follow these standards:

```json
{
  "Name": "English name",
  "NameAr": "الاسم العربي",
  "Code": "STANDARD_CODE",
  "AdditionalFields": "value"
}
```

- Use camelCase for field names (except when maintaining compatibility with existing fields)
- Ensure proper UTF-8 encoding for Arabic text
- Format numbers consistently (no quotes for numeric values)
- Use 6 decimal places for geographic coordinates

### Geographic Data

- **Coordinates**: Use WGS84 datum (EPSG:4326)
- **Latitude**: Must be between 32° and 38° North
- **Longitude**: Must be between 35° and 43° East
- **Precision**: Use at least 5 decimal places for accuracy

### Administrative Divisions

#### Hierarchy

1. **Governorate** (محافظة): Top-level administrative division
2. **District** (منطقة): Second-level division within governorate
3. **Sub-district/Municipality** (ناحية/بلدية): Third-level division

### Required Fields

#### Governorate Data
- `Name`: English name (required)
- `NameAr`: Arabic name (required)
- `Code`: ISO 3166-2 code or standard abbreviation (required)
- `Capital`: Capital city name (required)
- `Area_km2`: Area in square kilometers (optional but recommended)
- `Population`: Population count (optional but recommended)
- `PopulationYear`: Year of population data (required if population provided)

#### Municipality/Delegation Data
- `Name`: English name (required)
- `NameAr`: Arabic name (required)
- `PostalCode`: Postal code (required)
- `Latitude`: Latitude coordinate (required)
- `Longitude`: Longitude coordinate (required)

## Data Sources

When contributing data, please:

1. **Cite Sources**: Always provide references for data sources
2. **Use Reliable Sources**: Prefer official government statistics, UN data, or reputable organizations
3. **Date Your Data**: Include the year or date when data was collected
4. **Update Metadata**: Add source information to `data-metadata.json`

### Recommended Sources

- Syrian Central Bureau of Statistics (http://cbssyr.sy/)
- UN Office for the Coordination of Humanitarian Affairs (OCHA)
- OpenStreetMap (https://www.openstreetmap.org/)
- GeoNames (https://www.geonames.org/)
- World Bank Open Data
- ISO 3166-2 Country Subdivision Codes

## Validation

Before submitting data, please:

1. **Validate JSON**: Ensure all JSON files are valid using a JSON validator
2. **Check Encoding**: Verify UTF-8 encoding for Arabic text
3. **Test Coordinates**: Verify coordinates are within Syria's boundaries
4. **Run Validation Script**: Execute `node validate-data.js` (if available)

## Submission Process

### For Minor Updates

1. Fork the repository
2. Create a feature branch: `git checkout -b add-[description]`
3. Make your changes
4. Commit with clear message: `git commit -m "Add: [description of addition]"`
5. Push to your fork: `git push origin add-[description]`
6. Create a Pull Request

### For Major Updates

1. Open an Issue first to discuss the proposed changes
2. Wait for maintainer feedback
3. Follow the minor update process after approval

## Pull Request Guidelines

- **Title**: Use descriptive titles (e.g., "Add population data for Homs districts")
- **Description**: Explain what data was added/changed and why
- **Sources**: List all data sources used
- **Testing**: Describe how you validated the data

## Code of Conduct

- Be respectful and constructive
- Focus on factual, verifiable data
- Avoid political or controversial content
- Maintain neutrality in descriptions

## Data Quality Checklist

Before submitting, ensure:

- [ ] All required fields are present
- [ ] Names are spelled correctly in both English and Arabic
- [ ] Coordinates fall within valid ranges
- [ ] Numbers are properly formatted (no quotes)
- [ ] JSON files are properly formatted and valid
- [ ] UTF-8 encoding is used
- [ ] Data sources are cited
- [ ] Metadata is updated

## Questions?

If you have questions about contributing, please:

1. Check existing Issues for similar questions
2. Review this document thoroughly
3. Open a new Issue with the "question" label

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

Thank you for helping improve this dataset!
