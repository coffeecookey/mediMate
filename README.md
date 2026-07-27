<div align="center">

<img src="frontend/src/assets/medimate3.png" alt="MediMate" width="380"/>

### Your friendly AI health companion. Check symptoms, find care nearby, and navigate your health journey with confidence.

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face_Inference-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co/docs/inference-providers/index)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

---

## Table of Contents

- [What is MediMate?](#what-is-medimate)
- [Features](#features)
- [Architecture](#architecture)
- [Pipelines and Flows](#pipelines-and-flows)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Roadmap](#roadmap)
- [Team](#team)

---

## What is MediMate?

**MediMate** is an AI-powered medical assistant that helps users triage symptoms, locate nearby care, and manage their health journey, all through a friendly chatbot interface fronted by **Miffy**, the MediMate jellyfish mascot.

<div align="center">
<table>
<tr>
<td align="center" width="50%"><img src="frontend/public/login.png" width="260" alt="Miffy the MediMate mascot"/></td>
<td align="center" width="50%"><img src="frontend/public/signup.png" width="260" alt="Miffy the MediMate mascot"/></td>
</tr>
</table>
</div>

---

## Features

#### AI-Powered Symptom Checker
- Built on **Hugging Face Inference Providers** (open-weight chat models, free tier) for natural, context-aware medical conversations
- Analyzes user-reported symptoms and always replies in a structured format: **Severity**, **Immediate Need for Attention**, **See a Doctor If**, **Next Steps**, **Possible Conditions**
- Helps users decide whether they can manage symptoms at home or need to see a professional

#### Nearby Hospitals and Pharmacies
- Interactive map powered by **OpenStreetMap and the Overpass API**
- Auto-detects the user's **approximate location** via GPS, falling back to **IP geolocation**
- Displays hospitals, clinics, and pharmacies within a **5 km radius**, with a legend and radius circle for clarity
- Falls back to prominent Delhi hospitals (AIIMS, Safdarjung, Apollo, Fortis) and pharmacies (Apollo Pharmacy, MedPlus) if location detection fails entirely

#### Emergency SOS
- One-click emergency trigger available from the navbar on every page
- Detects location via GPS, falling back to IP-based lookup
- Shows a confirmation popup with a direct Google Maps link to the detected location
- Auto-dismisses after a few seconds for a smooth, non-intrusive UX

#### Doctor Directory and Appointment Booking
- Browse doctors by specialty, hospital, experience, rating, and consultation fee
- Pick a date and an open time slot, then confirm, with live appointment summaries

#### Patient Dashboard
- At-a-glance view of upcoming appointments, prescriptions, and test reports
- One click into the chatbot for a quick symptom check

#### Authentication
- **JWT**-based sessions and **bcrypt**-hashed passwords, served from the same backend as the rest of the app
- Protected routes on the frontend redirect unauthenticated users to log in first

---

## Architecture

MediMate is composed of **one frontend** and **one unified backend**. The backend used to be three separate Express services (core API, auth, chatbot); they've since been merged into a single Express app mounted under `/api/admin`, `/api/auth`, and `/api/chat`, so there's only one server to run and deploy. The chatbot UI was likewise a standalone app and is now just a page (`/chatbot`) inside the main frontend.

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        FE["Frontend<br/>React 19 + Vite + Tailwind<br/>:5173"]
    end

    subgraph Backend["Backend - Express 5, :4000"]
        ADMIN["/api/admin<br/>Doctors / Admin"]
        AUTHR["/api/auth<br/>JWT + bcrypt"]
        CHATR["/api/chat<br/>Symptom Triage"]
    end

    subgraph Data["Data and External APIs"]
        MONGO[("MongoDB<br/>(users, doctors)")]
        CLOUD["Cloudinary<br/>(doctor images)"]
        HF["Hugging Face Inference<br/>(Qwen2.5-7B-Instruct)"]
        OSM["OpenStreetMap /<br/>Overpass API"]
        GEO["IP Geolocation<br/>(ipapi.co)"]
        GMAPS["Google Maps"]
    end

    FE -->|"POST /api/auth/login, /api/auth/signup"| AUTHR
    FE -->|"doctor and admin data"| ADMIN
    FE -->|"nearby hospitals/pharmacies"| OSM
    FE -->|"location fallback"| GEO
    FE -->|"SOS location link"| GMAPS
    FE -->|"POST /api/chat"| CHATR
    CHATR --> HF
    AUTHR --> MONGO
    ADMIN --> MONGO
    ADMIN --> CLOUD
```

| Service | Responsibility | Port | Data store |
|---|---|---|---|
| **Frontend** (`frontend/`) | Home, doctors, booking, dashboard, profile, SOS, map, chatbot | `5173` | none |
| **Backend** (`backend/`) | Doctor/admin data, auth (signup/login), chatbot proxy to Hugging Face | `4000` | MongoDB + Cloudinary |

---

## Pipelines and Flows

### Symptom Checker (Chatbot) Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend (/chatbot)
    participant API as Backend (:4000)
    participant G as Hugging Face Inference API

    U->>FE: Describe symptoms
    FE->>API: POST /api/chat { symptoms }
    API->>G: chatCompletion(triage prompt)
    G-->>API: Structured triage text
    API-->>FE: { reply }
    FE-->>U: Severity, Next Steps, Possible Conditions, Disclaimer
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend (:4000)
    participant DB as MongoDB

    U->>FE: Submit signup / login form
    FE->>API: POST /api/auth/signup or /api/auth/login
    API->>DB: Find user, hash (bcrypt) / compare password
    DB-->>API: User document
    API-->>FE: JWT (24h expiry)
    FE-->>U: Store token in localStorage, unlock protected routes
```

### Healthcare Locator and Emergency SOS Flow

```mermaid
flowchart LR
    A[Page loads] --> B{Browser Geolocation<br/>available and granted?}
    B -->|Yes| C["GPS coordinates"]
    B -->|No / denied| D["IP Geolocation<br/>ipapi.co"]
    D -->|fails too| E["Fallback: Delhi hospitals<br/>and pharmacies list"]
    C --> F["Query Overpass API<br/>(hospitals/clinics/pharmacies, 5km)"]
    D --> F
    F --> G["Render Leaflet map<br/>plus legend and radius circle"]

    H["SOS button clicked"] --> B
    C --> I["Generate Google Maps link"]
    D --> I
    I --> J["Show confirmation popup<br/>(auto-hides after 8s)"]
```

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router 7, Framer Motion, React-Leaflet, Axios, React Toastify, lucide-react |
| **Backend** | Node.js, Express 5, Mongoose, Multer, Cloudinary, JWT, bcrypt, Joi, `@huggingface/inference` (Hugging Face) |
| **Database** | MongoDB |
| **Maps and Geo** | Leaflet, OpenStreetMap, Overpass API, ipapi.co |

---

## Project Structure

```
untitled folder/
├── frontend/                 # Patient-facing app (React + Vite + Tailwind)
│   ├── src/pages/             # Home, Doctors, Dashboard, Book Appointment, Chatbot ("Miffy"), ...
│   ├── src/authPage/          # Login, Signup
│   └── src/components/        # NavBar, Header, Footer, FloatingShape
│
├── backend/                  # Single unified API (doctors/admin, auth, chatbot)
│   ├── routes/                 # doctorRoute, authRouter, chatRoute
│   ├── controllers/            # adminController, authController, chatController
│   ├── models/                 # doctorModel, userModel, User (auth)
│   ├── middlewares/            # multer, authValidation, Auth (JWT)
│   └── config/                 # MongoDB and Cloudinary config
│
└── MediMate_Team Zenith.pdf   # Project pitch deck
```

---

## Getting Started

Install dependencies for each project:

```bash
# Backend (doctors/admin, auth, chatbot)
cd backend && npm install

# Frontend
cd frontend && npm install
```

---

## Environment Variables

Copy [`backend/env.example`](backend/env.example) to `backend/.env` and fill in real values (all services now share this one file):

```env
PORT=4000
MONGODB_URI=your_mongoDB_URI
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
HF_TOKEN=your_huggingface_access_token_here
HF_MODEL=Qwen/Qwen2.5-7B-Instruct
```

---

## Running the Project

| Service | Command | URL |
|---|---|---|
| Backend | `cd backend && npm start` | `http://localhost:4000` |
| Frontend | `cd frontend && npm run dev` | printed by Vite |

Open the frontend's printed local URL in your browser to use MediMate end-to-end.

---

## Roadmap

- [ ] Wire the Doctors/Booking pages to live data from the backend (currently mock data)
- [ ] Flesh out the admin dashboard (`adminController`/`adminRoute`) beyond `add-doctor`
- [ ] Persist appointments, prescriptions, and test reports to MongoDB

---

## Team

Built for **Hack Imperium** by **Team Zenith**. See [`MediMate_Team Zenith.pdf`](MediMate_Team%20Zenith.pdf) for the full pitch.
