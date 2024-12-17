import sys
import json
import joblib
import pandas as pd
from transformers import pipeline, AutoTokenizer, TFAutoModelForSequenceClassification
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from googleapiclient.discovery import build  # Import the YouTube API client
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

# Load dataset
try:
    df = pd.read_csv("hf://datasets/maharshipandya/spotify-tracks-dataset/dataset.csv")  # Adjust path to your dataset
except Exception as e:
    print(json.dumps({"error": f"Error loading dataset: {str(e)}"}))
    sys.exit(1)

# Define relevant features
features = ['danceability', 'energy', 'valence', 'loudness', 'tempo']
song_data = df[features]

# Normalize data and save scaler and normalized data
scaler = StandardScaler()
normalized_data = scaler.fit_transform(song_data)
joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(normalized_data, "models/normalized_data.pkl")

# Initialize and save sentiment analysis model
try:
    sentiment_analyzer = pipeline("sentiment-analysis")
    sentiment_analyzer.save_pretrained("models/sentiment_analyzer")
except Exception as e:
    print(json.dumps({"error": f"Error initializing sentiment model: {str(e)}"}))
    sys.exit(1)

# Function to map sentiment to mood features
def sentiment_to_mood_features(sentiment):
    mood_mapping = {
        'POSITIVE': {'danceability': 0.8, 'energy': 0.9, 'valence': 0.7, 'loudness': -5, 'tempo': 120},
        'NEGATIVE': {'danceability': 0.4, 'energy': 0.3, 'valence': 0.2, 'loudness': -7, 'tempo': 60},
        'NEUTRAL': {'danceability': 0.5, 'energy': 0.5, 'valence': 0.5, 'loudness': -6, 'tempo': 90}
    }
    return mood_mapping.get(sentiment, mood_mapping['NEUTRAL'])

# Function to recommend songs based on mood
def recommend_songs_by_mood(mood_features, scaler, normalized_data, num_recommendations=10):
    # Convert mood features to a DataFrame to preserve feature names
    mood_features_df = pd.DataFrame([mood_features])
    
    # Normalize mood features
    normalized_mood_features = scaler.transform(mood_features_df)

    # Calculate similarity scores
    similarity_scores = cosine_similarity(normalized_mood_features, normalized_data)
    recommended_indices = similarity_scores[0].argsort()[-num_recommendations:][::-1]
    
    # Retrieve recommended songs
    recommended_songs = df.iloc[recommended_indices][['track_name', 'artists']]
    return recommended_songs.to_dict(orient="records")

# Function to get YouTube links using the YouTube Data API
def get_youtube_link(track_name, artist_name, api_key):
    youtube = build("youtube", "v3", developerKey=api_key)
    query = f"{track_name} {artist_name}"
    
    # Search for the song on YouTube
    request = youtube.search().list(q=query, part="id,snippet", type="video", maxResults=1)
    response = request.execute()

    if response.get('items'):
        video_id = response['items'][0]['id']['videoId']
        return f"https://www.youtube.com/watch?v={video_id}"
    else:
        return None  # If no video is found

# Main entry point
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input sentence provided"}))
        sys.exit(1)

    sentence = sys.argv[1]  # Input sentence
    
    try:
        # Load pre-trained scaler and normalized data
        scaler = joblib.load("models/scaler.pkl")
        normalized_data = joblib.load("models/normalized_data.pkl")

        # Load sentiment analyzer model
        tokenizer = AutoTokenizer.from_pretrained("models/sentiment_analyzer")
        model = TFAutoModelForSequenceClassification.from_pretrained("models/sentiment_analyzer")
        sentiment_analyzer = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

        # Analyze sentiment
        sentiment_result = sentiment_analyzer(sentence)
        sentiment = sentiment_result[0]['label']

        # Map sentiment to mood features and recommend songs
        mood_features = sentiment_to_mood_features(sentiment)
        recommended_songs = recommend_songs_by_mood(mood_features, scaler, normalized_data)
        
        # Fetch YouTube links for recommended songs
        api_key = "AIzaSyBD_7akU_acm3zYIwd9egAenM-7UMYmUDM"  # Replace with your YouTube API key
        for song in recommended_songs:
            track_name = song['track_name']
            artist_name = song['artists']
            youtube_link = get_youtube_link(track_name, artist_name, api_key)
            song['youtube_link'] = youtube_link  # Add the YouTube link to the song data
           
        # Print results as JSON with YouTube links
        print(json.dumps({
            'sentiment': sentiment,
            'recommended_songs': recommended_songs
        }, indent=4))  # Added indent for better readability of the output

    except Exception as e:
        print(json.dumps({"error": f"An error occurred: {str(e)}"}))
        sys.exit(1)
