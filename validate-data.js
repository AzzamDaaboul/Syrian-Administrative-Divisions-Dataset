const fs = require('fs');

// Validation configuration
const SYRIA_BOUNDS = {
    minLat: 32.0,
    maxLat: 38.0,
    minLon: 35.0,
    maxLon: 43.0
};

const EXPECTED_GOVERNORATES = 14;

// Color codes for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateJSON(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        const data = JSON.parse(content);
        log(`✓ ${filename} is valid JSON`, 'green');
        return { valid: true, data };
    } catch (error) {
        log(`✗ ${filename} is invalid JSON: ${error.message}`, 'red');
        return { valid: false, error: error.message };
    }
}

function validateCoordinates(lat, lon, location) {
    const errors = [];
    
    if (typeof lat !== 'number' || typeof lon !== 'number') {
        errors.push(`Invalid coordinate types at ${location}`);
    }
    
    if (lat < SYRIA_BOUNDS.minLat || lat > SYRIA_BOUNDS.maxLat) {
        errors.push(`Latitude ${lat} out of bounds at ${location}`);
    }
    
    if (lon < SYRIA_BOUNDS.minLon || lon > SYRIA_BOUNDS.maxLon) {
        errors.push(`Longitude ${lon} out of bounds at ${location}`);
    }
    
    return errors;
}

function validateStateMunicipality() {
    log('\n=== Validating state-municipality.json ===', 'blue');
    
    const result = validateJSON('./state-municipality.json');
    if (!result.valid) return false;
    
    const data = result.data;
    let allValid = true;
    
    // Check number of governorates
    if (data.length !== EXPECTED_GOVERNORATES) {
        log(`⚠ Expected ${EXPECTED_GOVERNORATES} governorates, found ${data.length}`, 'yellow');
    }
    
    // Validate each governorate
    data.forEach((gov, idx) => {
        // Check required fields
        if (!gov.Name || !gov.NameAr || !gov.Value) {
            log(`✗ Governorate ${idx} missing required fields`, 'red');
            allValid = false;
        }
        
        // Check delegations
        if (!gov.Delegations || !Array.isArray(gov.Delegations)) {
            log(`✗ Governorate ${gov.Name} missing or invalid Delegations array`, 'red');
            allValid = false;
            return;
        }
        
        // Validate each delegation
        gov.Delegations.forEach((del, delIdx) => {
            if (!del.Name || !del.NameAr || !del.PostalCode) {
                log(`✗ ${gov.Name} delegation ${delIdx} missing required fields`, 'red');
                allValid = false;
            }
            
            // Validate coordinates
            if (del.Latitude !== undefined && del.Longitude !== undefined) {
                const coordErrors = validateCoordinates(
                    del.Latitude, 
                    del.Longitude, 
                    `${gov.Name} - ${del.Name}`
                );
                coordErrors.forEach(err => {
                    log(`✗ ${err}`, 'red');
                    allValid = false;
                });
            }
        });
    });
    
    if (allValid) {
        log(`✓ All validations passed for state-municipality.json`, 'green');
    }
    
    return allValid;
}

function validateGovernoratesExtended() {
    log('\n=== Validating governorates-extended.json ===', 'blue');
    
    const result = validateJSON('./governorates-extended.json');
    if (!result.valid) return false;
    
    const data = result.data;
    let allValid = true;
    
    // Check number of governorates
    if (data.length !== EXPECTED_GOVERNORATES) {
        log(`⚠ Expected ${EXPECTED_GOVERNORATES} governorates, found ${data.length}`, 'yellow');
    }
    
    // Validate each governorate
    data.forEach((gov, idx) => {
        // Check required fields
        const requiredFields = ['Name', 'NameAr', 'Code', 'ISO3166_2', 'Capital', 'CapitalAr'];
        requiredFields.forEach(field => {
            if (!gov[field]) {
                log(`✗ Governorate ${idx} missing required field: ${field}`, 'red');
                allValid = false;
            }
        });
        
        // Check numeric fields
        if (gov.Area_km2 !== undefined && typeof gov.Area_km2 !== 'number') {
            log(`✗ ${gov.Name} Area_km2 should be a number`, 'red');
            allValid = false;
        }
        
        if (gov.Population !== undefined && typeof gov.Population !== 'number') {
            log(`✗ ${gov.Name} Population should be a number`, 'red');
            allValid = false;
        }
        
        // Check districts
        if (gov.Districts && Array.isArray(gov.Districts)) {
            gov.Districts.forEach((district, distIdx) => {
                if (!district.Name || !district.NameAr) {
                    log(`✗ ${gov.Name} district ${distIdx} missing required fields`, 'red');
                    allValid = false;
                }
            });
        }
    });
    
    if (allValid) {
        log(`✓ All validations passed for governorates-extended.json`, 'green');
    }
    
    return allValid;
}

function validateMetadata() {
    log('\n=== Validating data-metadata.json ===', 'blue');
    
    const result = validateJSON('./data-metadata.json');
    if (!result.valid) return false;
    
    const data = result.data;
    let allValid = true;
    
    // Check required fields
    const requiredFields = ['datasetName', 'version', 'lastUpdated', 'dataSources', 'dataFiles'];
    requiredFields.forEach(field => {
        if (!data[field]) {
            log(`✗ Missing required field: ${field}`, 'red');
            allValid = false;
        }
    });
    
    // Validate data sources
    if (data.dataSources && Array.isArray(data.dataSources)) {
        data.dataSources.forEach((source, idx) => {
            if (!source.name || !source.dataType) {
                log(`✗ Data source ${idx} missing required fields`, 'red');
                allValid = false;
            }
        });
    }
    
    if (allValid) {
        log(`✓ All validations passed for data-metadata.json`, 'green');
    }
    
    return allValid;
}

function validateStatistics() {
    log('\n=== Validating statistics.json ===', 'blue');
    
    const result = validateJSON('./statistics.json');
    if (!result.valid) return false;
    
    const data = result.data.statistics;
    let allValid = true;
    
    // Check that population percentages add up to approximately 100
    if (data.populationByGovernorate) {
        const totalPercentage = data.populationByGovernorate.reduce(
            (sum, gov) => sum + gov.percentage, 
            0
        );
        if (Math.abs(totalPercentage - 100) > 0.5) {
            log(`⚠ Population percentages sum to ${totalPercentage.toFixed(1)}%, expected ~100%`, 'yellow');
        }
    }
    
    if (allValid) {
        log(`✓ All validations passed for statistics.json`, 'green');
    }
    
    return allValid;
}

function validateGeoJSON() {
    log('\n=== Validating syria_administrative_province_state_boundary.geojson ===', 'blue');
    
    const result = validateJSON('./syria_administrative_province_state_boundary.geojson');
    if (!result.valid) return false;
    
    const data = result.data;
    let allValid = true;
    
    // Check GeoJSON structure
    if (data.type !== 'FeatureCollection') {
        log(`✗ Expected type "FeatureCollection", got "${data.type}"`, 'red');
        allValid = false;
    }
    
    if (!data.features || !Array.isArray(data.features)) {
        log(`✗ Missing or invalid "features" array`, 'red');
        allValid = false;
    } else {
        log(`  Found ${data.features.length} features`, 'blue');
    }
    
    if (allValid) {
        log(`✓ All validations passed for GeoJSON`, 'green');
    }
    
    return allValid;
}

// Run all validations
function runAllValidations() {
    log('\n========================================', 'blue');
    log('  Syrian Administrative Divisions', 'blue');
    log('       Data Validation Suite', 'blue');
    log('========================================\n', 'blue');
    
    const results = {
        stateMunicipality: validateStateMunicipality(),
        governoratesExtended: validateGovernoratesExtended(),
        metadata: validateMetadata(),
        statistics: validateStatistics(),
        geoJSON: validateGeoJSON()
    };
    
    const allPassed = Object.values(results).every(r => r);
    
    log('\n========================================', 'blue');
    log('           Validation Summary', 'blue');
    log('========================================', 'blue');
    
    Object.entries(results).forEach(([name, passed]) => {
        const status = passed ? '✓ PASS' : '✗ FAIL';
        const color = passed ? 'green' : 'red';
        log(`${status} - ${name}`, color);
    });
    
    if (allPassed) {
        log('\n✓ All validations passed!', 'green');
        process.exit(0);
    } else {
        log('\n✗ Some validations failed', 'red');
        process.exit(1);
    }
}

// Run validations
runAllValidations();
