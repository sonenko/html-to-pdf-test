# DO NOT USE IT - it was created for demo purposes only

### How to run
```
npm run start:dev
```

#### Example wkhtmltopdf
```bash
echo '<h1>Hello</h1>' | wkhtmltopdf - ./tmp/2.pdf
wkhtmltopdf tmp/template.html ./tmp/2.pdf

wkhtmltopdf --enable-local-file-access contact.html ./tmp/2.pdf
```


#### Example curl commands
```bash
curl -XPOST http://localhost:3001/wkhtmltopdf -H "Content-Type: application/json" --output ./tmp/wkhtmltopdf.pdf

curl -XPOST http://localhost:3001/puppeteer -H "Content-Type: application/json" --output ./tmp/puppeteer.pdf

curl -XPOST http://localhost:3001/puppeteer-template -H "Content-Type: application/json" -d @./tmp/template-med.json --output ./tmp/puppeteer-from-json-med.pdf
```