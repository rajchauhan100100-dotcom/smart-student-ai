#!/usr/bin/env python3
"""
Backend API Testing Script for Smart Student AI Toolkit
Tests all 4 Gemini API endpoints with the new API key
"""

import requests
import json
import time
import os
from datetime import datetime

# Get base URL from environment or use default
BASE_URL = "https://smart-student-ai-5.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def log_test(test_name, status, details=""):
    """Log test results with timestamp"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    status_emoji = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
    print(f"[{timestamp}] {status_emoji} {test_name}: {status}")
    if details:
        print(f"    Details: {details}")
    print()

def test_api_endpoint(endpoint, payload, expected_field, test_name):
    """Generic function to test API endpoints"""
    try:
        print(f"Testing {test_name}...")
        print(f"Endpoint: {endpoint}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        start_time = time.time()
        response = requests.post(endpoint, json=payload, timeout=30)
        response_time = time.time() - start_time
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Time: {response_time:.2f}s")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if expected_field in data and data[expected_field]:
                log_test(test_name, "PASS", f"Response time: {response_time:.2f}s")
                return True, data[expected_field], response_time
            else:
                log_test(test_name, "FAIL", f"Missing or empty '{expected_field}' field in response")
                return False, None, response_time
        else:
            error_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
            log_test(test_name, "FAIL", f"HTTP {response.status_code}: {error_data}")
            return False, None, response_time
            
    except requests.exceptions.Timeout:
        log_test(test_name, "FAIL", "Request timeout (>30s)")
        return False, None, 30
    except requests.exceptions.RequestException as e:
        log_test(test_name, "FAIL", f"Request error: {str(e)}")
        return False, None, 0
    except Exception as e:
        log_test(test_name, "FAIL", f"Unexpected error: {str(e)}")
        return False, None, 0

def main():
    """Run all API tests"""
    print("=" * 80)
    print("SMART STUDENT AI TOOLKIT - BACKEND API TESTING")
    print("Testing Gemini API Integration with NEW API KEY")
    print("=" * 80)
    print()
    
    # Test results tracking
    test_results = []
    total_response_time = 0
    
    # Test 1: Summarize API
    print("🔍 TEST 1: AI Text Summarization API")
    print("-" * 50)
    
    summarize_payload = {
        "text": "Artificial intelligence is transforming how we work and live in the digital age. Machine learning algorithms are becoming more sophisticated, enabling computers to perform tasks that once required human intelligence. From healthcare diagnostics to autonomous vehicles, AI is revolutionizing industries and creating new possibilities for innovation and efficiency.",
        "mode": "normal",
        "summaryLength": 50,
        "tone": "formal",
        "outputFormat": "paragraph"
    }
    
    success, result, response_time = test_api_endpoint(
        f"{API_BASE}/summarize",
        summarize_payload,
        "summary",
        "Summarize API"
    )
    test_results.append(("Summarize API", success, response_time))
    total_response_time += response_time
    
    # Test 2: Paraphrase API
    print("🔄 TEST 2: AI Text Paraphrasing API")
    print("-" * 50)
    
    paraphrase_payload = {
        "text": "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for testing purposes.",
        "mode": "standard",
        "tone": "neutral",
        "strength": 50,
        "outputFormat": "paragraph"
    }
    
    success, result, response_time = test_api_endpoint(
        f"{API_BASE}/paraphrase",
        paraphrase_payload,
        "paraphrased",
        "Paraphrase API"
    )
    test_results.append(("Paraphrase API", success, response_time))
    total_response_time += response_time
    
    # Test 3: Grammar Correction API
    print("📝 TEST 3: AI Grammar Correction API")
    print("-" * 50)
    
    grammar_payload = {
        "text": "This are a test sentence with grammer errors. Their is multiple mistake's in this text that need's to be fix."
    }
    
    success, result, response_time = test_api_endpoint(
        f"{API_BASE}/grammar",
        grammar_payload,
        "corrected",
        "Grammar API"
    )
    test_results.append(("Grammar API", success, response_time))
    total_response_time += response_time
    
    # Test 4: Professional Bio Generator API
    print("👤 TEST 4: AI Professional Bio Generator API")
    print("-" * 50)
    
    bio_payload = {
        "details": {
            "name": "Sarah Johnson",
            "profession": "Software Engineer",
            "experience": "5 years",
            "skills": "React, Node.js, Python, AWS",
            "achievements": "Led development of 3 major web applications"
        }
    }
    
    success, result, response_time = test_api_endpoint(
        f"{API_BASE}/bio",
        bio_payload,
        "bio",
        "Bio Generator API"
    )
    test_results.append(("Bio Generator API", success, response_time))
    total_response_time += response_time
    
    # Test Summary
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    passed_tests = sum(1 for _, success, _ in test_results if success)
    total_tests = len(test_results)
    avg_response_time = total_response_time / total_tests if total_tests > 0 else 0
    
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
    print(f"Average Response Time: {avg_response_time:.2f}s")
    print()
    
    print("Individual Test Results:")
    for test_name, success, response_time in test_results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"  {status} {test_name} ({response_time:.2f}s)")
    
    print()
    
    # API Key Verification
    print("🔑 API KEY VERIFICATION:")
    if passed_tests == total_tests:
        print("✅ NEW Gemini API key is working correctly")
        print("✅ All endpoints successfully integrated with Gemini API")
        print("✅ Environment variable GEMINI_API_KEY is properly loaded")
    elif passed_tests > 0:
        print("⚠️  Partial success - some endpoints working with new API key")
    else:
        print("❌ API key integration failed - no endpoints working")
    
    print()
    print("=" * 80)
    
    return passed_tests == total_tests

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)