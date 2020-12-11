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
<a href="https://doc-0k-1s-docs.googleusercontent.com/docs/securesc/sej29hbqlrn5r6k54jk49ou68ae5k0et/nvm3505470rdpisupn0qo5smeaefnj23/1607672325000/09604395405528143287/09604395405528143287/1ik_Yqk-ogV5_OF48co9Yr-DrM-4GQS4z?e=view&authuser=0&nonce=r3iqffn8pemfc&user=09604395405528143287&hash=thkfkrkp0s2qo19c3qfjtgrgem9qash5"><img src="https://doc-0k-1s-docs.googleusercontent.com/docs/securesc/sej29hbqlrn5r6k54jk49ou68ae5k0et/nvm3505470rdpisupn0qo5smeaefnj23/1607672325000/09604395405528143287/09604395405528143287/1ik_Yqk-ogV5_OF48co9Yr-DrM-4GQS4z?e=view&authuser=0&nonce=r3iqffn8pemfc&user=09604395405528143287&hash=thkfkrkp0s2qo19c3qfjtgrgem9qash5" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>
