# Twibble - A Comprehensive Twitter Clone

Twibble is a feature-rich Twitter clone developed during the NullClass Fullstack Internship. This project aims to provide users with a seamless social media experience, incorporating advanced features such as subscription plans, multi-language support, and enhanced security measures.

## Project Link

Deployed Project: [Twibble on Netlify](https://jazzy-tanuki-89f669.netlify.app/)

GitHub Repository: [Twibble on GitHub](https://github.com/RK02k/Twibble_full)

## Features

1. **Subscription Plans**
   - Introduce subscription plans for premium features.
   - Monthly and Yearly Plans.
   - Secure transactions using payment gateways (Stripe, Razorpay).
   - Automated invoices and plan details via email.

2. **Multi-Language Support**
   - Support for multiple languages (Spanish, Hindi, Portuguese, Tamil, Bengali, French, English).
   - OTP verification for language changes.
   - Customized website themes based on language preferences.

3. **Login Security & Device Tracking**
   - Track user login information, including browser type, OS, device, and IP address.
   - OTP-based authentication for specific browsers or devices.
   - Time-based access controls for mobile devices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase
- **OTP Service**: Nodemailer (with Google Cloud O2Auth)
- **Payment Gateway**: Stripe, Razorpay
- **Deployment**: Vercel, Netlify

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RK02k/Twibble_full.git
   cd Twibble_full
