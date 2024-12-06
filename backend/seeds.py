import json

userData = [
    {
        "id": 1,
        "email": "mock@naver.com",
        "password": "1234"
    },
]

# "topic1": "금융투자세",
# "topic2": "기본소득",
# "topic3": "의료민영화",
# "topic4": "의대 정원 확대",
# "topic5": "동덕여대",
# "topic6": "뉴진스"

topicData = [
    {
        "id": 1,
        "positive": "금융투자세 인상",
        "negative": "금융투자세 인상 반대",
        "title": "금융투자세"
    },
    {
        "id": 2,
        "positive": "기본소득 도입",
        "negative": "기본소득 반대",
        "title": "기본소득"
    },
    {
        "id": 3,
        "positive": "의료민영화",
        "negative": "의료민영화 반대",
        "title": "의료민영화"
    },
    {
        "id": 4,
        "positive": "의대 정원 확대",
        "negative": "의대 정원 확대 반대",
        "title": "의대 정원 확대"
    },
    {
        "id": 5,
        "positive": "동덕여대",
        "negative": "동덕여대 반대",
        "title": "동덕여대"
    },
    {
        "id": 6,
        "positive": "뉴진스",
        "negative": "뉴진스 반대",
        "title": "뉴진스"
    },
]

import os
import json

# JSON 파일들이 위치한 디렉토리 경로
json_directory = 'seed/'

topic_map = {
    "investment_tax": 1,
    "basicsoduk": 2,
    "medicalPrivatization": 3,
    "expansionMedical": 4,
    "dongduk": 5,
    "newjeans": 6
}

# 모든 JSON 파일의 데이터를 합치기 위한 리스트
articleDatas = []

# 디렉토리 내 JSON 파일 읽기
for filename in os.listdir(json_directory):
    if filename.endswith('.json'):  # JSON 파일만 처리
        topic_id = topic_map[filename.split('.')[0]]  # 파일명에서 topic_id 추출
        print(f"Processing {filename.split('.')[0]}... topic_id: {topic_id}")
        filepath = os.path.join(json_directory, filename)
        with open(filepath, 'r') as file:
            data = json.load(file)  # JSON 데이터 로드
            # 각 파일의 데이터를 articleDatas에 추가
            articleDatas.extend([
                {
                    "topic_id": topic_id,
                    "title": d['title'],
                    "content": d['content'],
                    "press_name": d['press_name'],
                    "created_at": d['date'],
                    "views": d['views'],
                    "comments": d['comments'],
                    "thumbnail_url": d['thumbnail_url'],
                    "original_url": d['original_url']
                }
                for d in data
            ])

perspectiveData = [
    {
        "id": 1,
        "topic_id": 1,
        "title": "perspective title",
        "attitude": True
    },
    {
        "id": 2,
        "topic_id": 1,
        "title": "perspective title",
        "attitude": False
    }
]

from app.models import User, Topic, Article, Perspective
from datetime import datetime  # datetime 모듈 추가

def seed(db):
    # 사용자 데이터 삽입
    for user in userData:
        if not User.query.filter_by(email=user["email"]).first():
            new_user = User(
                id=user["id"],
                email=user["email"],
                password=user["password"]
            )
            db.session.add(new_user)

    # 토픽 데이터 삽입
    for topic in topicData:
        if not Topic.query.filter_by(id=topic["id"]).first():
            new_topic = Topic(
                id=topic["id"],
                positive=topic["positive"],
                negative=topic["negative"],
                title=topic["title"]
            )
            db.session.add(new_topic)

    # 아티클 데이터 삽입
    for article in articleDatas:
        new_article = Article(
            topic_id=article["topic_id"],
            title=article["title"],
            content=article["content"],
            press_name=article["press_name"],
            created_at=datetime.strptime(article["created_at"], "%y%m%d"),
            views=article["views"],
            comments=article["comments"],
            thumbnail_url=article["thumbnail_url"],
            original_url=article["original_url"]
        )
        db.session.add(new_article)

    # 관점 데이터 삽입
    for perspective in perspectiveData:
        if not Perspective.query.filter_by(id=perspective["id"]).first():
            new_perspective = Perspective(
                id=perspective["id"],
                topic_id=perspective["topic_id"],
                title=perspective["title"],
                attitude=perspective["attitude"]
            )
            db.session.add(new_perspective)

    # 변경사항 커밋
    db.session.commit()
    print("Seed data added successfully.")
