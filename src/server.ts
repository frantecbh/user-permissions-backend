import express from 'express'

const app = express()

app.use(express.json());
//app.use(router);

app.listen(3333, () => {
    console.log("Server-on port 3333")
})