# Jira Clone – Fullstack Project Management Tool

An **end-to-end fullstack Jira clone** with **workspaces, projects, epics, tasks, kanban boards, calendars, editing and deleting tasks, invite system, role-based access control, image uploads, analytics, authentication**, and more!

## 🚀 Tech Stack

- **Next.js**
- **React.js**
- **TypeScript**
- **TailwindCSS**
- **Appwrite**
- **Hono.js**

## ✨ Features

- 🏢 **Workspaces**: Organize tasks and projects within dedicated workspaces, offering a collaborative environment.
- 📊 **Projects / Epics**: Create and manage projects and epics to structure your tasks and milestones effectively.
- ✅ **Tasks**: Assign, track, and manage tasks with detailed descriptions and deadlines.
- 📋 **Kanban Board View**: Visualize and organize tasks using a kanban board for easy tracking of project progress.
- 🗃️ **Data Table View**: An alternate view to manage tasks and projects in a structured table format.
- 📅 **Calendar View**: Keep track of deadlines, tasks, and project milestones with a comprehensive calendar view.
- ✉️ **Invite System**: Invite team members to workspaces or projects using invite links or unique codes.
- ⚙️ **Workspace and Project Settings**: Customize and configure workspace and project settings according to your needs.
- 🖼️ **Image Uploads**: Upload images for avatars, attachments, or any related resources.
- 🔌 **Appwrite SDK Integration**: Backend integration with Appwrite SDK for managing tasks, users, and storage.
- ⚛️ **Next.js 14 Framework**: Utilizes the latest Next.js 14 framework for optimal performance and scalability.
- 🎨 **Shadcn UI & TailwindCSS Styling**: Modern, responsive UI with Shadcn UI components and TailwindCSS styling.
- 🔍 **Advanced Search and Filtering**: Quickly find tasks, projects, and users with powerful search and filtering options.
- 📈 **Analytics Dashboard**: Gain insights into project performance, task completion, and team activity with an analytics dashboard.
- 👥 **User Roles and Permissions**: Implement role-based access control to ensure proper access levels across teams.
- 🔒 **Authentication**: Supports OAuth and email-based authentication for secure login.
- 📱 **Responsive Design**: Fully mobile-friendly design for easy use on all devices.
- 🚀 **API using Hono.js**: Fast and lightweight API integration with Hono.js for handling tasks and user management.

## 🛠️ Installation

```bash
git clone https://github.com/hha297/Jira-Clone.git>
cd jira-clone
npm install
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
NEXT_PUBLIC_APPWRITE_TASKS_ID=

NEXT_APPWRITE_KEY=
```

👉 **Fill in each variable with your Appwrite project’s corresponding values.**

## ▶️ Running the project

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

