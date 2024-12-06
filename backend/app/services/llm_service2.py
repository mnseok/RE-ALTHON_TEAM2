import pandas as pd
from sentence_transformers import SentenceTransformer, util
import google.generativeai as genai




# 1. Load the CSV database
def load_db(file_path):
    return pd.read_csv(file_path)

# 2. Function to calculate bias for the input news article using RAG-like approach
def calculate_article_bias(news_article, db, model_name="multi-qa-MiniLM-L6-cos-v1", threshold=0.6):
    model = SentenceTransformer(model_name)

    # Encode the input news article
    article_embedding = model.encode(news_article, convert_to_tensor=True)

    # Prepare the "주요 문장" corpus and corresponding bias scores
    sentences_with_bias = [
        (sentence.strip(), row["편향성 평가"])
        for _, row in db.iterrows()
        for sentence in row["주요 문장"].split(",")  # Split each "주요 문장" by comma
    ]

    main_sentences = [item[0] for item in sentences_with_bias]  # List of sentences
    bias_scores = [item[1] for item in sentences_with_bias]  # List of bias scores

    # Calculate embeddings for main sentences
    main_sentence_embeddings = model.encode(main_sentences, convert_to_tensor=True)

    # Calculate the similarity between the input news article and "주요 문장"
    similarity_scores = util.pytorch_cos_sim(article_embedding, main_sentence_embeddings)

    # Extract the relevant sentences that are similar enough (above threshold)
    similar_sentences_with_scores = []
    total_bias = 0
    for i, score in enumerate(similarity_scores[0]):
        if score > threshold:
            similar_sentence = main_sentences[i]
            bias_score = bias_scores[i]  # Retrieve the correct bias score
            total_bias += bias_score
            similar_sentences_with_scores.append((similar_sentence, bias_score))

    # Normalize the bias score by the number of similar sentences
    normalized_bias = total_bias / len(similar_sentences_with_scores) if similar_sentences_with_scores else 0

    return {
        "기사 제목": news_article,
        "편향성 평가": normalized_bias,
        "유사 문장": similar_sentences_with_scores  # List of (sentence, bias_score)
    }

def GetTopic(content):

    question = """
    다음 기사글이 "금융투자세","기본소득","의료민영화","의대정원확대","동덕여대","뉴진스" 중에 어느주제에 가장 가까울까? 한글 답만 출력해줘.
    /////////
    """+ content


    # Google Generative AI 설정
    genai.configure(api_key="AIzaSyBfO8vvlYJ2aTZBdos9pTVJxAFDN-SUv_I")
    # 모델 초기화
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(question)

    output = response.candidates[0].content.parts[0].text

    return output

def getArticleBias(content, topic):

    topic_map = {
    "금융투자세": 1,
    "기본소득": 2,
    "의료민영화": 3,
    "의대정원확대": 4,
    "동덕여대": 5,
    "뉴진스": 6
    }

    db_path = "backend/app/services/RAG_data/"+topic_map[topic]+".csv"

    result = calculate_article_bias(content,db_path)

    return result

def getSummary(content):

    question = """
    다음 기사글 요약해줘.
    /////////
    """+ content


    # Google Generative AI 설정
    genai.configure(api_key="AIzaSyBfO8vvlYJ2aTZBdos9pTVJxAFDN-SUv_I")
    # 모델 초기화
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(question)

    output = response.candidates[0].content.parts[0].text

    return output




# # Example usage
# file_path = "backend/app/services/RAG_data/ArticleLabelling.csv"  # Replace with your CSV database file path
# db = load_db(file_path)

# # Example news article (as input string)
# news_article = """"""

# # Calculate bias and retrieve relevant sentences
# result = calculate_article_bias(news_article, db)

# # Output the result
# print("Degree of Bias:", result["편향성 평가"])
# print("\nBias Sentences with Scores:")
# for sentence, score in result["유사 문장"]:
#     print(f"- Sentence: {sentence} (Bias: {score})")




# # Google Generative AI 설정
# genai.configure(api_key="AIzaSyBfO8vvlYJ2aTZBdos9pTVJxAFDN-SUv_I")

# # 모델 초기화
# model = genai.GenerativeModel("gemini-1.5-flash")

# # 콘텐츠 생성
# response = model.generate_content("""
# 다음 기사글이 1.금융투자세 2.기본 소득 3.의료민영화 4.의대정원확대 5.동덕여대 6.뉴진스 중에 어느주제에 가장 가까울까? 한글 답만 출력해줘""")
# print(response.candidates[0].content.parts[0].text)
