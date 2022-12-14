
print("Importing external assests.")
from ics import Calendar, Event
import requests
import json
from datetime import datetime, date
import time
import os.path
import socket
print("Importing complete")

# gettingSecrets
print("Loading Secrets")
secretsFile = json.load(open("secrets.json"))
calendarLink = secretsFile["calendar"]
print(calendarLink)

def getIP():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0)
        ipfile = open("PUBLIC_HTML/Data/IP.txt", "w")
        try:
            # doesn't even have to be reachable
            s.connect(('10.254.254.254', 1))
            IP = s.getsockname()[0]
        except Exception:
            IP = 'x.x.x.x'
        finally:
            s.close()
            ipfile.write(IP)
            ipfile.close
        return IP

def updateData():
    print("Updating Data")
#   Assigning Global Varibles
    url = calendarLink
    cal = Calendar(requests.get(url).text)
    events = list(sorted(cal.events))
    run  = 0
    data = {"ST":{},"S1":{},"S2":{},"MH":{},"B":{}, "dataUpdated":{}, "TBC":{}}
    file = open("PUBLIC_HTML/Data/data.json", "w")
    for i in events:
#       Assigning Run-Specific Variables
        event=events[run]
        print(event.name)
        print(event.begin)
        startTime = int(datetime.strptime(str(event.begin), '%Y-%m-%dT%H:%M:%S%z').timestamp())
        endTime = int(datetime.strptime(str(event.end), '%Y-%m-%dT%H:%M:%S%z').timestamp())
        timeNow = datetime.now().timestamp()
#       Does the event END in the past?
        if endTime > timeNow:
            print(str(event.name)+" is in the future.")
            #Create the Event Dictionary
            thisEvent ={
                "name": event.name,
                "description": event.description,
                "startTime": startTime,
                "endTime": endTime
                }
            print(event.location)
            #Catch incorect location
            if event.location not in ["ST", "S1","S2","MH","B"]:
                event.location = "TBC"
            print(thisEvent)
            #Add event to Data Dictionary
            data[str(event.location)][run] = thisEvent
            print(str(event.name)+" has been added to "+str(event.location))
        else:
            #Ignore Past Event
            print(str(event.name)+" is in the past.")
        run +=1 #Number of runs
    data["dataUpdated"]=int(timeNow) #Timestamp new data
    print(json.dumps(data, indent=4))
    file.write(json.dumps(data, indent=4))
    file.close

def testConnection(url="https://www.google.com", timeout=3):
    try:
        requests.head(url, timeout=timeout)
        return True
        print("Connection")
    except:
        print("No Connection")
    return False

getIP()

while True:
    testConnection()
    if testConnection() == True:
        updateData()
        update = 6
    else:
        print("NO CONNECTION")
        update = 10
    time.sleep(update)
    #break
