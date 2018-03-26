import requests

from bs4 import BeautifulSoup
from urllib import urlretrieve
import urlparse
from bs4 import BeautifulSoup
import urllib2
import re
import os
import MySQLdb

db=MySQLdb.connect(host="shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com", user="mcheung3",passwd="shoemania", db = "shoemania")
c=db.cursor()


url_main = "https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3"
page = requests.get(url_main)
soup = BeautifulSoup(page.content, 'html.parser')
shoes = soup.find(id="exp-gridwall-wrapper")
wall2 = shoes.find("div", class_="exp-gridwall")
to_be_urls = wall2.find_all("div", class_="grid-item fullSize")
url_list = []

for i in to_be_urls:
    temp = i.a
    url_list.append(temp['href'])


#This gets each shoes data; creates a folder, and stores the picture and other information there
for url in url_list:
	try:
	    print(url)
	    page = requests.get(url)
	    soup = BeautifulSoup(page.content, 'html.parser')
	    shoe = soup.find(id="react-root")
	    h2 = shoe.h2.text
	    ll = h2.split("$")
	    shoe_type = ll[0]
	    shoe_price = int(ll[1])
	    shoe_name = shoe.h1.text
	    ll2 = shoe.find("div", class_="description-preview").text
	    ll2 = ll2.split("Shown: ")
	    shoe_desciption = ll2[0]
	    shoe_color_shown = ((ll2[1]).split("Style"))[0]
	    shoe_brand = "Nike"
	    path = "webscrapping_cs411/"
	    dir_title = re.sub("\s", "_", shoe_name)
	    call = "mkdir "+path+dir_title
	    os.system(call)
	    imgs = soup.select('img')
	    img = imgs[1]
	    img_url = urlparse.urljoin(url, img['src'])
	    print(img_url)
	    #file_name = img['src'].split('/')[-1] 
	    #urlretrieve(img_url, (path+dir_title+"/"+file_name)
	    c.executemany(
	      """INSERT INTO shoes (name, brand, photo, description, color, type, price)
	      VALUES (%s, %s, %s, %s, %s, %s, %s)""",
	      [
	      (shoe_name, shoe_brand, img_url ,shoe_desciption, shoe_color_shown,  shoe_type, shoe_price)
	      ] )
            db.commit()
        except:
            pass


db.close()




