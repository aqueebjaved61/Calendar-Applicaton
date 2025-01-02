# Calendar-Applicaton

Project Overview
The Communication Calendar Application is designed to streamline and manage communication methods, frequency, and effectiveness. It features an admin panel for managing communication methods and a user interface for viewing dashboards, notifications, and calendars. The application also provides insightful reports to track communication trends and engagement effectiveness.

# Table of Contents
Project Overview

. Features

. Installation

. Usage

. License

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

# ScreenShots of this Project


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_22_59](https://github.com/user-attachments/assets/a3b30bf3-3b4f-406f-9c1a-671aa288b364)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_23_13](https://github.com/user-attachments/assets/aec1c391-71bd-4647-a364-5dda43b32c50)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_23_23](https://github.com/user-attachments/assets/8c4b9440-2664-4dc7-b294-8b7bd81a30e6)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_23_32](https://github.com/user-attachments/assets/c28cb85f-077c-47a1-a000-b531e887b7ac)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_23_39](https://github.com/user-attachments/assets/7555c6ad-7404-4812-8aef-12df79a96806)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_24_07](https://github.com/user-attachments/assets/e1a4ab06-2d4f-4a90-bb3e-31f921f2255f)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_24_17](https://github.com/user-attachments/assets/7001553e-e6d6-473f-8893-3e0421c2ca2c)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_24_25](https://github.com/user-attachments/assets/210626b9-dcca-4042-8aaa-d92650fcd9c7)


![Communication Calendar - Personal - Microsoft​ Edge 03-01-2025 02_24_42](https://github.com/user-attachments/assets/72480dc8-3001-4e2c-bfb1-c6c485279474)

# License
 This project is licensed under the MIT License. See the LICENSE file for details.
  
