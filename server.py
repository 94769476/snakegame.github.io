from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

high_scores = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/highscore', methods=['GET', 'POST'])
def highscore():
    if request.method == 'POST':
        score = request.json.get('score')
        high_scores.append(score)
        high_scores.sort(reverse=True)
        return jsonify({"message": "Score added!"}), 201
    else:
        return jsonify(high_scores), 200

if __name__ == '__main__':
    app.run(debug=True)
