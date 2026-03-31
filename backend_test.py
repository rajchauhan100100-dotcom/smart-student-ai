#!/usr/bin/env python3
"""
Backend API Testing for Smart Student AI Toolkit
Tests all API endpoints including AI-powered tools
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get base URL from environment
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'http://localhost:3000')
API_BASE = f"{BASE_URL}/api"

def test_get_api_status():
    """Test GET /api endpoint - should return success message"""
    print("\n=== Testing GET /api ===")
    try:
        response = requests.get(API_BASE, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if 'message' in data and 'Smart Student AI Toolkit API is running!' in data['message']:
                print("✅ GET /api endpoint working correctly")
                return True
            else:
                print("❌ GET /api endpoint returned unexpected response")
                return False
        else:
            print(f"❌ GET /api endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ GET /api endpoint failed with error: {str(e)}")
        return False

def test_summarize_endpoint():
    """Test POST /api/summarize - should fail gracefully without API key"""
    print("\n=== Testing POST /api/summarize ===")
    try:
        payload = {"text": "This is a test text that needs to be summarized. It contains multiple sentences to test the summarization functionality."}
        response = requests.post(f"{API_BASE}/summarize", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 500:
            data = response.json()
            if 'error' in data and ('dependencies' in data['error'].lower() or 'api key' in data['error'].lower() or 'gemini_api_key' in data['error'].lower()):
                print("✅ Summarize endpoint correctly handles missing dependencies/API key")
                return True
            else:
                print("❌ Summarize endpoint error message doesn't mention dependency/API key issue")
                return False
        else:
            print(f"❌ Expected 500 error for missing API key, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Summarize endpoint test failed with error: {str(e)}")
        return False

def test_paraphrase_endpoint():
    """Test POST /api/paraphrase - should fail gracefully without API key"""
    print("\n=== Testing POST /api/paraphrase ===")
    try:
        payload = {"text": "Hello world, this is a simple test message."}
        response = requests.post(f"{API_BASE}/paraphrase", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 500:
            data = response.json()
            if 'error' in data and ('dependencies' in data['error'].lower() or 'api key' in data['error'].lower() or 'gemini_api_key' in data['error'].lower()):
                print("✅ Paraphrase endpoint correctly handles missing dependencies/API key")
                return True
            else:
                print("❌ Paraphrase endpoint error message doesn't mention dependency/API key issue")
                return False
        else:
            print(f"❌ Expected 500 error for missing API key, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Paraphrase endpoint test failed with error: {str(e)}")
        return False

def test_grammar_correction_endpoint():
    """Test POST /api/correct-grammar - should fail gracefully without API key"""
    print("\n=== Testing POST /api/correct-grammar ===")
    try:
        payload = {"text": "I is happy and excited about this test."}
        response = requests.post(f"{API_BASE}/correct-grammar", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 500:
            data = response.json()
            if 'error' in data and ('dependencies' in data['error'].lower() or 'api key' in data['error'].lower() or 'gemini_api_key' in data['error'].lower()):
                print("✅ Grammar correction endpoint correctly handles missing dependencies/API key")
                return True
            else:
                print("❌ Grammar correction endpoint error message doesn't mention dependency/API key issue")
                return False
        else:
            print(f"❌ Expected 500 error for missing API key, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Grammar correction endpoint test failed with error: {str(e)}")
        return False

def test_bio_generator_endpoint():
    """Test POST /api/generate-bio - should fail gracefully without API key"""
    print("\n=== Testing POST /api/generate-bio ===")
    try:
        payload = {
            "details": {
                "name": "John Smith",
                "profession": "Software Developer",
                "experience": "5 years",
                "skills": ["JavaScript", "Python", "React"]
            }
        }
        response = requests.post(f"{API_BASE}/generate-bio", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 500:
            data = response.json()
            if 'error' in data and ('dependencies' in data['error'].lower() or 'api key' in data['error'].lower() or 'gemini_api_key' in data['error'].lower()):
                print("✅ Bio generator endpoint correctly handles missing dependencies/API key")
                return True
            else:
                print("❌ Bio generator endpoint error message doesn't mention dependency/API key issue")
                return False
        else:
            print(f"❌ Expected 500 error for missing API key, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Bio generator endpoint test failed with error: {str(e)}")
        return False

def test_invalid_endpoint():
    """Test POST to non-existent endpoint - should return 404"""
    print("\n=== Testing POST /api/invalid-endpoint ===")
    try:
        payload = {"test": "data"}
        response = requests.post(f"{API_BASE}/invalid-endpoint", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 404:
            data = response.json()
            if 'error' in data and 'not found' in data['error'].lower():
                print("✅ Invalid endpoint correctly returns 404")
                return True
            else:
                print("❌ Invalid endpoint doesn't return proper error message")
                return False
        else:
            print(f"❌ Expected 404 for invalid endpoint, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Invalid endpoint test failed with error: {str(e)}")
        return False

def test_missing_required_fields():
    """Test endpoints with missing required fields - should return 400"""
    print("\n=== Testing Missing Required Fields ===")
    
    endpoints_to_test = [
        ("/summarize", {}),
        ("/paraphrase", {}),
        ("/correct-grammar", {}),
        ("/generate-bio", {})
    ]
    
    results = []
    
    for endpoint, payload in endpoints_to_test:
        try:
            print(f"\nTesting {endpoint} with empty payload...")
            response = requests.post(f"{API_BASE}{endpoint}", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'required' in data['error'].lower():
                    print(f"✅ {endpoint} correctly validates required fields")
                    results.append(True)
                else:
                    print(f"❌ {endpoint} doesn't return proper validation error")
                    results.append(False)
            else:
                print(f"❌ Expected 400 for missing fields in {endpoint}, got {response.status_code}")
                results.append(False)
                
        except Exception as e:
            print(f"❌ {endpoint} validation test failed with error: {str(e)}")
            results.append(False)
    
    return all(results)

def main():
    """Run all backend API tests"""
    print("🚀 Starting Smart Student AI Toolkit Backend API Tests")
    print(f"Testing against: {API_BASE}")
    
    # Check if API key is set to placeholder (expected for this test)
    api_key = os.getenv('GEMINI_API_KEY', '')
    if api_key == 'your_gemini_api_key_here' or not api_key:
        print("✅ GEMINI_API_KEY is set to placeholder - AI endpoints should fail gracefully")
    else:
        print("⚠️  GEMINI_API_KEY appears to be set - AI endpoints might work unexpectedly")
    
    # Run all tests
    test_results = []
    
    test_results.append(test_get_api_status())
    test_results.append(test_summarize_endpoint())
    test_results.append(test_paraphrase_endpoint())
    test_results.append(test_grammar_correction_endpoint())
    test_results.append(test_bio_generator_endpoint())
    test_results.append(test_invalid_endpoint())
    test_results.append(test_missing_required_fields())
    
    # Summary
    passed = sum(test_results)
    total = len(test_results)
    
    print(f"\n{'='*50}")
    print(f"🎯 TEST SUMMARY")
    print(f"{'='*50}")
    print(f"Passed: {passed}/{total}")
    print(f"Failed: {total - passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed!")
        return True
    else:
        print("❌ Some tests failed!")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)