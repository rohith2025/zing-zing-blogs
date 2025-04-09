const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET 


app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`DB Connected`))
.catch((e) => console.log(`DB Connection Failed`, e));




const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: String
});
userSchema.plugin(AutoIncrement, { inc_field: 'userid', start_seq: 1000 });
const User = mongoose.model('Users', userSchema);







const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  userid: Number,
  date: String,
  content: String,
  tag: String
});
blogSchema.plugin(AutoIncrement, { inc_field: 'blogid', start_seq: 1 });
const Blog = mongoose.model('Blogs', blogSchema);






function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}







app.get('/', (req, res) => {
  res.send("<h1>This is the Home Page</h1>");
});




app.post('/api/v1/user/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.post('/api/v1/user/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userid: user.userid, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Signin successful',
      token,
      userID: user.userid,
      userName: user.username
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






app.post('/api/v1/blog/publish', verifyToken, async (req, res) => {
  const { title, content, tag } = req.body;

  const blog = new Blog({
    title,
    content,
    tag,
    author: req.user.username,
    userid: req.user.userid,
    date: new Date().toDateString()
  });

  await blog.save();
  res.status(201).json({ message: 'Blog published', blog });
});






app.get('/api/v1/blog/all', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
});





app.get('/api/v1/blog/user/:userid', async (req, res) => {
  try {
    const blogs = await Blog.find({ userid: req.params.userid });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user blogs', error });
  }
});






app.get('/api/v1/blog/:blogid', async (req, res) => {
  try {
    const blog = await Blog.findOne({ blogid: req.params.blogid });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});







app.put('/api/v1/blog/update/:blogid', verifyToken, async (req, res) => {
  const blog = await Blog.findOne({ blogid: req.params.blogid });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.userid !== req.user.userid)
    return res.status(403).json({ message: 'Unauthorized' });

  const { title, content, tag } = req.body;
  if (title) blog.title = title;
  if (content) blog.content = content;
  if (tag) blog.tag = tag;

  await blog.save();
  res.status(200).json({ message: 'Blog updated', blog });
});








app.delete('/api/v1/blog/delete/:blogid', verifyToken, async (req, res) => {
  const blog = await Blog.findOne({ blogid: req.params.blogid });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.userid !== req.user.userid)
    return res.status(403).json({ message: 'Unauthorized' });

  await Blog.deleteOne({ blogid: req.params.blogid });
  res.status(200).json({ message: 'Blog deleted successfully' });
});








app.post('/api/v1/location', (req, res) => {
  const { city, state } = req.body;
  console.log(city, state);
  res.send("Location submitted successfully");
});







app.listen(PORT || 3000, () => {
  console.log(`Server running at ${PORT}`);
});
