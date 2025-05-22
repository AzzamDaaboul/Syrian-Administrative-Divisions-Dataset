const fs = require('fs');

// Load data files
const stateData = JSON.parse(fs.readFileSync('./state-municipality.json', 'utf8'));
const areasData = JSON.parse(fs.readFileSync('./state-municipality-areas.json', 'utf8'));

// Create a normalized dataset
const normalizedData = stateData.map(state => {
    // Find matching area data
    const areaMatch = areasData.find(area => 
        area.Value.toUpperCase() === state.Value.toUpperCase() ||
        area.Name.toUpperCase() === state.Name.toUpperCase()
    );
    
    // Merge delegations with consistent format
    const mergedDelegations = state.Delegations.map(delegation => {
        // Find matching delegation in areas data
        const matchingDelegation = areaMatch?.Delegations?.find(areaDel => 
            areaDel.Value.toUpperCase() === delegation.Value.toUpperCase() ||
            areaDel.Name.includes(delegation.Name.split(' ')[0])
        );
        
        return {
            Name: delegation.Name,
            NameAr: delegation.NameAr,
            Value: delegation.Value,
            PostalCode: delegation.PostalCode,
            StandardPostalCode: matchingDelegation?.PostalCode || delegation.PostalCode,
            Latitude: delegation.Latitude,
            Longitude: delegation.Longitude,
            // Add any additional fields from matching delegation
            ...(matchingDelegation ? { 
                AlternativeName: matchingDelegation.Name !== delegation.Name ? matchingDelegation.Name : undefined
            } : {})
        };
    });
    
    return {
        Name: state.Name,
        NameAr: state.NameAr,
        Value: state.Value,
        StandardValue: areaMatch?.Value || state.Value,
        Delegations: mergedDelegations
    };
});

// Write normalized data to file
fs.writeFileSync('./normalized-data.json', JSON.stringify(normalizedData, null, 2));
console.log('Data normalized and saved to normalized-data.json');