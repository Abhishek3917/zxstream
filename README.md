# ZXStream

ZXStream is mainly built for learning how video streaming works, handling files, and connecting a React frontend with a Node.js backend.

##  Features

*  video stream from folder
*  Built-in browser video player
*  Lightweight and fast
*  Simple client-server architecture
*  No database required

##  Project Architecture

```
ZXStream
│
├── frontend
│   ├── React UI
│   ├── Video player
│   └── User interface
│
├── backend
│   ├── Express server
│   ├── Video routes
│   └── videos
│       └── Video files
```

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Video.js (custom video player)
### Backend

* Node.js
* Express.js

### Storage

* Local filesystem

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Abhishek3917/zxstream.git

cd zxstream
```

## Install dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Run the Project

Start backend server:

```bash
npm run dev
```

Start frontend:

```bash
npm run dev
```

Open the frontend URL in your browser.

##  Adding Videos

Place your video files inside the videos folder:

```
videos
│
├── movie1.mp4
├── tutorial.mp4
└── demo.mp4
```

ZXStream will serve these files through the application.

##  How It Works

```
Browser
   |
   v
React Frontend
   |
   v
Express API
   |
   v
Video Folder
   |
   v
Video Stream
```

The server streams the video file to the browser instead of sending the whole file at once.

## Security Notes

This project is intended for local usage.

For public deployment:

* Add authentication
* Use HTTPS
* Restrict video folder access

## Use Cases

* Personal video server
* Home network video player
* Learning HTTP streaming
* Learning React + Express integration
* Private media access

##  Contributing

Contributions are welcome.

1. Fork the repository

2. Create a branch:

```bash
git checkout -b feature-name
```

3. Commit changes:

```bash
git commit -m "Add feature"
```

4. Push:

```bash
git push origin feature-name
```

5. Open a Pull Request


## Notes

` While making this project, I learned how video streaming works internally.
Instead of using readFile() and loading the complete video into memory ,I used Node.js streams to send the file in chunks. This keeps memory usage low because the server does not load the whole video into RAM at once.`

` I also explored stream handling using pipeline() instead of directly using pipe(). pipeline() provides better error handling and manages the stream lifecycle more safely.`

---

Built as a learning project using React and Node.js..
