import http from 'http';
import https from 'https';
import fs from 'fs';
import URL from 'node:url';
import colour from 'colour';
import promptSync from 'prompt-sync'; 
import chalk from 'chalk';
let logs = [];
const port = 8000;
const prompt = promptSync(); 
const input = prompt(chalk.yellow.bold('enter 1 by country and 2 by university:'));
console.log(input);
    const handleRequest = (request, response) => {
        if(input === '1'){
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile('./see_country_universities.html', null, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    console.log("File not found!.. ");
                    
                } else {
                    response.write(data);
                    logs.push(data);
                } 
                
            });
        }
        if(input === '2'){
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile('./see_university.html', null, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    console.log("File not found!.. ");
                    logs.push(error);
                } else {
                    response.write(data);


                }
            });
        }
        const url = "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";      
        https.get(url,(res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    logs.push( url);
                    console.log(url);
    
                    const record = fs.readFile("A.txt", "utf8", (err,data)=>{
                    if(err){
                        console.log("Somthing is bad "+err);
                    }
                  });
                    const req = request.url;
                    const parseRurl = URL.parse(req,true);
                    let userinput = parseRurl.query.field1;
                    console.log(userinput);
                    logs.push(userinput)
                    let count = 0;
                    for(let i = 0; i<json.length; i++){
                      if(json[i].country === userinput){
                        count++;
                        response.write("<div class=form-style-10>"+ JSON.stringify(json[i].name)+"</div>"); //mathced records displayed
                        response.write('\n'); 
                        logs.push(json[i].name);
                        console.log(json[i].name)
                      }
                      if(json[i].name === userinput){
                        count++;
                        console.log(json[i].web_pages);
                        response.write("<div class=form-style-10>"+ "<h1>Web Site address</h1>" +JSON.stringify(json[i].web_pages)+"</div>"); //mathced records displayed
                        response.write('\n'); 
                      }
                    }
                    response.end();
                    console.log(count);
                    // console.log(json);
                    
                    logs.forEach(element => {                       
                    fs.writeFile("logs.txt", element + "\r\n", (err) => {
                        if (err) {
                        console.log(err);
                        }
                    })
                    console.log(element);
                    logs.push(element);
                    });

                }catch(error) {
                    console.error(error.message);
                    logs.push("Error " +error.message);
                };
            });

        }).on("error", (error) => {
            console.error(error.message);
        });
           
    };
http.createServer(handleRequest).listen(port,(error) => {
    if(error){
        console.log("Something went wronge..");
    }else{
        console.log("listening port 8000");
    }
});