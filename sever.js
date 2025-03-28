const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

new Date()

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://thdxogk2:ksh7803@cluster0.vdjyayk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
}).catch((err)=>{
  console.log(err)
})

app.listen(8080, () => { 
  console.log('http://localhost:8080 에서 서버 실행 중')
})

app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})

app.get('/news', (요청, 응답) => {
  db.collection('post').insertOne({title : '어쩌구'})
  // 응답.send('오늘 비옴')
})

app.get('/shop', (요청, 응답) => {
  응답.send('쇼핑 페이지 입니다')
})

app.get('/about', (요청, 응답) => {
  응답.sendFile(__dirname + '/about.html')
})

app.get('/list', async (요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs',{posts : result})
})

app.get('/time', (요청, 응답) => {
  응답.render('time.ejs',{date : new Date()})
})

app.get('/write', async (요청, 응답) => {
  응답.render('write.ejs')
})

app.post('/add', async (요청, 응답) => {
  console.log(요청.body)
  await db.collection('post').insertOne({title : 요청.body.title , content : 요청.body.content})
  응답.redirect('/list')
})
