# **The hackerSortingAlgo.ts script**


**Table of Contents**
<br>
:innocent: [How to Store Data](#how-to-store-data) <br>
:sweat_smile: [How to Run](#how-to-run) <br>
:upside_down_face: [How to Extend](#how-to-extend) <br>
:canned_food: [Beans](#enjoy-party-people) <br>

<br>
<hr>
<br>

## **How to Store Data**
> **N.B. Make sure all 3 input files are in the csv_inputs folder to produce a valid output**

<br>

| File Name          | Purpose                                                                                                                                                                                                                                                                                                                                               |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **answer.csv**     | This is an **answer key** for the questions. For each question,<br>there are CABIN_SIZE number of answers--each one relates to<br>a cabinType by index.<br><br>The first row in answer.csv is the header labelling for each<br>question. E.g question0, the first row after the header ("answer1"),<br>relates to the cabinType at index 0 ("cabin1") |
| **cabinTypes.csv** | cabinTypes is a **list of all the cabin names**, which may be updated<br>and extended. There is no header for the file.                                                                                                                                                                                                                               |
| **hackerData.csv** | hackerData is the raw data that we input to the script to get the final<br>cabin-sorted hackers. hackerData contains each hacker's unique ID, email,<br>and answers to each question asked. **Each row represents a new hacker's <br>information**.                                                                                                    |

<br>
<hr>
<br>

## **How to Run**

### Install global dependencies to be able to run the file

`
npm install -g ts-node typescript '@types/node'
`

<br>

### Run ts-node on the script
`
npx ts-node --experimental-specifier-resolution=node hackerSortingAlgo.ts
`

<br>
<hr>
<br>


## **How to Extend**
<br>

### When adding another cabinType
- add the cabin name to the **end** of the  cabinTypes.csv list
- add the new cabin's answers as a **new row** of the answer.csv file

<br>

### When adding another question
- add another header to answer.csv labeled **"question{nextIndex}"**
- For the new question, add answers for each cabinType

<br>
<hr>
<br>

## **Enjoy Party People!**
<br>
<img src="https://www.agmrc.org/media/cms/Dry_Beans_Photo_649EC753B32BE.jpg" style="height: 200px; width: auto;">