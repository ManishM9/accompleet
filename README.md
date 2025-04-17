# Accompleet (Name TBD)

Accelerate your learning on LeetCode!

---

### 🚀 Git Branching & Pull Request Workflow

To ensure a clean and collaborative development process, **never commit directly to `main`**. Follow this branching workflow:

```bash
# Step 1: Pull the latest changes from main
git pull origin main

# Step 2: Create a new branch from main
git checkout -b <your_branch_name>

# Step 3: Make your changes...

# Step 4: Stage and commit your changes
git add .
git commit -m "<your_commit_message>"

# Step 5: Push your branch to GitHub
git push origin <your_branch_name>

# Go to Github UI -> Pull Requests -> base: main | comare: <your_branch_name>  -> Resolve conflicts -> Merge.
# Add comments so it is clear for everyone.
```



---

### 📝 MOM (16th April 2025)

- **Decided to use Content Script** instead of Popup since it can manipulate the DOM and scrape data from the active tab.
- Planned **backend service integration** to persist data using Chrome's storage API.
- **Initial flow** for the extension UI:
  1. Small circular logo on the bottom-right of LeetCode.
  2. On click: Opens a small window with buttons representing categories.
  3. On selecting a category: Show prompts with a back button to return to category list.
  4. Full-screen window for chat, with a button to **persist/keep it open**.

#### 🔧 Todo:
- Define all **categories** and their corresponding **prompts**.
  - Each category should have a balanced number of prompts (avoid excessive scrolling).
- Build basic React components:
  - `HoveringLogo`
  - `SmallWindow`
  - `BigWindow`

#### 🌟 Future Features:
- Support for **dynamic categories or prompts**.
- Add **event-driven dialog popups** attached to the floating logo:
  - Example: “All testcases passed!” → small success dialog.
  - Example: “Solution Accepted!” → brief congratulatory popup.
  - These dialog boxes will be **temporary** and disappear after a few seconds.

---
