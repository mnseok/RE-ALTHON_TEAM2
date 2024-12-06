# import json
# import requests
# from app.config import Config

# # from langchain.document_loaders import PyPDFLoader

# # from langchain.embeddings.cohere import CohereEmbeddings
# # # from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain.embeddings.cohere import CohereEmbeddings
# from langchain_google_genai import GoogleGenerativeAIEmbeddings

# # from langchain.text_splitter import CharacterTextSplitter
# # from langchain.vectorstores.elastic_vector_search import ElasticVectorSearch
# # from langchain.vectorstores import Chroma
# # from langchain.chains import RetrievalQAWithSourcesChain

# # # from langchain_google_genai import ChatGoogleGenerativeAI

# # # Build a sample vectorDB
# # from langchain.document_loaders import WebBaseLoader

# # from langchain.prompts.chat import (
# #     ChatPromptTemplate,
# #     SystemMessagePromptTemplate,
# #     HumanMessagePromptTemplate,
# # )

# # Gemini API Base URL
# BASE_URL = "https://api.gemini.com/v1"
def summarize_article(content):
    return
#     """
#     Summarizes an article using Gemini's LLM service.
#     """
#     endpoint = f"{BASE_URL}/summarize"
#     headers = {
#         "Authorization": f"Bearer {Config.GEMINI_API_KEY}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "text": content,
#         "options": {
#             "language": "en",
#             "summary_length": "short"  # Options: short, medium, long
#         }
#     }
    
#     response = requests.post(endpoint, json=payload, headers=headers)
    
#     if response.status_code == 200:
#         return response.json().get("summary")
#     else:
#         raise Exception(f"Gemini API Error: {response.status_code} - {response.text}")


def categorize_article(content):
    return
#     """
#     Categorizes an article using Gemini's LLM service.
#     """

#     with open('./RAG_data/categories.json', 'r', encoding='utf-8') as file:
#         texts = json.load(file)

#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001") # gemini의 임베딩 모델
#     # embeddings = OpenAIEmbeddings() # openai 의 임베딩모델

#     vector_store = Chroma.from_documents(texts, embeddings)
#     retriever = vector_store.as_retriever(search_kwargs={"k": 3})

#     system_template="""
#     Use the following pieces of context to find category of what users said.
#     If you don't know the answer, just say that "Categories not found", don't try to make up an answer.
#     ----------------
#     {summaries}

#     You MUST answer in Korean and in Markdown format:"""

#     messages = [
#         SystemMessagePromptTemplate.from_template(system_template),
#         HumanMessagePromptTemplate.from_template("{question}")
#     ]

#     prompt = ChatPromptTemplate.from_messages(messages)

#     chain_type_kwargs = {"prompt": prompt}

#     llm = ChatGoogleGenerativeAI(model="gemini-pro", 
#                                 convert_system_message_to_human=True) # gemini pro 모델
#     # llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)  # openai의 gpt-3.5-turbo 모델
                                

#     chain = RetrievalQAWithSourcesChain.from_chain_type(
#         llm=llm,
#         chain_type="stuff",
#         retriever = retriever,
#         return_source_documents=True,
#         chain_type_kwargs=chain_type_kwargs
#     )

#     #origin part

#     endpoint = f"{BASE_URL}/categorize"
#     headers = {
#         "Authorization": f"Bearer {Config.GEMINI_API_KEY}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "text": content
#     }
    
#     response = requests.post(endpoint, json=payload, headers=headers)
    
#     if response.status_code == 200:
#         return response.json().get("category")
#     else:
#         raise Exception(f"Gemini API Error: {response.status_code} - {response.text}")