# Examples

This directory contains code examples demonstrating how to use the Syrian Administrative Divisions Dataset in different programming languages.

## Available Examples

### 1. Python Data Analysis (`data_analysis.py`)

A comprehensive Python script that demonstrates:
- Loading and parsing the dataset
- Calculating population density
- Finding governorates by various criteria
- Analyzing districts and municipalities
- Statistical analysis and rankings

**Requirements:** Python 3.6+

**Usage:**
```bash
cd /path/to/Syrian-Administrative-Divisions-Dataset
python3 examples/data_analysis.py
```

**Features Demonstrated:**
- Basic statistics (total population, area, averages)
- Population density calculations
- Top 5 rankings (by population, area, density)
- District analysis
- Phone code lookups
- Filtering by description keywords

---

### 2. Node.js Examples (`node_examples.js`)

Interactive Node.js examples showing:
- Finding governorates by name
- Getting all municipalities in a governorate
- Statistical calculations
- Finding nearest municipality to coordinates
- Grouping by phone code
- Filtering with custom criteria
- Data export for different purposes

**Requirements:** Node.js 12+

**Usage:**
```bash
cd /path/to/Syrian-Administrative-Divisions-Dataset
node examples/node_examples.js
```

**Features Demonstrated:**
- Data loading and parsing
- Search and filter operations
- Geographic calculations (nearest point)
- Data transformation and export
- Complex queries across multiple datasets

---

## Common Use Cases

### Finding a Governorate

**Python:**
```python
governorates = json.load(open('governorates-extended.json'))
aleppo = next(g for g in governorates if g['Name'] == 'Aleppo')
print(f"Population: {aleppo['Population']:,}")
```

**JavaScript:**
```javascript
const governorates = require('./governorates-extended.json');
const aleppo = governorates.find(g => g.Name === 'Aleppo');
console.log(`Population: ${aleppo.Population.toLocaleString()}`);
```

---

### Getting Municipalities with Coordinates

**Python:**
```python
municipalities = json.load(open('state-municipality.json'))
damascus = next(g for g in municipalities if g['Name'] == 'DAMASCUS')
for delegation in damascus['Delegations']:
    print(f"{delegation['Name']}: {delegation['Latitude']}, {delegation['Longitude']}")
```

**JavaScript:**
```javascript
const municipalities = require('./state-municipality.json');
const damascus = municipalities.find(g => g.Name === 'DAMASCUS');
damascus.Delegations.forEach(d => {
    console.log(`${d.Name}: ${d.Latitude}, ${d.Longitude}`);
});
```

---

### Calculating Statistics

**Python:**
```python
statistics = json.load(open('statistics.json'))['statistics']
print(f"Total Population: {statistics['totalPopulation']:,}")
print(f"Most Populous: {statistics['largestGovernorateByPopulation']['name']}")
```

**JavaScript:**
```javascript
const stats = require('./statistics.json').statistics;
console.log(`Total Population: ${stats.totalPopulation.toLocaleString()}`);
console.log(`Most Populous: ${stats.largestGovernorateByPopulation.name}`);
```

---

## Creating Your Own Examples

When creating examples that use this dataset:

1. **Always use UTF-8 encoding** when reading files to properly handle Arabic text
2. **Validate coordinates** are within Syria's bounds (lat: 32-38, lon: 35-43)
3. **Handle missing data** gracefully - not all fields may be present in all records
4. **Cite the data source** when publishing results

---

## Contributing Examples

We welcome contributions of examples in other languages! Please submit a pull request with:

- Code file in the appropriate language
- Clear comments explaining what the code does
- Usage instructions
- Any special requirements or dependencies

Supported languages we'd like to see examples for:
- JavaScript (Browser/Frontend)
- R
- PHP
- Java
- C#
- Go
- Ruby

---

## API Examples

If you're running the API server (`node server.js`), you can access the data via HTTP:

**cURL:**
```bash
# Get all governorates
curl http://localhost:3000/api/governorates-extended

# Get statistics
curl http://localhost:3000/api/statistics

# Get metadata
curl http://localhost:3000/api/metadata
```

**Python (requests):**
```python
import requests

response = requests.get('http://localhost:3000/api/governorates-extended')
governorates = response.json()
print(f"Loaded {len(governorates)} governorates")
```

**JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/governorates-extended')
    .then(response => response.json())
    .then(data => console.log(`Loaded ${data.length} governorates`));
```

---

## Additional Resources

- [Main README](../README.md) - Full documentation
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [Data Validation](../validate-data.js) - Data validation script
- [API Documentation](../server.js) - REST API endpoints
