import os
from datetime import datetime
import json
class FileUtility:


	@staticmethod
	def getImageFileList(directory = os.path.abspath(os.path.join('.' + os.sep, 'images'))):
		'''
		Gets list of JPEG images in given directory

		:param directory: PAth to directory
		:return: List of JPEG images in directory
		'''
		imagesFilePath = directory
		fileList = [(os.path.join(imagesFilePath, file), file) for file in os.listdir(imagesFilePath) if
		            os.path.isfile(os.path.join(imagesFilePath, file)) and (file.endswith(".jpg") or file.endswith(".jpeg"))]
		return fileList

	@staticmethod
	def getDateFromFilename(file):
		'''
		Extract date from filename

		:param file: Name of file
		:return: Date as a string
		'''
		INPUT_DATE_FORMAT = '%y%m%d%H%M%S'
		OUTPUT_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'

		outputDateString = None
		date = None

		fileName = file[1]
		dateSubstring = fileName[1:13]
		date = datetime.strptime(dateSubstring, INPUT_DATE_FORMAT)
		outputDateString = date.strftime(OUTPUT_DATE_FORMAT)

		return outputDateString

	@staticmethod
	def writeInfoToJSON(info, filename =os.path.join('.', 'imageInfo.json')):
		'''
		Writes given info to file as  a json object

		:param info: Dictionary with key-value pairs
		:param filename: Name of file to write info to
		:return:None
		'''

		infoJson = '\r\n'+json.dumps(info)
		with open(filename, 'a') as fileHandle:
			fileHandle.write(infoJson)

	@staticmethod
	def saveProcessedImage(image, file):
		'''
		Saves processed image under modified directory with given filename

		:param image: Image object
		:param file: Target filename
		:return:None
		'''
		filename = os.path.basename(file)
		filepath = os.path.join(os.path.abspath('.'), 'images', 'modified', filename)
		image.save(filepath)