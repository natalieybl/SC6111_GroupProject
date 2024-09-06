from flask import Flask, render_template, request, redirect, url_for, session, jsonify, make_response
import mariadb
import os

app = Flask(__name__)
app.secret_key = 'VTJenyxQPjBgCtHNcU8kuzYa7FShdGRmqp2A'

@app.route('/', methods=["GET","POST"])
def index():
    return render_template('index.html')

# Connect to MariaDB
def get_db_connection():
    try:
        connection = mariadb.connect(
            user="root",         # Your MariaDB username
            password="123456",     # Your MariaDB password
            host="localhost",             # Your MariaDB host
            port=3306,                    # Default MariaDB port
            database="tokens"      # Your database name
        )
        return connection
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB: {e}")
        return None

# Route for buying BTC
@app.route("/buy_btc", methods=["GET", "POST"])
def buy_btc():
    data = request.json
    price = data.get("price")
    amount = data.get("amount")

    if not price or not amount:
        return jsonify({"message": "Invalid input"}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = connection.cursor()

    try:
        user_id = 1
        # Insert buy order into the database
        query = "INSERT INTO order_book (type, order_price, order_amount, user_id) VALUES (?, ?, ?, ?)"
        cursor.execute(query, ('buy', price, amount, user_id))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Buy order placed successfully"}), 200

    except mariadb.Error as e:
        print(f"Error inserting buy order: {e}")
        return jsonify({"message": "Failed to place buy order"}), 500

# Route for selling BTC
@app.route("/sell_btc", methods=["GET","POST"])
def sell_btc():
    data = request.json
    price = data.get("price")
    amount = data.get("amount")

    if not price or not amount:
        return jsonify({"message": "Invalid input"}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = connection.cursor()

    try:
        user_id = 1
        # Insert sell order into the database
        query = "INSERT INTO order_book (type, order_price, order_amount, user_id) VALUES (?, ?, ?, ?)"
        cursor.execute(query, ('sell', price, amount, user_id))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Sell order placed successfully"}), 200

    except mariadb.Error as e:
        print(f"Error inserting sell order: {e}")
        return jsonify({"message": "Failed to place sell order"}), 500

@app.route('/orderbook', methods=["GET","POST"])
def get_order_book():
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Query buy list
    cursor.execute("SELECT order_price, sum(order_amount), (order_price * SUM(order_amount)) as total FROM order_book WHERE type = 'buy' GROUP BY order_price ORDER BY order_price DESC LIMIT 10")
    #SELECT price, amount, (price * amount) as total FROM order_book
    #SELECT user_id,type,order_price,SUM(order_amount) FROM order_book WHERE type = 'buy' GROUP BY order_price ORDER BY order_price DESC LIMIT 20
    buylist = cursor.fetchall()
    
    # Query sell list
    cursor.execute("SELECT order_price, sum(order_amount), (order_price * SUM(order_amount)) as total FROM order_book WHERE type = 'sell' GROUP BY order_price ORDER BY order_price DESC LIMIT 10")
    selllist = cursor.fetchall()
    
    # Close connection
    cursor.close()
    connection.close()
    
    return jsonify({
        'buylist': buylist,
        'selllist': selllist
    })

if __name__ == '__main__':
    app.run(debug=True)

