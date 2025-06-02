import json

def handler(request, context):
    try:
        # Simulate reading from Google Drive
        with open("/tmp/expenses.json", "r") as f:
            return json.load(f)
    except:
        return {}
