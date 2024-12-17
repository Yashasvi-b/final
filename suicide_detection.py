import sys
import json
import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0' 

# Load the trained model and tokenizer
model = load_model("./models/suicide.h5")  # Load the trained model
tokenizer = pickle.load(open("./models/tokenizer.pkl", "rb"))  # Load the tokenizer

# Function to preprocess and predict the input text
def predict_story(text):
    # Tokenize the input text
    seq = tokenizer.texts_to_sequences([text])
    # Pad the sequences to ensure they are the same length as the training data
    padded_seq = pad_sequences(seq, maxlen=50)
    
    # Predict the sentiment (whether it's a potential suicide post or not)
    prediction = model.predict(padded_seq)[0][0]
    
    # Return the result based on the prediction threshold (0.5)
    return "Potential Suicide Post" if prediction > 0.5 else "Non Suicide Post"

if __name__ == "__main__":
    input_text = sys.argv[1]  # Get the input text from the command line argument
    try:
        # Get the prediction for the input text
        result = predict_story(input_text)
        # Print the result as JSON
        print(json.dumps({"prediction": result}))
    except Exception as e:
        # In case of any error, print the error message in JSON format
        print(json.dumps({"error": str(e)}))

