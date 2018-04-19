import matplotlib.pyplot as plt
import numpy as np
import MySQLdb
import requests
import urllib
import cv2
import sys
import time

# Import datasets, classifiers and performance metrics
from sklearn import datasets, svm, metrics

user = sys.argv[1]
db = MySQLdb.connect(host='shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com', user='mcheung3',passwd='shoemania', db='shoemania')
c = db.cursor()

# get all shoes rated by users
c.execute("""
	SELECT shoes.*, ratedlists.liked FROM shoes, users, ratedlists 
	WHERE users.name = %s AND users.id = ratedlists.user_id AND shoes.id = ratedlists.shoe_id
	""", (user,))
#c.execute("""SELECT photo FROM shoes""", (shoe_info))

pred = c.fetchall()
db.commit()
db.close()

labels = np.array([i[-1] for i in pred])
shoe_data = np.array([i[:-1] for i in pred])

def get_img_as_arr(shoe_data):
	data = np.zeros((len(shoe_data), 200, 200, 3))
	for i in range(len(shoe_data)):
		url = shoe_data[i][2]
		url_response = urllib.urlopen(url)
		img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
		img = cv2.imdecode(img_array, -1)
		resized_image = np.zeros((200, 200, 3))
		for i in range(3):
			resized_image[:,:,i] = cv2.resize(img[:,:,i], (200, 200))
		data[i] = resized_image
	return data

start = time.time()
images = get_img_as_arr(shoe_data)
end = time.time()
print end - start
print images.shape

# # The digits dataset
# digits = datasets.load_digits()

# # The data that we are interested in is made of 8x8 images of digits, let's
# # have a look at the first 4 images, stored in the `images` attribute of the
# # dataset.  If we were working from image files, we could load them using
# # matplotlib.pyplot.imread.  Note that each image must have the same size. For these
# # images, we know which digit they represent: it is given in the 'target' of
# # the dataset.
# images_and_labels = list(zip(digits.images, digits.target))
# for index, (image, label) in enumerate(images_and_labels[:4]):
#     plt.subplot(2, 4, index + 1)
#     plt.axis('off')
#     plt.imshow(image, cmap=plt.cm.gray_r, interpolation='nearest')
#     plt.title('Training: %i' % label)

# # To apply a classifier on this data, we need to flatten the image, to
# # turn the data in a (samples, feature) matrix:
# n_samples = len(digits.images)
# data = digits.images.reshape((n_samples, -1))

# # Create a classifier: a support vector classifier
# classifier = svm.SVC(gamma=0.001)

# # We learn the digits on the first half of the digits
# classifier.fit(data[:n_samples // 2], digits.target[:n_samples // 2])

# # Now predict the value of the digit on the second half:
# expected = digits.target[n_samples // 2:]
# predicted = classifier.predict(data[n_samples // 2:])

# print("Classification report for classifier %s:\n%s\n"
#       % (classifier, metrics.classification_report(expected, predicted)))
# print("Confusion matrix:\n%s" % metrics.confusion_matrix(expected, predicted))

# images_and_predictions = list(zip(digits.images[n_samples // 2:], predicted))
# for index, (image, prediction) in enumerate(images_and_predictions[:4]):
#     plt.subplot(2, 4, index + 5)
#     plt.axis('off')
#     plt.imshow(image, cmap=plt.cm.gray_r, interpolation='nearest')
#     plt.title('Prediction: %i' % prediction)

# plt.show()
