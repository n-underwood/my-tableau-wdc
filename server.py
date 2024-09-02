from flask import Flask, request, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/getData')
def get_data():
    symbol = request.args.get('symbol')
    data = yf.download(symbol, period="1y")
    data.reset_index(inplace=True)
    json_data = data.to_dict(orient="records")
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
