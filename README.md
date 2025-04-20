# 🧠 GuruVaid – Your AI-Powered Health Coach

**GuruVaid** is a smart AI-powered health assistant that monitors often-ignored yet crucial health metrics like step count, heart rate, sleep, and respiratory rate – helping users detect potential health risks early and take preventive actions.

> “Prevent before it becomes a problem – Stay mindful with GuruVaid!”

🕵️‍♂️ **GuruVaid** connects with your **smartwatch via Google Fit**, collects real-time data, and:
- 🔍 Analyzes key health signals using ML
- ⚠️ Predicts your personalized **health risk score**
- ✅ Recommends actionable **daily health tasks**
- 📊 Enables health tracking with a simple, friendly UI
- 💡 Coming soon: Reward system, AI chatbot, personalized insights

### 🛠 Tech Stack

🖥️ **Frontend**
- ⚛️ React.js (MERN stack)
- 🌐 Tailwind CSS – clean and responsive UI
- 🌍 Axios – to call backend APIs
- 🧠 Zustand – for state management

🔙 **Backend (Web App Backend)**
- 🟢 Node.js & Express.js – RESTful API server
- 🛢️ MongoDB – for storing user data, tasks, logs, etc.
- 🔐 Firebase Auth – for user authentication
- 🔐 JWT – for secure session management

🧠 **AI/ML Backend (Model API)**
- 🐍 Flask – Python-based ML backend server
- 🔬 ML Libraries:
  - scikit-learn
  - pandas, numpy
  - joblib for model saving/loading
- 📊 Data Source – Trained using Kaggle health datasets
- 🧪 Google Colab – model training & experimentation
- 🔌 Google Fit API – fetches smartwatch health metrics

### 🚀 How to Use

#### 1. Clone the Repository

```bash
git clone https://github.com/himanshu-sheetlani/GuruVaid
cd GuruVaid
```

#### 2. Run the Web Backend (Node + Express)

```bash
cd backend
npm install
npm run dev
```

#### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

#### 4. Run the AI/ML Flask Server

```bash
cd ml-backend
pip install -r requirements.txt
python app.py
```

### 🔐 API & Auth Routes

#### 🔸 Authentication Routes (Node + Firebase)

- `POST http://localhost:4000/api/v1/auth/signup` – Register new users with Firebase Authentication
- `GET http://localhost:4000/api/v1/auth/logout` – Log out and remove JWT token
- `GET http://localhost:4000/api/v1/auth/check-auth` – Check if the user is authenticated

#### 🔸 Health API Routes (Flask ML Server)

- `POST http://127.0.0.1:5000/predict-risk` – Accepts health metrics and returns risk level
- `POST http://127.0.0.1:5000/recommend-tasks` – Returns recommended tasks based on health data

#### 🔸 Node.js API Routes (Web Backend)

- `POST http://localhost:4000/api/v1/data/upload` – Accepts health inputs and stores them in MongoDB
- `GET http://localhost:4000/api/v1/data/smartwatch-user` – Retrieves the user's data from smart-watch
- `GET http://localhost:4000/api/v1/prediction/predict-mental-health` – Predict mental health score  based on user's data

### 💡 Future Enhancements
- 🎖️ Reward system for healthy habits
- 📈 Personal insights dashboard
- 🤖 AI chatbot for health queries
- 🧘‍♂️ Personalized workout and meditation guidance

---

