import requests
from app.config import Config

from langchain.document_loaders import PyPDFLoader

from langchain.embeddings.cohere import CohereEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.elastic_vector_search import ElasticVectorSearch
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQAWithSourcesChain

from langchain_google_genai import ChatGoogleGenerativeAI

# Build a sample vectorDB
from langchain.document_loaders import WebBaseLoader

from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

# Gemini API Base URL
BASE_URL = "https://api.gemini.com/v1"
API_KEY

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