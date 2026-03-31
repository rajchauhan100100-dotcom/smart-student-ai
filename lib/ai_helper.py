#!/usr/bin/env python3
import sys
import os
import asyncio

try:
    from dotenv import load_dotenv
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    # Load environment variables
    load_dotenv()
    DEPENDENCIES_AVAILABLE = True
except ImportError as e:
    DEPENDENCIES_AVAILABLE = False
    print(f"Error: Missing Python dependencies. Please install: pip install python-dotenv emergentintegrations", file=sys.stderr)
    sys.exit(1)

async def main():
    if len(sys.argv) < 5:
        print("Error: Insufficient arguments", file=sys.stderr)
        sys.exit(1)
    
    provider = sys.argv[1]
    model = sys.argv[2]
    system_message = sys.argv[3]
    user_prompt = sys.argv[4]
    
    # Get API key from environment
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key or api_key == 'your_gemini_api_key_here':
        print("Error: GEMINI_API_KEY not set in .env file", file=sys.stderr)
        sys.exit(1)
    
    try:
        # Initialize chat with the specified model
        chat = LlmChat(
            api_key=api_key,
            session_id="ai-tool-session",
            system_message=system_message
        ).with_model(provider, model)
        
        # Create user message
        user_message = UserMessage(text=user_prompt)
        
        # Send message and get response
        response = await chat.send_message(user_message)
        print(response)
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())