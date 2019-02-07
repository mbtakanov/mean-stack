##Prerequisites:

MongoDB - v4.0.5, issues database, issues collection

Node.js v10.13.0

Angular v7


## Usage

####Development 

In the `frontend` folder run the following commands:

```
npm install
npm run dev
```

This will start the frontend and will watch for changes.

In the `backend` folder run the following commands:

```
npm install
npm run dev
```

This will start the node server and will connect to MongoDB.


####Production

In the `frontend` folder run the following commands:

```
npm run build-prod
```

This will install node modules and will create `dist` folder which will be ready to be served.


In the `backend` folder run the following commands:

```
npm start
```

This will install node modules and will create `dist` folder which will be served by node.
