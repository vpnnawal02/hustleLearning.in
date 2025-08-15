import os
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, Request, Form, Path
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, ValidationError

import smtplib
from email.mime.text import MIMEText

# =========================
# Email Configuration
# =========================
# For production, store these in a .env file and load with dotenv.
EMAIL_ADDRESS = "vn.nawal02@gmail.com"
EMAIL_PASSWORD = "ezxgtndjewflinya"  # Prefer a Gmail App Password
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
ADMIN_EMAIL = "vn.nawal02@gmail.com"  # recipient for notifications

# =========================
# FastAPI App and Templates
# =========================
app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates directory
templates = Jinja2Templates(directory="templates")

# =========================
# Data Models
# =========================
class RegistrationForm(BaseModel):
    name: str
    email: EmailStr
    phone_number: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

# =========================
# Course Catalog (replace with DB later)
# =========================
COURSES = {
    "mathematics-mastery-class-6-10": {
        "title": "Mathematics Mastery (Class 6–10)",
        "short": "Learn maths the smart way – from basics to advanced.",
        "price": 0,
        "cover": "assets/images/courses-01.jpg",
        "duration": "10 weeks",
        "language": "English",
        "level": "Beginner–Intermediate",
        "highlights": [
            "Smart problem-solving tricks",
            "Weekly quizzes",
            "Live doubt sessions",
            "Downloadable notes"
        ],
        "syllabus": [
            "Number systems",
            "Algebra basics",
            "Geometry essentials",
            "Data handling"
        ],
        "instructor": {
            "name": "R. Mehta",
            "avatar": "assets/images/author-01.png",
            "bio": "Math educator with 9+ years’ experience."
        },
        "faq": [
            {"q": "Is it suitable for Class 6–10?", "a": "Yes, aligned to grades 6–10."}
        ],
    },
    "science-success-program-class-6-10": {
        "title": "Science Success Program (Class 6–10)",
        "short": "Interactive lessons in Physics, Chemistry, and Biology.",
        "price": 0,
        "cover": "assets/images/courses-02.jpg",
        "duration": "12 weeks",
        "language": "English",
        "level": "Beginner–Intermediate",
        "highlights": [
            "Concept-first approach",
            "Hands-on examples",
            "Weekly tests",
            "Notes & assignments"
        ],
        "syllabus": [
            "Physics fundamentals",
            "Chemistry basics",
            "Biology basics",
            "Practice tests"
        ],
        "instructor": {
            "name": "S. Rao",
            "avatar": "assets/images/author-02.png",
            "bio": "STEM mentor and content specialist."
        },
        "faq": [
            {"q": "Are recordings available?", "a": "Yes, recordings are provided."}
        ],
    },
    "board-exam-booster-class-10-12": {
        "title": "Board Exam Booster (Class 10 & 12)",
        "short": "Exam-focused classes with past papers and strategies.",
        "price": 0,
        "cover": "assets/images/courses-03.jpg",
        "duration": "8 weeks",
        "language": "English/Hinglish",
        "level": "Intermediate",
        "highlights": [
            "Past paper practice",
            "Scoring strategies",
            "Doubt clearing",
            "Progress analytics"
        ],
        "syllabus": [
            "Important topics",
            "Past papers",
            "Time management",
            "Mock tests"
        ],
        "instructor": {
            "name": "A. Gupta",
            "avatar": "assets/images/author-03.png",
            "bio": "Board exam coach with 11+ years of results."
        },
        "faq": [{"q": "Certificate?", "a": "Yes, on completion."}],
    },
    "english-grammar-writing": {
        "title": "English Grammar & Writing Skills for Students",
        "short": "Build strong grammar, vocabulary, and writing skills.",
        "price": 0,
        "cover": "assets/images/courses-04.jpg",
        "duration": "6 weeks",
        "language": "English",
        "level": "Beginner",
        "highlights": [
            "Grammar drills",
            "Writing practice",
            "Vocabulary builder",
            "Feedback"
        ],
        "syllabus": [
            "Grammar basics",
            "Essay and letter writing",
            "Comprehension",
            "Revision"
        ],
        "instructor": {
            "name": "M. D’Souza",
            "avatar": "assets/images/author-04.png",
            "bio": "Language coach and editor."
        },
        "faq": [{"q": "Who should take this?", "a": "Middle and high school students."}],
    },
    "jee-foundation-class-8-10": {
        "title": "JEE Foundation (Class 8–10)",
        "short": "Early start for IIT-JEE with focused lessons.",
        "price": 0,
        "cover": "assets/images/courses-05.jpg",
        "duration": "16 weeks",
        "language": "English",
        "level": "Beginner",
        "highlights": [
            "Concept building",
            "Problem-solving",
            "Weekly tests",
            "Mentor support"
        ],
        "syllabus": [
            "Algebra & geometry",
            "Chemistry basics",
            "Mechanics basics",
            "Tests"
        ],
        "instructor": {
            "name": "K. Singh",
            "avatar": "assets/images/author-05.png",
            "bio": "IIT alumnus and mentor."
        },
        "faq": [{"q": "Are live classes included?", "a": "Yes, with recordings."}],
    },
    "neet-foundation-class-8-10": {
        "title": "NEET Foundation (Class 8–10)",
        "short": "Master core concepts in Biology, Chemistry, and Physics.",
        "price": 0,
        "cover": "assets/images/courses-01.jpg",
        "duration": "12 weeks",
        "language": "English",
        "level": "Beginner–Intermediate",
        "highlights": [
            "Real-life examples",
            "Weekly quizzes",
            "Live doubts",
            "Notes & assignments"
        ],
        "syllabus": [
            "Biology basics",
            "Chemistry fundamentals",
            "Physics fundamentals",
            "Practice tests"
        ],
        "instructor": {
            "name": "Dr. A. Sharma",
            "avatar": "assets/images/author-01.png",
            "bio": "PhD (Biology), 10+ years coaching."
        },
        "faq": [{"q": "Certificate?", "a": "Yes, on completion."}],
    },
    "jee-neet-crash-course-class-11-12": {
        "title": "JEE/NEET Crash Course (Class 11–12)",
        "short": "Fast-track prep with intensive revision and mock tests.",
        "price": 2999,
        "cover": "assets/images/courses-02.jpg",
        "duration": "6 weeks",
        "language": "English/Hinglish",
        "level": "Advanced",
        "highlights": [
            "Daily targets",
            "Exam-like mocks",
            "Doubt sessions",
            "Performance dashboard"
        ],
        "syllabus": [
            "High-yield revision",
            "DPPs",
            "Full mocks",
            "Exam strategy"
        ],
        "instructor": {
            "name": "Prof. K. Verma",
            "avatar": "assets/images/author-02.png",
            "bio": "Ex-IIT faculty, 12+ years."
        },
        "faq": [{"q": "Notes provided?", "a": "Yes, PDF notes."}],
    },
    "cuet-preparation": {
        "title": "CUET Preparation",
        "short": "Comprehensive coaching for CUET.",
        "price": 4999,
        "cover": "assets/images/courses-03.jpg",
        "duration": "10 weeks",
        "language": "English",
        "level": "Intermediate",
        "highlights": [
            "Domain training",
            "Mock tests",
            "Strategy",
            "Doubt clearing"
        ],
        "syllabus": [
            "Language + domain",
            "Mock series",
            "Analysis",
            "Final sprint"
        ],
        "instructor": {
            "name": "Team Hustle",
            "avatar": "assets/images/author-03.png",
            "bio": "Experienced mentors."
        },
        "faq": [{"q": "Eligibility?", "a": "Class 12 or equivalent."}],
    },
    "ssc-bank-upsc-basics": {
        "title": "SSC/Bank/UPSC Basics",
        "short": "Aptitude, reasoning and GA for competitive exams.",
        "price": 3999,
        "cover": "assets/images/courses-04.jpg",
        "duration": "8 weeks",
        "language": "English/Hinglish",
        "level": "Beginner",
        "highlights": [
            "Quant + Reasoning",
            "GA capsules",
            "Practice sets",
            "Doubts"
        ],
        "syllabus": [
            "Quant basics",
            "Reasoning",
            "GA",
            "Full tests"
        ],
        "instructor": {
            "name": "Hustle Team",
            "avatar": "assets/images/author-04.png",
            "bio": "Competitive exam experts."
        },
        "faq": [{"q": "Mode?", "a": "Live + recorded."}],
    },
    "python-programming-beginners": {
        "title": "Python Programming for Beginners",
        "short": "Learn Python from scratch with hands-on lessons.",
        "price": 0,
        "cover": "assets/images/courses-05.jpg",
        "duration": "6 weeks",
        "language": "English",
        "level": "Beginner",
        "highlights": [
            "Hands-on coding",
            "Projects",
            "Doubts",
            "Notes"
        ],
        "syllabus": [
            "Syntax & basics",
            "Data structures",
            "Functions",
            "Mini projects"
        ],
        "instructor": {
            "name": "Mentor Team",
            "avatar": "assets/images/author-05.png",
            "bio": "Developers and educators."
        },
        "faq": [{"q": "Any prerequisites?", "a": "None."}],
    },
    "olympiad-scholarship-exam": {
        "title": "Olympiad & Scholarship Exam",
        "short": "Training for NTSE, IMO, NSO and more.",
        "price": 2999,
        "cover": "assets/images/courses-01.jpg",
        "duration": "10 weeks",
        "language": "English",
        "level": "Intermediate",
        "highlights": [
            "Focused prep",
            "Past papers",
            "Strategy",
            "Mocks"
        ],
        "syllabus": [
            "Topic overview",
            "Practice",
            "Past papers",
            "Mocks"
        ],
        "instructor": {
            "name": "Hustle Faculty",
            "avatar": "assets/images/author-01.png",
            "bio": "Olympiad specialists."
        },
        "faq": [{"q": "Support?", "a": "Doubt desk + forums."}],
    },
}

# =========================
# Email Helper
# =========================
def send_email(subject: str, body: str, to_email: str):
    msg = MIMEText(body, "plain")
    msg["Subject"] = subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())

# =========================
# Routes
# =========================
@app.get("/health")
def health():
    return {"status": "ok"}

# Home page
@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request, message: Optional[str] = None):
    return templates.TemplateResponse("index.html", {"request": request, "message": message})

# Registration form handler
@app.post("/submit-registration", response_class=HTMLResponse)
async def submit_registration(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    phone_number: str = Form(...)
):
    try:
        form = RegistrationForm(name=name, email=email, phone_number=phone_number)
        email_subject = "New Hustle Learningg Registration"
        email_body = f"""New registration received:

Name: {form.name}
Email: {form.email}
Phone Number: {form.phone_number}
"""
        send_email(email_subject, email_body, ADMIN_EMAIL)
        success_msg = "Thank you for registering! We have received your details."
        return templates.TemplateResponse("index.html", {"request": request, "message": success_msg})
    except ValidationError as e:
        error_msg = "Invalid input: " + str(e)
        return templates.TemplateResponse("index.html", {"request": request, "message": error_msg})
    except Exception as e:
        return templates.TemplateResponse("index.html", {"request": request, "message": f"Error sending email: {e}"})

# Contact form handler
@app.post("/submit-contact", response_class=HTMLResponse)
async def submit_contact(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    try:
        form = ContactForm(name=name, email=email, message=message)
        email_subject = "New Hustle Learningg Contact Message"
        email_body = f"""New message received from contact form:

Name: {form.name}
Email: {form.email}
Message:
{form.message}
"""
        send_email(email_subject, email_body, ADMIN_EMAIL)
        success_msg = "Thank you for reaching out! We have received your message."
        return templates.TemplateResponse("index.html", {"request": request, "message": success_msg})
    except ValidationError as e:
        error_msg = "Invalid input: " + str(e)
        return templates.TemplateResponse("index.html", {"request": request, "message": error_msg})
    except Exception as e:
        return templates.TemplateResponse("index.html", {"request": request, "message": f"Error sending email: {e}"})

# Course detail page
@app.get("/courses/{slug}", response_class=HTMLResponse)
async def course_detail(request: Request, slug: str = Path(...)):
    course = COURSES.get(slug)
    if not course:
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "message": "Course not found."},
            status_code=404
        )
    return templates.TemplateResponse("course_detail.html", {"request": request, "course": course, "slug": slug})

# Enroll handler (sends confirmation email to admin)
@app.post("/courses/{slug}/enroll", response_class=HTMLResponse)
async def enroll_course(request: Request, slug: str = Path(...)):
    course = COURSES.get(slug)
    if not course:
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "message": "Course not found."},
            status_code=404
        )

    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    client_host = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    subject = f"[Hustle Learningg] Enrollment Clicked: {course['title']}"
    body = (
        f"An enrollment was initiated on Hustle Learningg.\n\n"
        f"Course: {course['title']}\n"
        f"Slug: {slug}\n"
        f"Price: {'Free' if course['price'] == 0 else '₹' + format(course['price'], ',')}\n"
        f"Timestamp: {now}\n"
        f"Client IP: {client_host}\n"
        f"User-Agent: {user_agent}\n"
    )

    try:
        send_email(subject, body, ADMIN_EMAIL)
        flash = "Enrollment received! We’ve notified the team. You’ll get next steps soon."
    except Exception as e:
        print(f"SMTP error during enroll email: {e}")
        flash = "Enrollment recorded, but we could not send a confirmation email right now."

    return templates.TemplateResponse(
        "course_detail.html",
        {"request": request, "course": course, "slug": slug, "flash": flash}
    )
