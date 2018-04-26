import os
import numpy as np
from PIL import Image
from FileUtility import FileUtility

class Analytics:

	def __init__(self):
		pass

	@staticmethod
	def processImages(imageFileList, showImages = False):
		'''
		Converts given Images to HSV, extracts green index and writes it to
		JSON & CSV files

		:param imageFileList: List of images to be processed
		:return: None
		'''

		greenIndex = 0.0
		date = ''
		# jsonInfoTable = []
		print "Extracting info from %i images ...." % len(imageFileList)
		for file in imageFileList:
			greenIndex = Analytics.__extractImageGreenIndex__(file[0], showImages)
			date = FileUtility.getDateFromFilename(file)
			infoRow = {"filename": file[1], "date": date, "greenIndex": greenIndex}
			# jsonInfoTable.append(infoRow)
			csvString = file[1]+','+date+','+str(greenIndex)
			print csvString
			FileUtility.writeInfoToJSON(infoRow)

	@staticmethod
	def __extractImageGreenIndex__(file, showImage = False):
		'''
		Extract Green Index from File

		:param file: Name of file
		:return: Green Index
		'''

		originalRGBImage = Image.open(file)
		if showImage:
			originalRGBImage.show()

		width, height = originalRGBImage.size[0], originalRGBImage.size[1]
		originalRGBImage = originalRGBImage.crop((0, 0, 1200, height))#Crop image to focus only on region with plants
		width, height = originalRGBImage.size[0], originalRGBImage.size[1]
		pixelCount = width * height
		hsvImage = originalRGBImage.convert('HSV')#Convert Image to HSV Color Space

		for row in range(width):
			for col in range(height):
				h,s,v = Analytics.getHSVOfPixel(hsvImage, row, col)
				r,g,b = Analytics.getOutputRGBOfPixel(h,s,v)
				originalRGBImage.putpixel((row,col), (r,g,b))

		if showImage:
			originalRGBImage.show()
		FileUtility.saveProcessedImage(originalRGBImage, file)
		greenIndex = Analytics.__getGreenIndex__(originalRGBImage)
		return greenIndex

	@staticmethod
	def getOutputRGBOfPixel(h,s,v):
		'''

		:param h:
		:param s:
		:param v:
		:return:
		'''
		r, g, b = 255, 255, 255
		if h < 54 or h > 90:
			r, g, b = 0, 0, 0
		if h < 84 and s > 3.5 and v > 70:
			r, g, b = 0, 0, 0
		return r,g,b

	@staticmethod
	def getHSVOfPixel(hsvImage, row, col):
		'''

		:param hsvImage:
		:return:
		'''
		pixelHSV = hsvImage.getpixel((row, col))
		h, s, v = pixelHSV

		s /= 255.0
		s *= 100.0
		s = round(s, 2)
		v /= 255.0
		v *= 100.0
		v = round(v, 2)

		return h,s,v


	@staticmethod
	def __getGreenIndex__(image):
		'''
		Returns green index of a processed image

		:param image: Image object
		:return: Green Index
		'''

		width, height = image.size
		width += 0.0
		height += 0.0
		histogram = np.array(image.histogram())

		greenIndex = histogram[256:512][255]
		print width,height, greenIndex
		greenIndex /= width*height
		greenIndex *= 100
		greenIndex = round(greenIndex, 4)

		return greenIndex

	@staticmethod
	def getGreenIndexFromProcessed(filelist):
		for file in fileList:
			image = Image.open(file[0])
			greenIndex = Analytics.__getGreenIndex__(image)
			date = FileUtility.getDateFromFilename(file)
			infoRow = {"filename": file[1], "date": date, "greenIndex": greenIndex}
			# jsonInfoTable.append(infoRow)
			csvString = file[1] + ',' + date + ',' + str(greenIndex)
			print csvString
			FileUtility.writeInfoToJSON(infoRow)



if __name__ == '__main__':

	filePath = raw_input("Enter directory with images to be processed: ")
	# filePath = os.path.join(os.path.abspath('.'), 'images')
	filePath = os.path.abspath(filePath)
	fileList = FileUtility.getImageFileList(filePath)
	Analytics.processImages(fileList, True)





