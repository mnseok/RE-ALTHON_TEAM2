import unittest
from app import create_app

class TestRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_fetch_news(self):
        response = self.client.get('/fetch-news')
        self.assertEqual(response.status_code, 200)

    def test_summarize(self):
        response = self.client.post('/summarize', json={"content": "This is a test article."})
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)
