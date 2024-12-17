# from fuzzywuzzy import process
# import json

# # Step 1: Load and parse the JSON dataset
# file_path = 'merge.json'  # Replace with your file's path

# # Load the JSON file
# with open(file_path, 'r', encoding='utf-8') as file:
#     data = json.load(file)

# # Extract context-response pairs from the "rows"
# rows = data['rows']  # Access the rows key in your JSON structure
# context_response_pairs = {
#     row['row']['Context']: row['row']['Response']
#     for row in rows
# }

# # Step 2: Define the chatbot function with fuzzy matching
# def chatbot():
#     print("Chatbot: Hi, I'm here to help. Ask me anything or type 'exit' to quit.")
#     while True:
#         user_input = input("You: ")
#         if user_input.lower() == 'exit':
#             print("Chatbot: Goodbye! Take care!")
#             break

#         # Use fuzzy matching to find the best matching context
#         matched_context, score = process.extractOne(user_input, context_response_pairs.keys())
#         if score > 70:  # Set a confidence threshold (adjust if needed)
#             response = context_response_pairs[matched_context]
#             print(f"Chatbot: {response}")
#         else:
#             print("Chatbot: I'm sorry, I don't have a response for that. Could you rephrase?")

# # Step 3: Run the chatbot
# chatbot()
from flask import Flask, request, jsonify
from fuzzywuzzy import process
from flask_cors import CORS
import json

# Load the JSON dataset
file_path = 'merge.json'

with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Extract context-response pairs
rows = data['rows']
context_response_pairs = {
    row['row']['Context']: row['row']['Response']
    for row in rows
}

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/chatbot', methods=['POST'])  # Correct route definition
def chatbot():
    user_input = request.json.get("message", "")  # Extract user input

    if not user_input:
        return jsonify({"response": "No message provided"}), 400

    # Use fuzzy matching to find the best matching context
    matched_context, score = process.extractOne(user_input, context_response_pairs.keys())
    if score > 70:
        response = context_response_pairs[matched_context]
    else:
        response = "I'm sorry, I don't have a response for that. Could you rephrase?"

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5002, host='0.0.0.0')  # Host set to all IPs
