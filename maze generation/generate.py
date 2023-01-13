import random
import json
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

path = "src\components\graph\map.json"
# s = 25
s = 45
url = './maze generation/blue_maze2.jpg'
lin = 0

image = Image.open(url)
image = image.resize((s, s))
image = image.convert("L")
mat = np.array(image)
mat = mat.astype("int32")

mat = ( 
	np.abs(mat - mat.min()) - lin
	<
	np.abs(mat - mat.max()) + lin
).astype("int32")

map = mat.ravel().tolist()
with open(path, 'w') as f:
	json.dump(map, f)

plt.imshow(1 - mat)
plt.show()

