# Calendar-Applicaton

Project Overview
The Communication Calendar Application is designed to streamline and manage communication methods, frequency, and effectiveness. It features an admin panel for managing communication methods and a user interface for viewing dashboards, notifications, and calendars. The application also provides insightful reports to track communication trends and engagement effectiveness.

# Table of Contents
Project Overview

Features

Installation

Usage

Contributing

License

# Features
Admin Management: Manage companies and communication methods.

User Dashboard: View notifications, calendar, and execute communication actions.

Reports: Generate and view communication frequency reports, engagement effectiveness dashboards, overdue communication trends, and activity logs.

Shared Components: Consistent UI elements including header, sidebar, and footer.

# Project Structure 

client/
└── src/
    ├── components/
    │   ├── admin/
    │   │   ├── CompanyManagement.js
    │   │   └── CommunicationMethodManagement.js
    │   ├── user/
    │   │   ├── Dashboard.js
    │   │   ├── Notifications.js
    │   │   ├── CalendarView.js
    │   │   └── CommunicationActionModal.js
    │   ├── reports/
    │   │   ├── CommunicationFrequencyReport.js
    │   │   ├── EngagementEffectivenessDashboard.js
    │   │   ├── OverdueCommunicationTrends.js
    │   │   └── ActivityLog.js
    │   └── shared/
    │       ├── Header.js
    │       ├── Sidebar.js
    │       └── Footer.js
    ├── App.js
    ├── App.css
    ├── index.js
    └── index.css
server.js
package.json

# Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/aqueebjaved61/Calendar-Applicaton.git
2. Navigate to the project directory:
   cd communication-calender
3. Install dependencies:
   npm start

# Usage
To start the application locally:
1. To start the frontend :
  use command npm start
2. Open your browser and visit http://localhost:3000.
3. To start the backend :
   use command node server.js
  
