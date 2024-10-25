const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
    const nameOfUrl = url.parse(req.url, true);
    const objectQuery = nameOfUrl.query;
    const pathName = nameOfUrl.pathname;
    //console.log(req.url);
    //console.log(nameOfUrl);
    //console.log(objectQuery.filename);

    // user create a file
    if (pathName.slice(0,7) === '/create') {
        let fileName = objectQuery.filename || 'data.txt';
        let isFileExists = fs.existsSync(fileName);
        // can not create the file with the same name
        if(isFileExists){
            res.write(`${fileName} exists! Please try to create another name`);
            res.end();
        }
        else{
            // writeFile/appenFile both can work, since there is empty data
            fs.appendFile(`./${fileName}`, '', (err) => {
                if (err) {
                    res.write(`${fileName} cannot created`);
                    res.end();
                };
                //res.write(objectQuery);
                res.write(`${fileName} created successfully`);
                res.end();
            });
        }
    }
    // user append data to a file
    else if (pathName.slice(0,6) === '/write') {
        let fileName = objectQuery.filename || 'data.txt';
        let content = objectQuery.content;
        let isFileExists = fs.existsSync(fileName);
        // can not append data to the file that is not exist
        if(!isFileExists){
            res.write(`${fileName} does not exist! Please try to enter the corret name`);
            res.end();
        }
        else{
            fs.appendFile(`./${fileName}`, content, (err) => {
                if (err) {
                    res.write(`${fileName} cannot written`);
                    res.end();
                };
                //console.log(objectQuery);
                res.write(`${fileName} appended data [ ${content} ] successfully`);
                res.end();
            });
        }
       
    }
    // user read a file
    else if (pathName.slice(0,5)=== '/read') {
        let fileName = objectQuery.filename || 'data.txt';
        let isFileExists = fs.existsSync(fileName);
        // can not read a file that is not exist
        if(!isFileExists){
            res.write(`${fileName} does not exist! Please try to enter the corret name`);
            res.end();
        }
        else{
            fs.readFile(`./${fileName}`, (err, data) => {
                if (err) {
                    res.write(`${fileName} cannot read`);
                    res.end();
                };
                res.write(`The data of ${fileName} is: ${data}`);
                res.end();
            });
        }
       
    }
    // user delete a file
    else if (pathName.slice(0,7) === '/delete') {
        let fileName = objectQuery.filename || 'data.txt';
        let isFileExists = fs.existsSync(fileName);
        // can not delete a file that is not exist
        if(!isFileExists){
            res.write(`${fileName} does not exist! Please try to enter the corret name`);
            res.end();
        }
        else{
            fs.unlink(`./${fileName}`, (err) => {
                if (err) {
                    res.write(`${fileName} cannot deleted`);
                    res.end();
                };
                res.write(`${fileName} deleted successfully`);
                res.end();
            });
        }
        
    }
    // user enter a non-specified URL
    else{
        res.write('Please try again, Enter the corret URL');
        res.end();
    }
}).listen(5000);
