from flask import Flask, redirect, url_for, request
app = Flask(__name__)

@app.route('http://localhost:3000/persons',methods = ['POST', 'GET'])
def persons():
    f = open('db.json',) 
    return json.load(f)
    f.close()

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['nm']
      return redirect(url_for('success',name = user))
   else:
      user = request.args.get('nm')
      return redirect(url_for('success',name = user))

if __name__ == '__main__':
   app.run(debug = True)