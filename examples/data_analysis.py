#!/usr/bin/env python3
"""
Example: Syrian Governorates Data Analysis
This script demonstrates how to use the Syrian Administrative Divisions dataset
to perform basic data analysis and generate insights.
"""

import json
from typing import List, Dict

def load_data(filename: str) -> List[Dict]:
    """Load JSON data from file."""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def calculate_population_density(governorates: List[Dict]) -> List[Dict]:
    """Calculate and return population density for each governorate."""
    densities = []
    for gov in governorates:
        density = gov['Population'] / gov['Area_km2']
        densities.append({
            'name': gov['Name'],
            'name_ar': gov['NameAr'],
            'density': round(density, 2),
            'population': gov['Population'],
            'area': gov['Area_km2']
        })
    return sorted(densities, key=lambda x: x['density'], reverse=True)

def find_governorate_by_phone_code(governorates: List[Dict], phone_code: str) -> List[Dict]:
    """Find governorate(s) by phone code."""
    return [g for g in governorates if g['PhoneCode'] == phone_code]

def get_largest_districts(governorates: List[Dict], top_n: int = 10) -> List[Dict]:
    """Get the largest districts by population."""
    all_districts = []
    for gov in governorates:
        for district in gov['Districts']:
            all_districts.append({
                'governorate': gov['Name'],
                'district': district['Name'],
                'district_ar': district['NameAr'],
                'population': district['Population']
            })
    return sorted(all_districts, key=lambda x: x['population'], reverse=True)[:top_n]

def main():
    # Load data
    print("Loading Syrian Administrative Divisions data...")
    governorates = load_data('governorates-extended.json')
    
    # Basic statistics
    print("\n" + "="*60)
    print("SYRIAN ADMINISTRATIVE DIVISIONS - DATA ANALYSIS")
    print("="*60)
    
    total_population = sum(g['Population'] for g in governorates)
    total_area = sum(g['Area_km2'] for g in governorates)
    
    print(f"\nTotal Governorates: {len(governorates)}")
    print(f"Total Population: {total_population:,} (2019)")
    print(f"Total Area: {total_area:,} km²")
    print(f"Average Population: {total_population // len(governorates):,}")
    print(f"Average Area: {total_area // len(governorates):,} km²")
    
    # Population density analysis
    print("\n" + "-"*60)
    print("TOP 5 MOST DENSELY POPULATED GOVERNORATES")
    print("-"*60)
    densities = calculate_population_density(governorates)
    for i, gov in enumerate(densities[:5], 1):
        print(f"{i}. {gov['name']:20} ({gov['name_ar']:12}) - "
              f"{gov['density']:>7.2f} people/km²")
    
    # Largest governorates by population
    print("\n" + "-"*60)
    print("TOP 5 LARGEST GOVERNORATES BY POPULATION")
    print("-"*60)
    by_pop = sorted(governorates, key=lambda x: x['Population'], reverse=True)
    for i, gov in enumerate(by_pop[:5], 1):
        percentage = (gov['Population'] / total_population) * 100
        print(f"{i}. {gov['Name']:20} - {gov['Population']:>10,} ({percentage:>5.1f}%)")
    
    # Largest governorates by area
    print("\n" + "-"*60)
    print("TOP 5 LARGEST GOVERNORATES BY AREA")
    print("-"*60)
    by_area = sorted(governorates, key=lambda x: x['Area_km2'], reverse=True)
    for i, gov in enumerate(by_area[:5], 1):
        percentage = (gov['Area_km2'] / total_area) * 100
        print(f"{i}. {gov['Name']:20} - {gov['Area_km2']:>10,} km² ({percentage:>5.1f}%)")
    
    # District analysis
    print("\n" + "-"*60)
    print("TOP 10 LARGEST DISTRICTS BY POPULATION")
    print("-"*60)
    top_districts = get_largest_districts(governorates, 10)
    for i, district in enumerate(top_districts, 1):
        print(f"{i:2}. {district['district']:25} ({district['governorate']:15}) - "
              f"{district['population']:>10,}")
    
    # Phone code example
    print("\n" + "-"*60)
    print("EXAMPLE: FIND GOVERNORATES BY PHONE CODE (011)")
    print("-"*60)
    damascus_govs = find_governorate_by_phone_code(governorates, "011")
    for gov in damascus_govs:
        print(f"  - {gov['Name']} ({gov['NameAr']}) - Capital: {gov['Capital']}")
    
    # Coastal governorates
    print("\n" + "-"*60)
    print("COASTAL GOVERNORATES")
    print("-"*60)
    coastal = [g for g in governorates if 'coast' in g['Description'].lower() or 
                                           'port' in g['Description'].lower()]
    for gov in coastal:
        print(f"  - {gov['Name']} ({gov['NameAr']}) - {gov['Capital']}")
    
    print("\n" + "="*60)
    print("Analysis complete!")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
