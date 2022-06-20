#!/usr/bin/python3

from numpy import who
import requests
from bs4 import BeautifulSoup
import json

baseUrl = "https://www.pharma-gdd.com"
datas_list = []
headers = {
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ny;q=0.6",
        "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36"
    }

def write(filename, data):
    with open(filename, "a") as fj:
        fj.write(data)


def fetch():
    res = requests.get(baseUrl, headers=headers).content
    soup = BeautifulSoup(res, "html.parser").find_all("div", class_="product")
    for item in soup:
        print("============================ITEM 1\n")
        print("link : ", baseUrl, item.select("a")[0].get("href"))
        complement = getDetails("{}{}".format(baseUrl, item.select("a")[0].get("href")))
        print(complement)
        data = {
            "title": item.select("div.product-brand")[0].get_text(),
            "img": item.select("img.lazyload")[0].get("data-src"),
            "redirect": item.select("a")[0].get("href"),
            "description": item.select("div.product-subtitle")[0].get_text(),
            "prices": item.select("div.listing-price")[0].find_all("span")[-1].get_text().replace("\xa0", " "),
            "who": complement.get("who", ""),
            "authw": complement.get("authw", ""),
            "milk-c": complement.get("milk-c", ""),
            "figure": complement.get("figure", ""),
        }
        datas_list.append(data)
    
    json_to_write = json.dumps(datas_list, indent=4, ensure_ascii=False)
    write("datas.json", json_to_write)

def getDetails(url):
    res = requests.get(url, headers=headers).text
    soup = BeautifulSoup(res, "html.parser").select(".ul-attributes")
    try:
        data = {
            "who": trailing(soup),
            "authw": soup[0].select(".attribute-value")[1].get_text().strip().replace("\n", ""),
            "milk-c": soup[0].select(".attribute-value")[2].get_text().strip().replace("\n", ""),
            "figure": soup[0].select(".attribute-value")[3].get_text().strip().replace("\n", "")
        }
    except IndexError:
        data = {
            "who": "hommes, femmes, enfants",
            "authw": "Autorisé",
            "milk-c": "Autorisé",
            "figure": "Accesoires, huiles"
        }
    return data

def trailing(soup):
    soup = soup[0].select(".attribute-value")[0].get_text().strip().split(",")
    soup = [line.strip() for line in soup]
    return ", ".join(soup)

if __name__ == "__main__":
    fetch()