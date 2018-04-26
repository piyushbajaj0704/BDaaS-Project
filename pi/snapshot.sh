#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H%M")
fswebcam -r 1280x960 --no-banner /home/pi/Pictures/timelapse/garden_$DATE.jpg
