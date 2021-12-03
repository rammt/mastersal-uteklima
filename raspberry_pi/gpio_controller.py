import RPi.GPIO as GPIO
import time

GPIO.output(1, GPIO.HIGH)
time.sleep(2)
GPIO.output(1, GPIO.LOW)