from flask import Flask, render_template, send_from_directory, make_response, request, jsonify, session
from flask_socketio import SocketIO
from pathlib import Path
import json, logging, datetime

app = Flask(__name__)
app.secret_key = b'0t]"\xdf5%\x1d\x08\xa7\x13<\xd0\x0cz\xe4\x91\xf6\x81\x06&\xc2\xd6\x18'
socketio = SocketIO(app)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

# open config.json which is in the same directory as main.py
with open(f"{Path(__file__).parent}/config.json", "r") as f:
    config = json.load(f)

@app.route("/")
def index():
    return send_from_directory("static", "home.html")

@app.route("/ps/")
def private_server():
    return send_from_directory("static", "ps.html")

@app.route("/ps/server", methods=["GET", "POST"])
def server():
    binary_data = request.data
    import json
    data_str = binary_data.decode('utf-8')
    data = json.loads(data_str)
    if data.get("cmd") == "ping":
        return_data = {"event": "pong", "time": data.get("time"), "now": datetime.datetime.now().timestamp().__int__()}
    elif data.get("cmd") == "cpu":
        return_data = 1.0
    elif data.get("cmd") == "socket":
        room = data.get("room")
        session["room"] = room
        return_data = {"event": "socket", "uri": config["uri"]}
    else:
        print(data)
        return_data = {"event": "error", "error": "This command has not been implemented in Origami."}
    return jsonify(return_data)

@app.route("/ps/server/leaderboards", methods=["GET", "POST"])
def server_leaderboards():
    return jsonify([[], None, None, [], None, None])

@app.route("/<path:path>", methods=["GET", "POST"])
def static_files(path):
    denylist = ["newpaperio/scripts/unfecth.js"]
    if Path(f"static/{path}").exists() and path not in denylist:
        return send_from_directory("static", path)
    else:
        if path.endswith(".svg"):
            return send_from_directory("static", "smiley.svg")
        elif path.endswith(".png"):
            return send_from_directory("static", "smiley.png")
        return make_response("Not Found", 404)

if __name__ == "__main__":
    socketio.run(app, debug=True)
