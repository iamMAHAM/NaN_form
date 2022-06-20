#!/usr/bin/python3
import requests
from bs4 import BeautifulSoup

def getDetails(url):
    res = requests.get(url).text
    soup = BeautifulSoup(res, "html.parser").select(".ul-attributes")
    print(soup)
    data = {
        "who": soup[0].select(".attribute-value")[0].get_text().replace(" ", "").replace("\n", ""),
        "authw": soup[0].select(".attribute-value")[1].get_text().replace(" ", "").replace("\n", ""),
        "milk-c": soup[0].select(".attribute-value")[2].get_text().replace(" ", "").replace("\n", ""),
        "figure": soup[0].select(".attribute-value")[3].get_text().replace(" ", "").replace("\n", "")
    }
    return data


if __name__ == "__main__":
    getDetails("https://www.pharma-gdd.com/fr/daflon-500-mg")
