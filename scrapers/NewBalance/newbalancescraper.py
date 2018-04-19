import requests
from bs4 import BeautifulSoup
import re
import csv
import MySQLdb


def main():
	# url
	#'http://www.newbalance.com/men-1/?prefn1=productClass&prefv1=Shoes'
	#http://www.newbalance.com/men/shoes/all-shoes/running/?prefn1=color&prefn2=productClass&prefv1=Black

	shoe_cats = {
		'running': 'http://www.newbalance.com/men/shoes/all-shoes/running/?prefn1=color&prefn2=productClass&prefv1=',
		'lifestyle': 'http://www.newbalance.com/men/shoes/all-shoes/lifestyle/?prefn1=color&prefn2=productClass&prefv1=',
		'training': 'http://www.newbalance.com/men/shoes/all-shoes/training/?prefn1=color&prefn2=productClass&prefv1=',
		'walking': 'http://www.newbalance.com/men/shoes/all-shoes/tennis/?prefn1=color&prefn2=productClass&prefv1='
	}

	colors = ['Black', 'White', 'Red', 'Blue', 'Grey', 'Silver', 'Navy']

	c, db = connectDB()
	for cat, shoe_page in shoe_cats.items():
		for color in colors:
			url = shoe_page + color
			page = requests.get(url)
			soup = BeautifulSoup(page.content, 'html.parser')
			filename = 'newbalance_' + cat + '_' + color + '.csv'

			for shoe in soup.find_all('li', class_='tile'):
				shoe_info = get_shoe_data(shoe, cat, color)
				if not shoe_info:
					continue
				c.execute(
	      		"""INSERT INTO shoes (name, brand, photo, description, color, type, price)
	      		VALUES (%s, %s, %s, %s, %s, %s, %s)""",
	      		(shoe_info))
	      		db.commit()

	      		'''
				# open a csv file with append, so old data will not be erased
				with open(filename, 'a') as csv_file:
					writer = csv.writer(csv_file)
					writer.writerow([shoe_info[i] for i in range(len(shoe_info))])
				'''
	c.close()

def get_shoe_data(shoe, cat, color):
	brand = 'New Balance'
	#colors = get_colors(shoe)
	name = get_name(shoe)
	price = get_price(shoe)

	link = shoe.find('div', class_='product')
	link = link.get('data-quickview-url')
	if not link:
		return
	page = requests.get(link)
	soup = BeautifulSoup(page.content, 'html.parser')

	description = get_product_description(soup)
	photo = get_photo_url(soup)
	return (name, brand, photo, description, color, cat, price)

def get_colors(shoe):
	colors = shoe['data-product-hit']
	colors = colors.split(':')
	colors = colors[1].split(',')
	colors = [re.sub(r'\W+', '', color) for color in colors]
	return colors

def get_name(shoe):
	name = shoe.find('p', class_='product-name')
	name = name.find('a')
	name = name.get('title')
	return name

def get_price(shoe):
	txt = shoe.find('div', class_='product-pricing')
	price = txt.get_text().split()[0]
	return price[1:] # get rid of dollar sign

def get_product_description(soup):
	details = soup.find('section', class_='product-details')
	description = details.find('div', class_='longdescription')
	description = description.get_text()
	return description

def get_photo_url(soup):
	img = soup.find('div', class_='gallery-placeholder')
	url = img.find('img').get('src')
	return url

def connectDB():
	db = MySQLdb.connect(host='shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com', user='mcheung3',passwd='shoemania', db = 'shoemania')
	c = db.cursor()
	return c, db

if __name__ == '__main__':
	main()