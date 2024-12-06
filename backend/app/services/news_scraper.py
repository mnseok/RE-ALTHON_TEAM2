import requests
from app.config import Config

def fetch_news(source="bbc-news"):
    # url = f"https://newsapi.org/v2/top-headlines?sources={source}&apiKey={Config.NEWS_API_KEY}"
    # response = requests.get(url)
    # if response.status_code == 200:
    #     return response.json()
    # return {"error": "Failed to fetch news"}
    print("requset")
    return 0