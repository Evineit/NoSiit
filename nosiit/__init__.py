from flask import Flask
from flask_cors import CORS
import mechanicalsoup


app = Flask(__name__, template_folder='build')
CORS(app, supports_credentials=True)

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
# browser.set_verbose(2)
from . import routes
