import os

from flask import request, render_template

from nosiit import app, browser, NOAUTH

BASE_URL = os.environ.get('BASE_URL')


# TODO: Before deploy: build and change api routes to subdomain 'api'

@app.route("/")
def hello_world():
    return render_template('index.html')


@app.route("/start")
def get_cookie():
    if browser.get_cookiejar().get('PHPSESSID'):
        return '', 200
    browser.open(f'{BASE_URL}acceso.php', verify=False)
    if browser.get_cookiejar().get('PHPSESSID'):
        return 'good', 200
    return 'error', 500


@app.route("/login", methods=['POST'])
def login():
    browser.open(f'{BASE_URL}acceso.php', verify=False)
    browser.select_form()
    browser['usuario'] = request.form.get('usuario')
    browser['contrasena'] = request.form.get('contrasena')
    browser['tipo'] = 'a'
    # print(browser.get_current_form().print_summary())
    browser.submit_selected()
    # TODO: Maybe pass no redirect
    # Add validation of being logged in
    return 'logged in', 200


@app.route('/calif')
def calif():
    if not browser.get_cookiejar().get('PHPSESSID'):
        return "error", 401
    browser.open(f'{BASE_URL}modulos/alu//cons/calif_parciales_adeudo.php', verify=False)
    # TODO: Remove tec_estilo.css
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
    # browser.close()
    return "Signed out", res.status_code
