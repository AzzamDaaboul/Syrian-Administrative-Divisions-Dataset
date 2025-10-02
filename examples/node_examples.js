// Example: Using the Syrian Administrative Divisions dataset in Node.js
// This demonstrates various ways to query and use the data

const fs = require('fs');

// Load the datasets
const governoratesExtended = JSON.parse(fs.readFileSync('governorates-extended.json', 'utf8'));
const stateMunicipality = JSON.parse(fs.readFileSync('state-municipality.json', 'utf8'));
const statistics = JSON.parse(fs.readFileSync('statistics.json', 'utf8'));

console.log('Syrian Administrative Divisions - Node.js Examples\n');
console.log('='.repeat(60));

// Example 1: Find a governorate by name
function findGovernorateByName(name) {
    return governoratesExtended.find(g => 
        g.Name.toLowerCase().includes(name.toLowerCase()) ||
        g.NameAr.includes(name)
    );
}

const aleppo = findGovernorateByName('aleppo');
console.log('\nExample 1: Find Governorate by Name');
console.log('-'.repeat(60));
console.log(`Name: ${aleppo.Name} (${aleppo.NameAr})`);
console.log(`Capital: ${aleppo.Capital}`);
console.log(`Population: ${aleppo.Population.toLocaleString()}`);
console.log(`Area: ${aleppo.Area_km2.toLocaleString()} km²`);
console.log(`Phone Code: +963 ${aleppo.PhoneCode}`);
console.log(`Districts: ${aleppo.Districts.length}`);

// Example 2: Get all municipalities in a governorate
function getMunicipalities(governorateName) {
    const gov = stateMunicipality.find(g => 
        g.Name.toLowerCase() === governorateName.toLowerCase()
    );
    return gov ? gov.Delegations : [];
}

const damascusMunicipalities = getMunicipalities('DAMASCUS');
console.log('\n\nExample 2: Get All Municipalities in Damascus');
console.log('-'.repeat(60));
damascusMunicipalities.slice(0, 5).forEach((m, idx) => {
    console.log(`${idx + 1}. ${m.Name} (${m.NameAr})`);
    console.log(`   Postal Code: ${m.PostalCode}`);
    console.log(`   Location: ${m.Latitude.toFixed(4)}, ${m.Longitude.toFixed(4)}`);
});
console.log(`... and ${damascusMunicipalities.length - 5} more`);

// Example 3: Calculate statistics
function calculateAveragePopulation() {
    const total = governoratesExtended.reduce((sum, g) => sum + g.Population, 0);
    return Math.round(total / governoratesExtended.length);
}

console.log('\n\nExample 3: Calculate Statistics');
console.log('-'.repeat(60));
console.log(`Average Population per Governorate: ${calculateAveragePopulation().toLocaleString()}`);
console.log(`Most Populous: ${statistics.statistics.largestGovernorateByPopulation.name}`);
console.log(`Least Populous: ${statistics.statistics.smallestGovernorateByPopulation.name}`);
console.log(`Most Dense: ${statistics.statistics.mostDenselyPopulated.name} (${statistics.statistics.mostDenselyPopulated.density_per_km2.toLocaleString()} per km²)`);

// Example 4: Find nearest municipality to coordinates
function findNearestMunicipality(lat, lon) {
    let nearest = null;
    let minDistance = Infinity;
    
    stateMunicipality.forEach(gov => {
        gov.Delegations.forEach(del => {
            const distance = Math.sqrt(
                Math.pow(del.Latitude - lat, 2) + 
                Math.pow(del.Longitude - lon, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearest = {
                    ...del,
                    governorate: gov.Name,
                    distance: distance
                };
            }
        });
    });
    
    return nearest;
}

// Example coordinates (roughly central Syria)
const targetLat = 35.0;
const targetLon = 38.0;
const nearest = findNearestMunicipality(targetLat, targetLon);

console.log('\n\nExample 4: Find Nearest Municipality to Coordinates');
console.log('-'.repeat(60));
console.log(`Target Coordinates: ${targetLat}, ${targetLon}`);
console.log(`Nearest: ${nearest.Name} (${nearest.NameAr})`);
console.log(`Governorate: ${nearest.governorate}`);
console.log(`Actual Location: ${nearest.Latitude.toFixed(4)}, ${nearest.Longitude.toFixed(4)}`);

// Example 5: Group governorates by phone code
function groupByPhoneCode() {
    const grouped = {};
    governoratesExtended.forEach(g => {
        if (!grouped[g.PhoneCode]) {
            grouped[g.PhoneCode] = [];
        }
        grouped[g.PhoneCode].push(g.Name);
    });
    return grouped;
}

const phoneGroups = groupByPhoneCode();
console.log('\n\nExample 5: Governorates Grouped by Phone Code');
console.log('-'.repeat(60));
Object.entries(phoneGroups).sort().forEach(([code, govs]) => {
    console.log(`+963 ${code}: ${govs.join(', ')}`);
});

// Example 6: Filter governorates by criteria
function filterGovernorates(criteria) {
    return governoratesExtended.filter(g => {
        if (criteria.minPopulation && g.Population < criteria.minPopulation) return false;
        if (criteria.maxPopulation && g.Population > criteria.maxPopulation) return false;
        if (criteria.minArea && g.Area_km2 < criteria.minArea) return false;
        if (criteria.maxArea && g.Area_km2 > criteria.maxArea) return false;
        return true;
    });
}

const largeCities = filterGovernorates({ minPopulation: 1500000 });
console.log('\n\nExample 6: Filter Governorates (Population > 1.5M)');
console.log('-'.repeat(60));
largeCities.forEach(g => {
    console.log(`- ${g.Name}: ${g.Population.toLocaleString()}`);
});

// Example 7: Export data for different purposes
function exportForMap() {
    return governoratesExtended.map(g => ({
        name: g.Name,
        nameAr: g.NameAr,
        capital: g.Capital,
        iso: g.ISO3166_2,
        // Calculate approximate center (would need actual boundary data for accuracy)
        // This is just for demonstration
        coordinates: [36.0, 38.0] // placeholder
    }));
}

console.log('\n\nExample 7: Export Format for Mapping');
console.log('-'.repeat(60));
const mapData = exportForMap();
console.log(`Prepared ${mapData.length} governorates for mapping`);
console.log('Sample:', JSON.stringify(mapData[0], null, 2));

console.log('\n' + '='.repeat(60));
console.log('Examples completed! Check the code for implementation details.');
console.log('='.repeat(60) + '\n');
