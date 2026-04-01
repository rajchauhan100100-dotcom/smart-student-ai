#!/usr/bin/env python3
"""
Backend API Testing for QuickTextTool AI Application
Tests all 4 AI-powered API endpoints with Google Gemini integration
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

def test_summarize_endpoint():
    """Test POST /api/summarize - AI text summarization"""
    print("\n=== Testing POST /api/summarize ===")
    try:
        # Test with comprehensive sample text
        sample_text = """
        Artificial intelligence (AI) is a rapidly evolving field that encompasses machine learning, 
        natural language processing, computer vision, and robotics. The technology has transformed 
        various industries including healthcare, finance, transportation, and education. Machine 
        learning algorithms can analyze vast amounts of data to identify patterns and make predictions. 
        Deep learning, a subset of machine learning, uses neural networks with multiple layers to 
        process complex information. Natural language processing enables computers to understand and 
        generate human language, powering applications like chatbots and translation services. 
        Computer vision allows machines to interpret and analyze visual information from the world 
        around them. As AI continues to advance, it promises to revolutionize how we work, learn, 
        and interact with technology in our daily lives.
        """
        
        payload = {
            "text": sample_text.strip(),
            "mode": "normal",
            "summaryLength": 50,
            "tone": "formal",
            "outputFormat": "paragraph"
        }
        
        response = requests.post(f"{API_BASE}/summarize", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            if 'summary' in data and data['summary']:
                summary = data['summary']
                print(f"Generated Summary: {summary[:100]}...")
                print("✅ Summarize endpoint working correctly")
                return True
            else:
                print("❌ Summarize endpoint missing 'summary' field or empty response")
                return False
        else:
            print(f"Response: {response.json()}")
            print(f"❌ Summarize endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Summarize endpoint test failed with error: {str(e)}")
        return False

def test_paraphrase_endpoint():
    """Test POST /api/paraphrase - AI text paraphrasing"""
    print("\n=== Testing POST /api/paraphrase ===")
    try:
        sample_text = "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for testing purposes."
        
        payload = {"text": sample_text}
        
        response = requests.post(f"{API_BASE}/paraphrase", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            if 'paraphrased' in data and data['paraphrased']:
                paraphrased = data['paraphrased']
                print(f"Original: {sample_text}")
                print(f"Paraphrased: {paraphrased}")
                print("✅ Paraphrase endpoint working correctly")
                return True
            else:
                print("❌ Paraphrase endpoint missing 'paraphrased' field or empty response")
                return False
        else:
            print(f"Response: {response.json()}")
            print(f"❌ Paraphrase endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Paraphrase endpoint test failed with error: {str(e)}")
        return False

def test_grammar_endpoint():
    """Test POST /api/grammar - AI grammar correction"""
    print("\n=== Testing POST /api/grammar ===")
    try:
        sample_text = "I is very excited about this new AI tool. It help me alot with my writting and grammer mistakes."
        
        payload = {"text": sample_text}
        
        response = requests.post(f"{API_BASE}/grammar", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            if 'corrected' in data and data['corrected']:
                corrected = data['corrected']
                print(f"Original: {sample_text}")
                print(f"Corrected: {corrected}")
                print("✅ Grammar endpoint working correctly")
                return True
            else:
                print("❌ Grammar endpoint missing 'corrected' field or empty response")
                return False
        else:
            print(f"Response: {response.json()}")
            print(f"❌ Grammar endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Grammar endpoint test failed with error: {str(e)}")
        return False

def test_bio_endpoint():
    """Test POST /api/bio - AI professional bio generation"""
    print("\n=== Testing POST /api/bio ===")
    try:
        payload = {
            "details": {
                "name": "Sarah Johnson",
                "profession": "Data Scientist",
                "experience": "7 years",
                "skills": "Python, Machine Learning, SQL, TensorFlow",
                "achievements": "Led AI initiatives that increased company revenue by 25%"
            }
        }
        
        response = requests.post(f"{API_BASE}/bio", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            if 'bio' in data and data['bio']:
                bio = data['bio']
                print(f"Generated Bio: {bio}")
                print("✅ Bio endpoint working correctly")
                return True
            else:
                print("❌ Bio endpoint missing 'bio' field or empty response")
                return False
        else:
            print(f"Response: {response.json()}")
            print(f"❌ Bio endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Bio endpoint test failed with error: {str(e)}")
        return False

def test_error_handling():
    """Test error handling for all endpoints"""
    print("\n=== Testing Error Handling ===")
    
    test_cases = [
        # Empty text tests
        ("/summarize", {"text": ""}, "empty text"),
        ("/paraphrase", {"text": ""}, "empty text"),
        ("/grammar", {"text": ""}, "empty text"),
        
        # Missing required fields
        ("/summarize", {}, "missing text field"),
        ("/paraphrase", {}, "missing text field"),
        ("/grammar", {}, "missing text field"),
        ("/bio", {}, "missing details field"),
        ("/bio", {"details": {}}, "missing name/profession"),
        ("/bio", {"details": {"name": "John"}}, "missing profession"),
    ]
    
    results = []
    
    for endpoint, payload, test_desc in test_cases:
        try:
            print(f"\nTesting {endpoint} - {test_desc}")
            response = requests.post(f"{API_BASE}{endpoint}", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data:
                    print(f"✅ {endpoint} correctly handles {test_desc}")
                    results.append(True)
                else:
                    print(f"❌ {endpoint} missing error message for {test_desc}")
                    results.append(False)
            else:
                print(f"❌ Expected 400 for {test_desc} in {endpoint}, got {response.status_code}")
                results.append(False)
                
        except Exception as e:
            print(f"❌ Error handling test for {endpoint} failed: {str(e)}")
            results.append(False)
    
    return all(results)

def test_api_key_configuration():
    """Test that API key is properly configured"""
    print("\n=== Testing API Key Configuration ===")
    
    api_key = os.getenv('GEMINI_API_KEY', '')
    if api_key and api_key != 'your_gemini_api_key_here':
        print(f"✅ GEMINI_API_KEY is configured (length: {len(api_key)})")
        return True
    else:
        print("❌ GEMINI_API_KEY is not properly configured")
        return False

def main():
    """Run all AI backend API tests"""
    print("🚀 Starting QuickTextTool AI Backend API Tests")
    print(f"Testing against: {API_BASE}")
    
    # Run all tests
    test_results = []
    
    test_results.append(test_api_key_configuration())
    test_results.append(test_summarize_endpoint())
    test_results.append(test_paraphrase_endpoint())
    test_results.append(test_grammar_endpoint())
    test_results.append(test_bio_endpoint())
    test_results.append(test_error_handling())
    
    # Summary
    passed = sum(test_results)
    total = len(test_results)
    
    print(f"\n{'='*60}")
    print(f"🎯 AI BACKEND API TEST SUMMARY")
    print(f"{'='*60}")
    print(f"Passed: {passed}/{total}")
    print(f"Failed: {total - passed}/{total}")
    
    if passed == total:
        print("🎉 All AI backend API tests passed!")
        return True
    else:
        print("❌ Some AI backend API tests failed!")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)