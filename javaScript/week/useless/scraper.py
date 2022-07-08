import json
from bs4 import BeautifulSoup
import requests

res = requests.get("")
soup = BeautifulSoup(res.text, "html.parser")
items = soup.select(".item img")
print(items)
urls = []
for item in items:
    urls.append(item["src"])

open("links.json", "w").write(json.dumps(urls))