const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./module/replaceTemplate');

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  const { query, pathname} = (url.parse(req.url, true));
  
  //////overview////////
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    /////////product//////////
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //////////Api////////////
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'Helo-world',
    });
    res.end('<h1>this page couldnt to be found</h1>');
  }
  // res.end("hello from server");
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`listening for requests on port 8000`);
});
