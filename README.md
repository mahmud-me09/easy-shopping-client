# Easy Shopping Website

### This website allows users to search and view desired products.

### Users can enjoy the following features:

- optimized searching and sorting of products
- Categorized cataloging.
- Authentication system of firebase
- Hosting of image through API

### The website is live at: 
    https://easy-shopping-website-1b109.web.app

### If you want to set up the website locally. The following steps should be followed:

- clone from Github using the following command:
    git clone https://github.com/mahmud-me09/easy-shopping-client.git
- create an app in the firebase authentication and copy the API of imgbb. 
- create a .env file
<code>
    VITE_Firebase_apiKey=Your firebase_api_key
    VITE_Firebase_authDomain=Your_firebase_authDomain
    VITE_Firebase_projectId=Your_firebase_authDomain
    VITE_Firebase_storageBucket=Your_firebase_authDomain
    VITE_Firebase_messagingSenderId=Your_firebase_authDomain
    VITE_Firebase_appId=Your_firebase_authDomain
    VITE_IMGBB_API=Your_imgbb_API
</code>

- run the following command:
    <code>npm i</code>

- run the app locally using the following command:
    <code>npm run dev</code>
