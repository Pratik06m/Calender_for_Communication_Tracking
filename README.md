# Calendar Application for Communication Tracking

## Live Link: https://superlative-mochi-20c576.netlify.app/

## Objective
The purpose of this project is to develop a React-based calendar application that helps maintain and track communications with different companies. The goal is to ensure timely follow-ups and manage the frequency of engagements based on pre-defined schedules. The application consists of three primary modules:

1. Admin Module for managing companies and communication parameters.
2. User Module for managing and performing communication tasks.

## Table of Contents
1. Features
2. Installation
3. Deployment
4. Usage
5. Testing
6. Known Limitations
7. Contributions
8. Licenses


## Features

### Admin Module
Company Management: Add, edit, and delete companies with details like name, location, LinkedIn profile, emails, phone numbers, comments, and communication periodicity.

Communication Method Management: Define communication methods like LinkedIn Post, LinkedIn Message, Email, Phone Call, and others. Set the sequence and mandatory flags for communication steps.

### User Module
Dashboard: View and manage companies with a summary of the last five communications and the next scheduled communication.

Color-Coded Highlights: Red highlights for overdue communications, yellow for communications due today. Users can override or disable these highlights.

Communication Action: Log new communications by selecting the company and communication type (e.g., LinkedIn Post, Email), and input additional notes.

Notifications: View grids for overdue and today's communications with a badge count.

Calendar View: A calendar interface to manage past and upcoming communications.

### Installation

1. Clone the repository:

git clone https://github.com/your-username/calendar-communication-tracking.git
cd calendar-communication-tracking

2. Install dependencies:

npm install

3. Set up environment variables if required. Create a .env file in the root directory with the necessary configuration (e.g., API keys, database credentials).

4. Start the application locally:

npm start
The application will run on http://localhost:3000.

### Deployment
This project is deployed on Vercel for live access.

You can view the live application here: https://your-app.vercel.app.

### Usage
Once the application is running, users can:

Admin users can manage companies and communication methods through the admin dashboard.

Users can track communications, log interactions, and view upcoming engagements in the user dashboard.

The calendar view allows users to visualize and manage communication schedules.

### Testing
We ensured the application runs smoothly by performing the following tests:

Functional testing of all features, such as adding/editing companies, communication logging, and dashboard actions.

Usability testing to ensure the user interface is intuitive and easy to navigate.

Performance testing to check for smooth rendering and data handling.

Test data has been provided for the evaluation, including mock companies, communication methods, and schedules.

### Known Limitations
The Reporting and Analytics Module is optional and not implemented in the initial version. However, it can be integrated in future versions.

The application does not currently support multi-language localization.
Notifications rely on periodic checks, so there may be a slight delay in reflecting updates in the communication status.

### Contributions
Feel free to fork this repository, contribute, and raise issues. Contributions are welcome!

### Licenses
This project is licensed under the MIT License - see the LICENSE file for details.