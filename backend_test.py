#!/usr/bin/env python3

import requests
import json
import time
from typing import Dict, Any

# Configuration
BASE_URL = "https://smart-student-ai-5.preview.emergentagent.com"
API_ENDPOINT = f"{BASE_URL}/api/paraphrase"

def test_api_call(test_name: str, payload: Dict[str, Any], expected_status: int = 200) -> Dict[str, Any]:
    """Make API call and return response with test results"""
    print(f"\n🧪 Testing: {test_name}")
    print(f"📤 Request: {json.dumps(payload, indent=2)}")
    
    start_time = time.time()
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        response_time = time.time() - start_time
        
        print(f"⏱️  Response time: {response_time:.2f}s")
        print(f"📊 Status code: {response.status_code}")
        
        if response.status_code == expected_status:
            print("✅ Status code matches expected")
        else:
            print(f"❌ Expected status {expected_status}, got {response.status_code}")
        
        try:
            response_data = response.json()
            print(f"📥 Response: {json.dumps(response_data, indent=2)}")
            
            return {
                'success': response.status_code == expected_status,
                'status_code': response.status_code,
                'response_time': response_time,
                'data': response_data,
                'test_name': test_name
            }
        except json.JSONDecodeError:
            print(f"❌ Invalid JSON response: {response.text}")
            return {
                'success': False,
                'status_code': response.status_code,
                'response_time': response_time,
                'data': {'error': 'Invalid JSON response'},
                'test_name': test_name
            }
            
    except requests.exceptions.Timeout:
        print("❌ Request timed out")
        return {
            'success': False,
            'status_code': 0,
            'response_time': 10.0,
            'data': {'error': 'Request timeout'},
            'test_name': test_name
        }
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {str(e)}")
        return {
            'success': False,
            'status_code': 0,
            'response_time': 0,
            'data': {'error': str(e)},
            'test_name': test_name
        }

def analyze_paraphrase_quality(original: str, paraphrased: str, mode: str, strength: int) -> Dict[str, Any]:
    """Analyze the quality of paraphrasing"""
    analysis = {
        'length_change': len(paraphrased) / len(original) if original else 0,
        'word_overlap': 0,
        'structure_change': False,
        'mode_appropriate': False
    }
    
    # Simple word overlap analysis
    original_words = set(original.lower().split())
    paraphrased_words = set(paraphrased.lower().split())
    if original_words:
        analysis['word_overlap'] = len(original_words.intersection(paraphrased_words)) / len(original_words)
    
    # Check if structure changed significantly
    analysis['structure_change'] = len(paraphrased.split('.')) != len(original.split('.'))
    
    # Mode-specific checks
    if mode == 'formal':
        analysis['mode_appropriate'] = any(word in paraphrased.lower() for word in ['utilize', 'facilitate', 'implement', 'furthermore', 'consequently'])
    elif mode == 'simple':
        analysis['mode_appropriate'] = not any(word in paraphrased.lower() for word in ['utilize', 'facilitate', 'consequently', 'furthermore'])
    elif mode == 'creative':
        analysis['mode_appropriate'] = analysis['structure_change'] or analysis['length_change'] > 1.1
    elif mode == 'academic':
        analysis['mode_appropriate'] = any(word in paraphrased.lower() for word in ['research', 'study', 'analysis', 'evidence', 'findings'])
    else:  # standard
        analysis['mode_appropriate'] = True
    
    return analysis

def main():
    print("🚀 Starting Comprehensive Paraphrasing API Tests")
    print("=" * 60)
    
    test_results = []
    
    # Test 1: Standard Mode Test
    result = test_api_call(
        "Standard Mode Test",
        {
            "text": "Artificial intelligence is transforming the way we work and live.",
            "mode": "standard",
            "tone": "neutral",
            "strength": 50,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "Artificial intelligence is transforming the way we work and live.",
            result['data']['paraphrased'],
            "standard",
            50
        )
        print(f"📊 Quality Analysis: {analysis}")
    
    # Test 2: Formal Mode Test
    result = test_api_call(
        "Formal Mode Test",
        {
            "text": "We need to finish this project soon.",
            "mode": "formal",
            "tone": "professional",
            "strength": 70,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "We need to finish this project soon.",
            result['data']['paraphrased'],
            "formal",
            70
        )
        print(f"📊 Quality Analysis: {analysis}")
    
    # Test 3: Simple Mode Test
    result = test_api_call(
        "Simple Mode Test",
        {
            "text": "The utilization of advanced computational methodologies facilitates optimization.",
            "mode": "simple",
            "tone": "friendly",
            "strength": 80,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "The utilization of advanced computational methodologies facilitates optimization.",
            result['data']['paraphrased'],
            "simple",
            80
        )
        print(f"📊 Quality Analysis: {analysis}")
    
    # Test 4: Creative Mode Test
    result = test_api_call(
        "Creative Mode Test",
        {
            "text": "The sun was setting over the mountains.",
            "mode": "creative",
            "tone": "casual",
            "strength": 90,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "The sun was setting over the mountains.",
            result['data']['paraphrased'],
            "creative",
            90
        )
        print(f"📊 Quality Analysis: {analysis}")
    
    # Test 5: Academic Mode Test
    result = test_api_call(
        "Academic Mode Test",
        {
            "text": "Climate change has many effects on our planet.",
            "mode": "academic",
            "tone": "neutral",
            "strength": 60,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "Climate change has many effects on our planet.",
            result['data']['paraphrased'],
            "academic",
            60
        )
        print(f"📊 Quality Analysis: {analysis}")
    
    # Test 6: Bullet Points Format Test
    result = test_api_call(
        "Bullet Points Format Test",
        {
            "text": "There are three main benefits: saving time, reducing costs, and improving quality.",
            "mode": "standard",
            "tone": "neutral",
            "strength": 50,
            "outputFormat": "bullets"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        has_bullets = '•' in result['data']['paraphrased'] or '-' in result['data']['paraphrased'] or '*' in result['data']['paraphrased']
        print(f"📊 Bullet format check: {'✅' if has_bullets else '❌'} Contains bullet points")
    
    # Test 7: Light Rewrite Strength Test
    result = test_api_call(
        "Light Rewrite Strength Test",
        {
            "text": "Machine learning is a subset of artificial intelligence.",
            "mode": "standard",
            "tone": "neutral",
            "strength": 20,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "Machine learning is a subset of artificial intelligence.",
            result['data']['paraphrased'],
            "standard",
            20
        )
        print(f"📊 Light rewrite analysis: {analysis}")
        print(f"📊 Word overlap (should be high): {analysis['word_overlap']:.2f}")
    
    # Test 8: Aggressive Rewrite Strength Test
    result = test_api_call(
        "Aggressive Rewrite Strength Test",
        {
            "text": "Machine learning is a subset of artificial intelligence.",
            "mode": "standard",
            "tone": "neutral",
            "strength": 95,
            "outputFormat": "paragraph"
        }
    )
    test_results.append(result)
    
    if result['success'] and 'paraphrased' in result['data']:
        analysis = analyze_paraphrase_quality(
            "Machine learning is a subset of artificial intelligence.",
            result['data']['paraphrased'],
            "standard",
            95
        )
        print(f"📊 Aggressive rewrite analysis: {analysis}")
        print(f"📊 Word overlap (should be low): {analysis['word_overlap']:.2f}")
    
    # Test 9: Error Case - Empty Text
    result = test_api_call(
        "Error Case - Empty Text",
        {
            "text": "",
            "mode": "standard"
        },
        expected_status=400
    )
    test_results.append(result)
    
    # Test 10: Default Parameters Test
    result = test_api_call(
        "Default Parameters Test",
        {
            "text": "Testing default parameters."
        }
    )
    test_results.append(result)
    
    # Test 11: All Tone Variations
    tones = ["professional", "casual", "confident", "friendly", "neutral"]
    for tone in tones:
        result = test_api_call(
            f"Tone Test - {tone.title()}",
            {
                "text": "This is a test sentence to check different tones.",
                "mode": "standard",
                "tone": tone,
                "strength": 50,
                "outputFormat": "paragraph"
            }
        )
        test_results.append(result)
    
    # Test 12: Edge Cases
    edge_cases = [
        {
            "name": "Very Short Text",
            "payload": {"text": "Hello.", "mode": "standard", "strength": 50}
        },
        {
            "name": "Long Text",
            "payload": {
                "text": "This is a very long text that contains multiple sentences and ideas. It should test the API's ability to handle longer content while maintaining coherence and meaning. The paraphrasing should work effectively even with extended passages that contain various concepts and complex sentence structures.",
                "mode": "standard",
                "strength": 50
            }
        },
        {
            "name": "Text with Numbers",
            "payload": {
                "text": "The study included 1,500 participants over 3 years and found 85% improvement.",
                "mode": "academic",
                "strength": 60
            }
        }
    ]
    
    for case in edge_cases:
        result = test_api_call(case["name"], case["payload"])
        test_results.append(result)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    successful_tests = [r for r in test_results if r['success']]
    failed_tests = [r for r in test_results if not r['success']]
    
    print(f"✅ Successful tests: {len(successful_tests)}/{len(test_results)}")
    print(f"❌ Failed tests: {len(failed_tests)}")
    
    if failed_tests:
        print("\n❌ FAILED TESTS:")
        for test in failed_tests:
            print(f"  - {test['test_name']}: Status {test['status_code']}")
            if 'error' in test['data']:
                print(f"    Error: {test['data']['error']}")
    
    # Performance analysis
    response_times = [r['response_time'] for r in successful_tests if r['response_time'] > 0]
    if response_times:
        avg_time = sum(response_times) / len(response_times)
        max_time = max(response_times)
        print(f"\n⏱️  PERFORMANCE:")
        print(f"  - Average response time: {avg_time:.2f}s")
        print(f"  - Maximum response time: {max_time:.2f}s")
        print(f"  - Performance status: {'✅ Good' if avg_time < 5 else '⚠️ Slow'}")
    
    # Feature verification
    print(f"\n🔍 FEATURE VERIFICATION:")
    
    # Check if all modes work
    mode_tests = [r for r in successful_tests if any(mode in r['test_name'].lower() for mode in ['standard', 'formal', 'simple', 'creative', 'academic'])]
    print(f"  - Mode variations: {'✅' if len(mode_tests) >= 5 else '❌'} ({len(mode_tests)}/5 modes tested)")
    
    # Check if tone variations work
    tone_tests = [r for r in successful_tests if 'tone test' in r['test_name'].lower()]
    print(f"  - Tone variations: {'✅' if len(tone_tests) >= 5 else '❌'} ({len(tone_tests)}/5 tones tested)")
    
    # Check if strength levels work
    strength_tests = [r for r in successful_tests if 'strength' in r['test_name'].lower()]
    print(f"  - Strength levels: {'✅' if len(strength_tests) >= 2 else '❌'} (Light/Aggressive tested)")
    
    # Check if output formats work
    bullet_tests = [r for r in successful_tests if 'bullet' in r['test_name'].lower()]
    print(f"  - Output formats: {'✅' if len(bullet_tests) >= 1 else '❌'} (Bullet format tested)")
    
    # Check error handling
    error_tests = [r for r in test_results if r['test_name'].lower().startswith('error')]
    print(f"  - Error handling: {'✅' if len(error_tests) >= 1 and error_tests[0]['status_code'] == 400 else '❌'}")
    
    print(f"\n🎯 OVERALL STATUS: {'✅ ALL TESTS PASSED' if len(failed_tests) == 0 else '❌ SOME TESTS FAILED'}")

if __name__ == "__main__":
    main()