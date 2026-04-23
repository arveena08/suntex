import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Backend API tests for Suntex Traders contact endpoints

class TestContactAPI:
    """Tests for POST /api/contact and GET /api/contact"""

    def test_post_contact_success(self):
        payload = {"name": "TEST_User", "email": "test@example.com", "message": "TEST_Hello from pytest"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_User"
        assert data["email"] == "test@example.com"
        assert "id" in data
        assert data["status"] == "new"
        print("POST /api/contact: PASS")

    def test_post_contact_missing_fields(self):
        payload = {"name": "TEST_User"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print("POST /api/contact missing fields: PASS")

    def test_get_contact_messages(self):
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"GET /api/contact: PASS - {len(data)} messages found")

    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("GET /api/: PASS")
