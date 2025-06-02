import json

def handler(request, context):
    try:
        data = request.json()
        with open("/tmp/expenses.json", "w") as f:
            json.dump(data, f)
        return { "status": "saved" }
    except Exception as e:
        return { "error": str(e) }
