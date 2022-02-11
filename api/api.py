from flask import Flask, jsonify 
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)


class tweet_database(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)
    def __str__(self):
        return f'{self.id} {self.content}'
def tweet_serializer(tweet):
    return{
        'id': tweet.id,
        'content': tweet.content
    }

@app.route('/api', methods=['GET'])
def index():
    tweets = tweet_database.query.one()
    print(tweets.content)
    return jsonify(tweets.content)
if __name__ == '__main__':
    app.run(debug = True)