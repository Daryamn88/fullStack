var http = require("http");
const { getAllEmployees, getEmployeeNames, getTotalSalary } = require('./Employee');
//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html'); 
            return res.end("<h1>Welcome to Lab Exercise 03</h1>");
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
        }

        if (req.url === '/employee') {
            res.end(JSON.stringify(getAllEmployees())); 
            return;
            //TODO - Display all details for employees in JSON format
        }

        if (req.url === '/employee/names') {
            res.end(JSON.stringify(getEmployeeNames())); 
            return;
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
        }

        if (req.url === '/employee/totalsalary') {
            res.end(JSON.stringify({ total_salary: getTotalSalary() }));
            return;
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})