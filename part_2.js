import http from 'http';
import https from 'https';
import fs from 'fs';
import URL from 'node:url';
import colour from 'colour';
import chalk from 'chalk';
import promptSync from 'prompt-sync'; 
import t_secdular from 'node-schedule'
// setTimeout()
let logs = [];
const port = 8080;
const prompt = promptSync(); 
const input = prompt('Enter 1 for start the application :'.green.bold);
console.log(input.green);
    const handleRequest = (request, response) => {
        if(input === '1'){
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile('./input_weather.html', null, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    console.log("File not found!.. ");
                    logs.push("Error While reading a file "+error);
                } else {
                    response.write(data);
                    logs.push("Data is loaded as response to the server(HTML file rendered) ");
                    // console.log("Data is loaded as response to the server(HTML file rendered) ".green);
                }
                // response.end();
                
            });
        
        }           
        const req = request.url;
        const parseRurl = URL.parse(req,true);
        // // console.log(parseRurl);
        let cityname = parseRurl.query.field1;
        let statecode = parseRurl.query.field2;
        let countrycode = parseRurl.query.field3;
        console.log("User has inputed the text for searching " + cityname);
        console.log("User has inputed the text for searching " + statecode);
        console.log("User has inputed the text for searching " + countrycode);
        if(statecode == null){
            console.log("statecode empty")
        }
        let lat = 0;
        let lon = 0;
        let urli = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&appid=e89f899b93a81ed183d79d12713b661c`
        https.get(urli,(res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    let filedata = JSON.stringify(json);
                    lat =json[0].lat;
                    lon =json[0].lon;
                    console.log(lat); //ok
                    console.log(lon); //ok
                    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e89f899b93a81ed183d79d12713b661c&units=metric`;
                    // setInterval
                    setInterval(()=>{
                    https.get(url,(res) => {
                        let body = "";
                        res.on("data", (chunk) => {
                            body += chunk;
                        });
                        res.on("end", () => {
                            try {
                                let json = JSON.parse(body);
                                logs.push("Data is loaded from "+ url+" API..");
                                console.log("Data is loaded from "+ url+" API..".green);
                                let filedata = JSON.stringify(json)
                                console.log("Weather DESCRIPTION: "+chalk.green(json.weather[0].description));
                                console.log("Temparature : " +chalk.yellowBright(json.main.temp));
                                console.log("Max temparature : " +chalk.red(json.main.temp_min));
                                console.log("Minimum temprature : "+chalk.green(json.main.temp_max));
                                console.log("City Name : " +chalk.red(json.name));
                                console.log("Country code : " +chalk.green(json.sys.country));
                                // console.log(json);
                                logs.push("User has inputed the text for searching " +cityname);
                                // logs.push("User has inputed the text for searching " +statecode);
                                logs.push("User has inputed the text for searching " +countrycode);
                                //do something with JSON
                                    response.write("<h1><center>Weather forecast</center></h1>")
                                    response.write("<div class=form-style-10><p>Weather DESCRIPTION:</p> "+ JSON.stringify(json.weather[0].description)); //mathced records displayed
                                    response.write("<p>Temprature : </p>"+ JSON.stringify(json.main.temp)); //mathced records displayed
                                    response.write("<p>Max Temprature of the day :</p>"+ JSON.stringify(json.main.temp_min)); //mathced records displayed
                                    response.write("<p>Min temprature of the day :</p>"+ JSON.stringify(json.main.temp_max)+"</div>"); //mathced records displayed
                                    response.write('\n');    
                                    logs.push("Matched Rocords has displayed..." )
                                    logs.push("Matched Rocords has sent to browser..." )
                                    logs.push("Matched counts has sent to browser..." )
                                    // response.end();
                                    // console.log(count);
                                    // // console.log(json);
                                
                                    //TO DO 
            
                                //for logs only
                                    logs.forEach(element => {                       
                                    fs.appendFile("logs_part2.txt", element + "\r\n", (err) => {
                                        if (err) {
                                        console.log(err);
                                        }
                                    })
                                    console.log(element.green);
                                    });
                                
                            }catch(error) {
                                console.error(error.message);
                                logs.push("Error " +error.message);
                            };
                        });
            
                    }).on("error", (error) => {
                        console.error(error.message);
                    });},1000*60*60*24)
    
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
        console.log("Server is active Click on the link to use the APP " +"http://localhost:8080/".green);
    }
});