from importlib import resources
import bs4
from urllib.request import urlopen, Request
from urllib.parse import quote;
from bs4 import BeautifulSoup as soup
import json
import re
import os
# run pip install https://github.com/elyase/geotext/archive/master.zip to install the below package
from geotext import GeoText
from datetime import datetime

# load diseases and sydromes
script_dir = os.path.dirname(__file__)
disease_list = json.load(open(os.path.join(script_dir, 'disease_list.json')))
syndrome_list = json.load(open(os.path.join(script_dir, 'syndrome_list.json')))
keywords_list = json.load(open(os.path.join(script_dir, 'keywords_list.json')))

def get_data_multiple_pages():
    results = []
    page_no = 1
    for page_no in range(1, 9):
        my_url = 'https://www.who.int/emergencies/disease-outbreak-news/{}'.format(page_no)
        # my_url = my_url.encode('utf-8')
        results += get_data(my_url)
    return json.dumps(results)




def get_data(my_url):
    # open a connection and grab the page
    # my_url = my_url.encode('utf-8')
    req = Request(my_url, headers={'User-Agent': 'Mozilla/5.0'})
    page_html = urlopen(req).read()

    # parse the html
    page_soup = soup(page_html, "html.parser")
    containers = page_soup.findAll("a", {"class":"sf-list-vertical__item"})
    id = 0
    results = []
    for container in containers:
        id += 1
        article = {}

        article['id'] = str(id)
        # go into each article
        article_link = container['href']

        # encode the article
        article_link = quote(article_link, safe=':/()', encoding=None, errors=None)

        article['url'] = article_link
        req = Request(article_link, headers={'User-Agent': 'Mozilla/5.0'})
        article_html = urlopen(req).read()
        article_soup = soup(article_html, "html.parser")
        
        # retrieve publication date - Date formatted as "Day Month Year" currently - can change later on if necessary
        publication_date = article_soup.find("span", {"class":"timestamp"}).text
        date_object = datetime.strptime(publication_date, '%d %B %Y')
        article['date_of_publication'] = str(date_object.isoformat())

        # retrieve headline
        headline_div = article_soup.find("div", {"class":"sf-item-header-wrapper"})
        headline = headline_div.h1.text.strip()
        article['headline'] = headline

        
        
        # get all paragraphs
        paragraphs_data = article_soup.find_all("p")
        text = ""
        for paragraph in paragraphs_data:
            text += paragraph.get_text() 

        # retrieve main text
        main_text = ""
        main_text += paragraphs_data[0].get_text()
        if len(main_text) < 25:
            main_text += paragraphs_data[1].get_text()
        article['main_text'] = main_text
    
        # passing in all the text in the page already
        article['reports'] = get_reports(article_soup.get_text(), text, disease_list, syndrome_list)
        # retrieve reports
        # return
        results.append(article)
    # return json.dumps(results)
    return results

def get_reports(all_text, text, disease_list, syndrome_list):
    reports = []
    
    date = re.findall(r'\d\d? [A-Z][a-z]+ \d\d\d\d', all_text)
    report = {}

    report['diseases'] = ['unknown']
    report['syndromes'] = ['unknown']
    report['keywords'] = []

    for disease in disease_list:
        if disease['name'] == "unknown" or disease['name'] == "other":
            continue
        if disease['name'].lower() in text.lower():
            report['diseases'] = [disease['name'].title()]
            break

    for syndrome in syndrome_list:
        if syndrome['name'] == "unknown" or syndrome['name'] == "other":
            continue
        if syndrome['name'].lower() in text.lower():
            report['syndromes'] = [syndrome['name'].title()]
            break

    for keyword in keywords_list:
        if keyword['name'].lower() in text.lower():
            report['keywords'].append(keyword['name'])

    date_object = datetime.strptime(date[0], '%d %B %Y')
    report['event_date'] = str(date_object.isoformat())

    cities = GeoText(text).cities
    countries = GeoText(text).countries
    
    report['locations'] = []
    if len(cities) != 0 and cities[0] != "March" and cities[0] != "Of":
        report['locations'].append(cities[0])
    if len(countries) != 0 and countries[0] != "March" and countries[0] != "Of":
        report['locations'].append(countries[0])

    
    reports.append(report)
    return reports


if __name__=="__main__":
    # print(get_data('https://www.who.int/emergencies/disease-outbreak-news'))
    print(get_data_multiple_pages())