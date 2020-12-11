# 2fa-demo
A demo for 2fa flow using speakeasy and qr code.

1. Clone project and go to project directory after extracting.
```
cd /2fa-demo
```
2. Install Node modules
```
npm i
```
3. Run the app
```
npm run dev
```
4. Open Postman app
5. Run the following routes
* Generates a key used to generate 2 Factor Authentication Code
```
http://localhost:8001/get-key
```

* Generate Qr Code
```
http://localhost:8001/generate-qr?account=john&asFile=true&issuer=Coins.ph
```
6. Open Authy or Google Authenticator and Scan the Qr Code
7. After adding the qr as account to Google Authenticator or Authy, enter the code generated to the following route
```
http://localhost:8001/verify
```
**Make sure to put the `code` in the body.**
* Example
<a href="https://drive.google.com/file/d/1ik_Yqk-ogV5_OF48co9Yr-DrM-4GQS4z/view?usp=sharing"><img src="https://drive.google.com/file/d/1ik_Yqk-ogV5_OF48co9Yr-DrM-4GQS4z/view?usp=sharing" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>
