import numpy as np
import MySQLdb
import requests
import urllib
import cv2
import sys
import time
import random as rnd
import json

# Import datasets, classifiers and performance metrics
from sklearn import datasets, svm, metrics

user = sys.argv[1]
db = MySQLdb.connect(host='shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com', user='mcheung3',passwd='shoemania', db='shoemania')
c = db.cursor()

##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##
## Preprocess data
##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##

# get all shoes rated by users
c.execute("""
	SELECT shoes.*, ratedlists.liked FROM shoes, users, ratedlists 
	WHERE users.id = %s AND users.id = ratedlists.user_id AND shoes.id = ratedlists.shoe_id
	""", (user,))
pred = c.fetchall()

# get all shoes not rated by users
c.execute("""
	SELECT shoes.* FROM shoes, users, ratedlists 
	WHERE users.id = %s AND users.id NOT IN (SELECT ratedlists.shoe_id FROM ratedlists WHERE users.id = ratedlists.user_id)
	""", (user,))
notrated = c.fetchall()

db.commit()
db.close()

labels = np.array([i[-1] for i in pred])
shoe_data = np.array([i[:-1] for i in pred])
test_data = np.array(pred)

##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##
## Functions
##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##

def get_img_as_arr(shoe_data):
	data = np.zeros((len(shoe_data), 200, 200, 3))
	for i in range(len(shoe_data)):
		url = shoe_data[i][2]
		url_response = urllib.urlopen(url)
		img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
		img = cv2.imdecode(img_array, -1)
		data[i] = cv2.resize(img, (200, 200), interpolation=cv2.INTER_LINEAR)
	return data

def create_json(shoe):
	data = {
	'id' : shoe[0],
	'brand' : shoe[1],
	'photo' : shoe[2],
	'description' : shoe[3],
	'color' : shoe[4],
	'name' : shoe[5],
	'type' : shoe[6],
	'price' : shoe[7]
	}
	json_data = json.dumps(data)
	return json_data

##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##
## Classify and write to JSON
##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##

#start = time.time()
images = get_img_as_arr(shoe_data)
test_images = get_img_as_arr(test_data)
#end = time.time()
#print(end - start)

n_samples = len(images)
data = images.reshape((n_samples, -1))
test_data = test_images.reshape((n_samples, -1))

classifier = svm.SVC(gamma=0.001)

classifier.fit(data, labels)

predicted = classifier.predict(test_data)
print predicted
pos = np.where(predicted == 1)[0]
if len(pos) == 0:
	recommended = notrated[rnd.randint(0, len(notrated)-1)]
else:
	idx = rnd.choice(pos)
	recommended = notrated[idx]

json_data = create_json(recommended)
print json_data
#sys.stdout.flush()
