# **The hackerSortinAlgo.ts script**

## **Make sure input files are in the csv_inputs folder to produce a valid output**

csv_inputs should have 3 files:
- answer.csv
- cabinTypes.csv
- hackerData.csv

### **answer.csv**

This is an answer key for the questions. For each question, there are CABIN_SIZE number of answers, each one relates to a cabinType by index.
The first row in answer.csv is the header labeling each question. For question0, the first row after the header ("answer1") relates to the cabin type at index 0 ("cabin1"), the second row after the header relates to the cabin type at index 1, etc.

### **cabinTypes.csv**

cabinTypes is a list of all the cabin names, which may be updated and extended. There is no header for the file.

### **hackerData.csv**

hackerData is the raw data that we input to the script to get the final cabin sorted hackers. hackerData contains headers. The data contains the hacker's unique ID, email, and answers to each question asked. Each row represents a new hacker's information.


## **How to run**

### **Install global dependencies to be able to run the file**

`
npm install -g ts-node typescript '@types/node'
`
### **Run ts-node on the script**

ts-node ./lib/hackerSortingAlgo.ts


## ** How to extend **

When adding another cabinType:
- add the cabin name to the end cabinTypes.csv list
- add the new cabin's answers as a new row of the answer.csv file

When adding another question:
- add another header to answer.csv labeled "question{nextIndex}"
- For the new question, add answers for each cabinType