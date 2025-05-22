// Load delegation data for search functionality
let allDelegations = [];

fetch('state-municipality.json')
    .then(response => response.json())
    .then(data => {
        // Extract all delegations with their governorates
        data.forEach(governorate => {
            governorate.Delegations.forEach(delegation => {
                allDelegations.push({
                    name: delegation.Name,
                    nameAr: delegation.NameAr,
                    governorate: governorate.Name,
                    governorateAr: governorate.NameAr,
                    latitude: delegation.Latitude,
                    longitude: delegation.Longitude,
                    postalCode: delegation.PostalCode
                });
            });
        });
        
        // Initialize search functionality
        initializeSearch();
    });

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        // Clear results if query is empty
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Filter delegations based on search query
        const filteredResults = allDelegations.filter(delegation => 
            delegation.name.toLowerCase().includes(query) || 
            delegation.nameAr.includes(query) ||
            delegation.governorate.toLowerCase().includes(query) ||
            delegation.governorateAr.includes(query) ||
            delegation.postalCode.includes(query)
        ).slice(0, 5); // Limit to 5 results
        
        // Display results
        searchResults.innerHTML = '';
        filteredResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <strong>${result.name} (${result.nameAr})</strong><br>
                ${result.governorate} (${result.governorateAr})<br>
                Postal Code: ${result.postalCode}
            `;
            
            // Add click event to zoom to location
            resultItem.addEventListener('click', function() {
                map.setView([result.latitude, result.longitude], 12);
                searchResults.innerHTML = '';
                searchInput.value = '';
            });
            
            searchResults.appendChild(resultItem);
        });
    });
}