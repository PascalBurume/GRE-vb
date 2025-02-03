from flask import Flask, render_template, request, jsonify
import urllib.request
import json
import os
import ssl
import config

app = Flask(__name__)

def allowSelfSignedHttps(allowed):
    if allowed and not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
        ssl._create_default_https_context = ssl._create_unverified_context

allowSelfSignedHttps(True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    try:
        user_text = request.args.get('msg')
        chat_history = []

        data = {"chat_history": chat_history, "chat_input": user_text}
        body = json.dumps(data).encode('utf-8')

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {config.AZURE_ENDPOINT_KEY}',
            'azureml-model-deployment': config.MODEL_DEPLOYMENT_NAME
        }

        req = urllib.request.Request(config.AZURE_ENDPOINT_URL, body, headers)
        response = urllib.request.urlopen(req)
        response_data = json.loads(response.read().decode('utf-8'))

        if 'chat_output' in response_data:
            return jsonify({
                "response": response_data['chat_output'],
                "type": "analysis",
                "components": {
                    "score": 4.5,
                    "feedback": ["Good thesis statement", "Improve conclusion"]
                }
            })
        return jsonify({
            "response": "Error: Invalid response format from API",
            "type": "error"
        })

    except urllib.error.HTTPError as error:
        print(f"HTTP Error: {error.code}")
        return jsonify({
            "response": "Sorry, I'm experiencing technical difficulties. Please try again later.",
            "type": "error"
        })
    except Exception as e:
        print(f"General Error: {str(e)}")
        return jsonify({
            "response": "An unexpected error occurred. Please try again.",
            "type": "error"
        })

if __name__ == "__main__":
    app.run(debug=True)

    ## Python App