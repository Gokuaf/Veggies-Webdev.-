const fs = require('fs');
const http = require('http');
const url = require('url');

//  Blocking, synchronous way
//  const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//  console.log(textIn);
//  const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// non - blocking async //
// fs.readFile(`./txt/start.txt`, "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", "${data2}/n${data3}", "utf-8", (err) => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });
// console.log("will read file");

//////////////////////////////////
const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);

  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('this is the overview');
  } else if (pathName === '/product') {
    res.end('this is the product');
  } else if (pathName === '/api') {
    fs.readFile(`./dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.statusCode = 200;
      res.end('API');
    });
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'gelo-world',
    });
    res.end('this page couldnt to be found');
  }
  // res.end("hello from server");
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`listening for requests on8000`);
});
