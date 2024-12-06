import requests
from app.config import Config

# Gemini API Base URL
BASE_URL = "https://api.gemini.com/v1"

def summarize_article(content):
    """
    Summarizes an article using Gemini's LLM service.
    """
    endpoint = f"{BASE_URL}/summarize"
    headers = {
        "Authorization": f"Bearer {Config.GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "text": content,
        "options": {
            "language": "en",
            "summary_length": "short"  # Options: short, medium, long
        }
    }
    
    response = requests.post(endpoint, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json().get("summary")
    else:
        raise Exception(f"Gemini API Error: {response.status_code} - {response.text}")


def categorize_article(content):
    """
    Categorizes an article using Gemini's LLM service.
    """
    endpoint = f"{BASE_URL}/categorize"
    headers = {
        "Authorization": f"Bearer {Config.GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "text": content
    }
    
    response = requests.post(endpoint, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json().get("category")
    else:
        raise Exception(f"Gemini API Error: {response.status_code} - {response.text}")
