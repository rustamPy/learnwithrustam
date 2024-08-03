# Learn with Rustam (LWR)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![React](https://img.shields.io/badge/react-%5E17.0.0-blue)
![Next.js](https://img.shields.io/badge/next-%5E12.0.0-lightgrey)

Learn with Rustam (LWR) is an online platform for interactive courses and educational content. Our goal is to make learning accessible and engaging for everyone. The website offers a variety of courses across different subjects, allowing users to learn at their own pace and save their progress.


<img src="image/README/footer_icon.png" alt="Description" width="100">


## Table of Contents

- [Learn with Rustam (LWR)](#learn-with-rustam-lwr)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

- **Course Catalog**: Browse and search for courses easily.
- **User Profiles**: Save favorite courses and track progress.
- **Responsive Design**: Accessible on desktops, tablets, and mobile devices.
- **Authentication**: Secure login and registration system using NextAuth.js.
- **Pagination**: Efficient navigation through courses with dynamic pagination.
- **Interactive UI**: Built with React and styled with Tailwind CSS.

## Installation

To get started with the LWR website locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/lwr.git
   cd lwr
   ```
2. **Install Dependencies**

Make sure you have Node.js installed (version >= 14.0.0).

    ``    npm install    ``

3. **Environment Variables**

Create a .env.local file in the root directory and add your environment variables:

    ``    NEXTAUTH_URL=http://localhost:3000     NEXTAUTH_SECRET=your_secret_key    ``

4. **Run the Development Server**

   ```
   npm run dev
   ```

The application will be available at http://localhost:3000.

## Usage

* Home Page: Browse featured courses and navigate to the course catalog.
* Course Catalog: Search for courses, view details, and save courses to your profile.
* User Profile: View and manage your saved courses.
* Pagination: Use the pagination controls to navigate through courses efficiently.

## Folder Structure

The project structure is organized as follows:

    ``    lwr/     ├── public/                  # Static assets like images and icons     ├── src/     │   ├── components/          # Reusable React components     │   ├── pages/               # Next.js pages     │   ├── styles/              # CSS and Tailwind styles     │   ├── hooks/               # Custom hooks     │   ├── context/             # Context providers for global state     │   ├── utils/               # Utility functions and constants     │   └── api/                 # API route handlers     └── README.md    ``

## Contributing

I welcome contributions to Learn with Rustam! Here’s how you can help:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page to create a copy of this repository on your GitHub account.
2. **Clone the Fork**

   ```
   git clone https://github.com/your-username/lwr.git
   cd lwr
   ```
3. **Create a New Branch**

   ```
   git checkout -b feature/your-feature-name
   ```
4. **Make Your Changes** : Implement your changes or new features.
5. **Commit Your Changes**

   ```
   git commit -m "Add your message here"
   ```
6. **Push to Your Fork**

   ```
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**: Go to the original repository on GitHub and create a pull request from your forked repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or feedback, please contact us at:

Email: karimov.rustam.live@gmail.com
