# BDAAS
big data as a service -  project for cs 257

## Web Server Gateway Interface (WGSI)
* Setup to use the WGSI.
1. get postman to interact with the API
1. https://www.getpostman.com
2. install
3. Postman data can be imported using the Import button in the header toolbar. Import a collection located at WGSI/BDAAS.postman_collection.json
4. create a new environment variable and give it a name
    1. set the Key Value pair as follows: `backend  charlenet.life:3000`
    2. select the environment variable, then call one of the APIs


### using the API
1. first authenticate. add your username and password in the body. click send
    1. you will be given a password. this will automatically be stored in your environment variables
2. then you can call the query plants api.
    1. set the parameters as desired
