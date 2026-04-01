#!/usr/bin/env python3

import requests
import json
import time

# Configuration
BASE_URL = "https://smart-student-ai-5.preview.emergentagent.com"
API_ENDPOINT = f"{BASE_URL}/api/paraphrase"

def test_focused_features():
    """Test remaining key features after rate limit reset"""
    print("🚀 Testing Remaining Key Features")
    print("=" * 50)
    
    # Test default parameters
    print("\n🧪 Testing: Default Parameters")
    response = requests.post(API_ENDPOINT, json={"text": "Testing default parameters."})
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Default parameters work: {data.get('paraphrased', 'No response')}")
    else:
        print(f"❌ Error: {response.json()}")
    
    time.sleep(2)
    
    # Test strength levels
    print("\n🧪 Testing: Light Strength (20)")
    response = requests.post(API_ENDPOINT, json={
        "text": "Machine learning is a subset of artificial intelligence.",
        "strength": 20
    })
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Light strength: {data.get('paraphrased', 'No response')}")
    else:
        print(f"❌ Error: {response.json()}")
    
    time.sleep(2)
    
    # Test aggressive strength
    print("\n🧪 Testing: Aggressive Strength (95)")
    response = requests.post(API_ENDPOINT, json={
        "text": "Machine learning is a subset of artificial intelligence.",
        "strength": 95
    })
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Aggressive strength: {data.get('paraphrased', 'No response')}")
    else:
        print(f"❌ Error: {response.json()}")
    
    time.sleep(2)
    
    # Test one tone variation
    print("\n🧪 Testing: Professional Tone")
    response = requests.post(API_ENDPOINT, json={
        "text": "This is a test sentence.",
        "tone": "professional"
    })
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Professional tone: {data.get('paraphrased', 'No response')}")
    else:
        print(f"❌ Error: {response.json()}")

if __name__ == "__main__":
    test_focused_features()