# NodeJS-based-application
(Client Server Communication – NodeJS) &amp; (Using 3rd party APIs – NodeJS)
<br>
part 1:NodeJS-based application that helps you explore different universities in the world. 
You can explore the following link for an API that provides universities’ data. 
https://github.com/Hipo/university-domains-list-api 
Put http://universities.hipolabs.com/search?country=Pakistan in the browser and hit 
enter. What you will see in the browser window would be a JSON response from the 
API. task is to receive such JSON objects in NodeJS the environment and process 
them programmatically.

create a NodeJS-based application that will allow a user to: 
1- Input a country name and see the list of the universities’ names and universities 
count in the country.

2- Input a university name and see the university’s web page address on the 
console. 

3- Design simple html forms for both above given parts (I & II). Your html code 
should be in .html files which should be sent to the client (browser) against route 
paths “/see_country_universities” and “/search_university” respectively

4- You can display raw JSON responses on the browser window for both 
parts. 

part 2:

NodeJS-based weather notification system (expected temperature of a day and 
possibility of rain). The system should send you an update after every 24 hours via SMS and 
email. The following steps should be carried out

1- Collect the weather information from any of the publicly available weather APIs. The 
following are two recommendations: 
http://www.7timer.info/doc.php?lang=en
https://m3o.com/weather

2- Make sure you get a JSON response against the API request. Process the data to extract 
information of your interest i.e., temperature and possibility of rain. 

3- Use some Email and SMS API to generate the alert. Following are two 
recommendations. 
https://rapidapi.com/sendgrid/api/sendgrid/
https://rapidapi.com/d7admin/api/d7sms/

4- 
