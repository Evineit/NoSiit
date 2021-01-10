from warnings import filterwarnings

from nosiit import app
from dotenv import load_dotenv
from urllib3.exceptions import InsecureRequestWarning

if __name__ == '__main__':
    load_dotenv()
    filterwarnings(action='ignore', category=InsecureRequestWarning)
    app.run(debug=True)

