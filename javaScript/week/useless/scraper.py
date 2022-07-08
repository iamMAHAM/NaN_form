import json
from bs4 import BeautifulSoup
import requests

res = requests.get("http://www.air-dg.com/")
soup = BeautifulSoup(res.text, "html.parser")
items = soup.select(".item img")
print(items)
urls = []
for item in items:
    urls.append(item["src"])

open("links.json", "a").write(json.dumps(urls))