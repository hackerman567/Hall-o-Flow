# Hall-o-Flow | AI-Driven Academic Scheduler

Hall-o-Flow is an intelligent college timetable and study planning assistant designed for students to optimize their academic performance through automated scheduling and performance analytics.

## 🚀 Key Features

- **Automated Timetable Management**: Dynamic visualization of college schedules with day-wise filtering.
- **Intelligent Study Planner**: Generates optimized study blocks based on timetable gaps and subject difficulty.
- **Performance Analytics**: Real-time tracking of study completion rates and academic consistency.
- **EduBot Assistant**: Conversational AI for querying schedules and requesting study optimizations.
- **Dual Aesthetic Themes**: Choose between 'Cyber/Neon' and 'Royal/Obsidian' interfaces.

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **AI/NLP**: Integrated query processing logic for academic assistance.
- **Environment**: Docker & Docker Compose for seamless deployment.

## ⚙️ Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Docker)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   # Root
   npm install
   # Backend
   cd backend && npm install
   # Frontend
   cd ../frontend && npm install
   ```
3. Run the development environment:
   ```bash
   # Run both via root (if configured) or separately
   npm run dev
   ```

## 📝 Appendix

### Project Contributors
- **Ram Malhotra** (Lead Developer & AI Architect)
- **Sarah** (Frontend Engineer & UI/UX Designer)
- **Academic Mentors**: Dept. of Computer Science and Engineering, PSG College of Technology.

### Use Case Descriptions
- **3.2.1 User Registration**: Seamless onboarding with roll number and department validation.
- **3.2.2 Login**: Secure JWT-based authentication.
- **3.2.3 View Timetable**: Interactive grid with search functionality.
- **3.2.4 Chat with Bot**: Natural language processing for schedule queries.
- **3.2.5 Track Progress**: Visual indicators for low-completion subjects ("Needs Attention").

### System Architecture
The application follows a three-tier architecture:
1. **Presentation Layer**: React.js single-page application.
2. **Application Layer**: Node.js REST API.
3. **Data Layer**: MongoDB NoSQL database for flexible academic records.

---
*Developed for the Application Development Laboratory (23Z415).*
