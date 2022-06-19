#!/usr/bin/python3

import requests
from bs4 import BeautifulSoup
import json

baseUrl = "https://www.pharma-gdd.com/"
datas_list = []


def write(filename, data):
    with open(filename, "a") as fj:
        fj.write(data)


def fetch():
    res = requests.get(baseUrl, headers={
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ny;q=0.6",
        "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36"
    }).content
    soup = BeautifulSoup(res, "html.parser").find_all("div", class_="product")
    print(type(soup))
    for item in soup:
        print("============================ITEM 1\n", item.prettify())
        data = {
            "title": item.select("div.product-brand")[0].get_text(),
            "img": item.select("img.lazyload")[0].get("data-src"),
            "redirect": item.select("a")[0].get("href"),
            "description": item.select("div.product-subtitle")[0].get_text(),
            "prices": item.select("div.listing-price")[0].find_all("span")[-1].get_text().replace("\xa0", " ")
        }
        datas_list.append(data)
    
    json_to_write = json.dumps(datas_list, indent=4, ensure_ascii=False)
    write("datas.json", json_to_write)


if __name__ == "__main__":
    fetch()
    print(datas_list)