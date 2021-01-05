from flask import Flask
from flask import request,render_template
from flask_cors import CORS
import mechanicalsoup
from dotenv import load_dotenv
import os

app = Flask(__name__,template_folder='build')
CORS(app, supports_credentials=True)
load_dotenv()

BASE_URL = os.environ.get('BASE_URL')
NOAUTH = b'\t\t<script type="text/javascript"> \r\n  \t\twindow.top.location = "/sistema";\r\n  \t\t/*alert("PARA ACCEDER A ESTA OPCI\xd3N ES NECESARIO AUTENTIFICARSE EN EL SISTEMA")\r\n  \t\tjavascript: close()\r\n  \t\tjavascript: history.go(-1)*/\r\n\t\t</script> \r\n\t\tSi esta viendo este mensaje, es porque no tiene habilitado Javascript en su navegador, habilitelo y trate de nuevo'
HEADERS = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8,en-GB;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "frame",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
      }

browser = mechanicalsoup.StatefulBrowser(user_agent=HEADERS.get('User-Agent'))
browser.session.headers.update(HEADERS)
browser.set_verbose(2)

# TODO: Before deploy: build and change api routes to subdomain 'api'

@app.route("/")
def helloWorld():
  return render_template('index.html')


@app.route("/start")
def getcook():
  if browser.get_cookiejar().get('PHPSESSID'):
    return '',200
  browser.open(f'{BASE_URL}acceso.php',verify=False)
  if browser.get_cookiejar().get('PHPSESSID'):
    return ('goood',200)
  return 'error',500


@app.route("/login",methods=['POST'])
def login():
  browser.open(f'{BASE_URL}acceso.php',verify=False)
  browser.select_form()
  browser['usuario'] = request.form.get('usuario')
  browser['contrasena'] = request.form.get('contrasena')
  browser['tipo'] = 'a'
  print(browser.get_current_form().print_summary())
  browser.submit_selected()
    # TODO: Maybe pass no redirect
    # Add validation of being logged in  
  return 'logged in', 200
    

@app.route('/calif')
def calif():
  if not browser.get_cookiejar().get('PHPSESSID'):
    return "error", 500
  browser.open(f'{BASE_URL}modulos/alu//cons/calif_parciales_adeudo.php',verify=False)
  return str(browser.get_current_page()), 200
  # return s.cookies.get('PHPSESSID')
    

@app.route('/session')
def session():
  res = browser.get(f'{BASE_URL}modulos/alu//cons/calif_parciales_adeudo.php', verify=False)
  if res.content == NOAUTH:
    return "No authorized", 401
  return res.content, 200

@app.route('/signout')
def logout():
  res = browser.get(f'{BASE_URL}cerrar_sesion.php', verify=False)
  browser.close()
  return "Signed out", res.status_code


if __name__ == '__main__':
    app.run(debug=True)   
  