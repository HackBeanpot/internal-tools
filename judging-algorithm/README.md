# **Judging Algorithm Usage:**
​
## **Steps to Success**
​
<br>
<hr>
<br>
​
## **1. Navigation**
​
First things first, we want to navigate to the judging-algorithm folder by doing
​
```
cd internal-tools/judging-algorithm
```
​
From here you may now `yarn install`to run the script.
​
<br><hr><br>
​
## **2. Upload the CSV File**
​
Next you need to upload your CSV file full of our lovely hackers by:
<br>
​
1. Download the Devpost hackers CSV
​
2. Delete all columns except for `Project Title` and `Will you Demo`
​
3. Rename these columns to `name` and `liveDemo`
​
4. Download and save as `hackers.csv` within `/judging-algorithm/data/csv_inputs` folder
​
<br><hr><br>
​
## **3. Sorting Script Time!**
​
Very crucial before we begin...
​
<hr style="border-top: dotted 1px;">
<h6 style="color: hotpink;">use node16</h6>
<h5 style="color: lightblue;">use node16</h5>
<h4 style="color: lightgreen;">use node16</h4>
<h3 style="color: yellow;">use node16</h3>
<h2 style="color: red;">use node16</h2>
<hr style="border-top: dotted 1px;">
<br>
​
### **How it works**
​
Moving on! Before you run the script you should probably know what it does
​
> This script splits our judges and hackers in to the inputted rooms using:
​
```
npx ts-node --experimental-specifier-resolution=node index.ts
```
​
This outputs our results in to JSON files `hackerResults.json` and `judgeResults.json` which the site will read and upload!
​
<br>
​
### **Error Handling**
​
If you get an `Error: Cannot find module 'typescript'` then fix it by:
​
```
npm i typescript
```
​
<br><hr><br>
​
## **Implementation Strategy**
​
In case you were curious:
​
1. Parse CSV files using `parser.ts`
​
2. Sort judges in to rooms in `formSchedule.ts` in order provided in CSV
​
3. Sort hackers in to rooms in `formSchedule.ts` in order provided in CSV
​
4. Produce judge and hacker output tables to render in `formJsonOutput.ts`
​
5. Convert tabular data in to JSON that the front-end can consume in `live-site` folder
​
## **Future Extensions**
​
Because we always think one step ahead ;)
​
1. Accomodate **remote judges** by adding a bias that sorts Zoom judges in to same room
​
2. Room capacities filter based on **(hackerCount + judgeCount)** not just judgeCount
   - Just filtering by judgeCount does not really ensure we automate capacity constraint
​
<br><hr><br>
​
## **That's All Folks!**