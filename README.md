# 🚀 PSSA Space Mission

A fun, space-themed test prep app for 3rd graders preparing for the Pennsylvania System of School Assessment (PSSA). Built for my twin sons with assistance from AI (Claude Opus 4.6).

## What's Inside

- **ELA Practice**: Reading passages, comprehension questions, evidence-based questions (EBSR), grammar, and short-answer writing
- **Math Practice**: Numbers & operations, fractions, geometry, measurement — all Grade 3 PSSA topics
- **Strategy Reminders**: Built-in test-taking tips before each session
- **Progress Tracking**: Streaks, badges, accuracy stats per category
- **Parent Dashboard**: See both boys' progress at a glance

---

## 🖥️ Local Setup (Your Computer)

### Prerequisites

You need **Node.js** (version 18 or higher) and **npm** installed.

**Check if you already have them:**
```bash
node --version
npm --version
```

**If you need to install Node.js:**
1. Go to https://nodejs.org
2. Download the **LTS** version (green button)
3. Run the installer — accept all defaults
4. Close and reopen your terminal, then verify with `node --version`

### Step 1: Clone or Create the Project

If you already pushed this to GitHub (see below), clone it:
```bash
git clone https://github.com/YOUR_USERNAME/pssa-space-mission.git
cd pssa-space-mission
```

If starting fresh, create a folder and copy all the project files into it:
```bash
mkdir pssa-space-mission
cd pssa-space-mission
# Copy all project files here
```

### Step 2: Install Dependencies

```bash
npm install
```

This downloads React, Vite, and everything else. It creates a `node_modules/` folder (this is normal and can be large).

### Step 3: Run the Dev Server

```bash
npm run dev
```

You should see output like:
```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

**Open http://localhost:5173 in your browser** — you should see the Space Mission app!

The **Network** URL is how the boys can access it from their iPads while you're on the same Wi-Fi. Just type that URL into Safari on their iPads.

### Step 4: Build for Production

When you're ready to deploy:
```bash
npm run build
```

This creates a `dist/` folder with optimized static files. You can preview the build with:
```bash
npm run preview
```

---

## 🐙 GitHub Setup

### First Time Setup

1. **Create a GitHub repo:**
   - Go to https://github.com/new
   - Name it `pssa-space-mission`
   - Keep it **Public** (so other parents can find it) or **Private** (your choice)
   - Do NOT initialize with README (we already have one)
   - Click **Create repository**

2. **Connect your local project to GitHub:**
```bash
cd pssa-space-mission

# Initialize git
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: PSSA Space Mission app"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pssa-space-mission.git

# Push!
git branch -M main
git push -u origin main
```

### Ongoing Workflow

After making changes:
```bash
git add .
git commit -m "Description of what you changed"
git push
```

---

## ☁️ AWS Deployment

We'll host this as a **static website** using Amazon S3 + CloudFront. This is the simplest and cheapest way — likely free under AWS Free Tier.

### Step 1: Create an AWS Account (if needed)

1. Go to https://aws.amazon.com
2. Click **Create an AWS Account**
3. Follow the steps (you'll need a credit card, but Free Tier means no charges for this)

### Step 2: Install AWS CLI

**Mac:**
```bash
brew install awscli
```

**Windows:**
Download from https://aws.amazon.com/cli/ and run the installer.

**Verify:**
```bash
aws --version
```

### Step 3: Configure AWS CLI

```bash
aws configure
```

It will ask for:
- **AWS Access Key ID**: Get this from AWS Console → IAM → Users → Your User → Security Credentials → Create Access Key
- **AWS Secret Access Key**: Shown when you create the access key (save it!)
- **Default region**: `us-east-1` (recommended for S3 static hosting)
- **Default output format**: `json`

### Step 4: Create an S3 Bucket

```bash
# Pick a unique bucket name (must be globally unique)
aws s3 mb s3://pssa-space-mission-YOUR-UNIQUE-ID

# Example:
aws s3 mb s3://pssa-space-mission-philly-2026
```

### Step 5: Configure the Bucket for Static Website Hosting

```bash
# Enable static website hosting
aws s3 website s3://pssa-space-mission-philly-2026 \
  --index-document index.html \
  --error-document index.html
```

Create a bucket policy file to make it publicly readable. Save this as `bucket-policy.json` (replace the bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::pssa-space-mission-philly-2026/*"
    }
  ]
}
```

Apply it:
```bash
# First, unblock public access
aws s3api put-public-access-block \
  --bucket pssa-space-mission-philly-2026 \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Then apply the policy
aws s3api put-bucket-policy \
  --bucket pssa-space-mission-philly-2026 \
  --policy file://bucket-policy.json
```

### Step 6: Build and Deploy

```bash
# Build the app
npm run build

# Upload to S3
aws s3 sync dist/ s3://pssa-space-mission-philly-2026 --delete
```

### Step 7: Access Your Site!

Your site is now live at:
```
http://pssa-space-mission-philly-2026.s3-website-us-east-1.amazonaws.com
```

Share this URL with other parents!

### Updating the Site

Whenever you make changes:
```bash
npm run build
aws s3 sync dist/ s3://pssa-space-mission-philly-2026 --delete
```

That's it — two commands to update!

### Optional: Custom Domain with CloudFront

If you want a nicer URL (like `pssaprep.yourdomain.com`), you can add CloudFront + Route 53. This is more advanced — let me know when you're ready and I'll walk you through it.

---

## 📅 Study Schedule

| Weeks | Focus | Daily Load |
|-------|-------|-----------|
| 1-2 (Feb 16 - Mar 1) | Foundations | 4 questions/day |
| 3-4 (Mar 2 - 15) | ELA Deep Dive | 5 questions/day |
| 5-6 (Mar 16 - 26) | Math + Grammar | 5 questions/day |
| Spring Break (Mar 27 - Apr 3) | Optional/Light | 2 questions/day |
| 7 (Apr 4 - 12) | Writing Practice | 4 questions/day |
| 8 (Apr 13 - 19) | Review + Mini Test | 4 questions/day |
| 9 (Apr 20 - 21) | Confidence! | 2-3 easy questions |
| **Apr 22-24** | **PSSA ELA TEST** | 🚀 |
| **Apr 29-30** | **PSSA MATH TEST** | 🚀 |

---

## 🛠️ Project Structure

```
pssa-space-mission/
├── index.html              # Entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
├── .gitignore              # Files to exclude from git
├── README.md               # This file!
├── public/                 # Static assets
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Global styles
    ├── App.jsx             # Main application component
    ├── components/         # Reusable components (future)
    └── data/
        ├── config.js       # Schedule, badges, player config
        ├── passages.js     # Reading passages
        └── questions.js    # All question data
```

---

## 📝 Adding More Questions

To add questions, edit the files in `src/data/`:

**New reading passage** (`passages.js`):
```javascript
{
  id: "p6",
  title: "Your Passage Title",
  text: "The full passage text goes here...",
  type: "fiction"  // or "nonfiction"
}
```

**New multiple choice question** (`questions.js`):
```javascript
{
  id: "er15",
  passageId: "p6",  // links to a passage, or omit for standalone
  question: "What is the question?",
  options: ["Choice A", "Choice B", "Choice C", "Choice D"],
  correct: 1,  // index of correct answer (0-3)
  explanation: "Kid-friendly explanation of why this is correct.",
  category: "Reading Comprehension",
  difficulty: 1  // 1 = easier, 2 = harder
}
```

**New EBSR (two-part) question**:
```javascript
{
  id: "er16",
  passageId: "p6",
  question: "Part 1: What is the main idea?",
  options: ["A", "B", "C", "D"],
  correct: 2,
  explanation: "Explanation for part 1",
  category: "Evidence-Based",
  difficulty: 2,
  isEBSR: true,
  part2: {
    question: "Part 2: Which sentence best supports your answer?",
    options: ["Sentence A", "Sentence B", "Sentence C", "Sentence D"],
    correct: 1,
    explanation: "Explanation for part 2"
  }
}
```

---

Made with ❤️ to support my boys' PSSA prep journey!
