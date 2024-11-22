from flask import Flask, render_template, send_from_directory, make_response
from pathlib import Path

app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory("static", "home.html")

@app.route("/")

@app.route("/<path:path>", methods=["GET", "POST"])
def static_files(path):
    print(path)
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
    app.run(debug=True)
