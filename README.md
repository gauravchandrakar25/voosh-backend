# Voosh Backend Assignment

## Overview

This project is an enhanced backend API for an authentication system, built using Node.js. It includes features for user registration, login, profile management, and the ability to set profiles as public or private. Admin users have access to both public and private profiles, while normal users can only access public profiles.

## User Stories

- **User Registration**: Users can register a new account.
- **User Login**: Users can log in using email/password credentials.
- **Social Login**: Users can log in or register with services like Google, Facebook, Twitter, or GitHub (not implemented).
- **User Sign Out**: Users can sign out of their accounts.
- **View Profile**: Users can view their profile details.
- **Edit Profile**: Users can edit their profile details, including photo, name, bio, phone, email, and password.
- **Upload Photo**: Users can upload a new photo or provide an image URL.
- **Set Profile Privacy**: Users can choose to make their profile public or private.
- **Admin Access**: Admin users can see both public and private user profiles.
- **Normal User Access**: Normal users can only see public user profiles.

## Requirements

- **Node.js Backend**: The backend is built using Node.js.
- **Public/Private Profiles**: Users can set their profiles as public or private.
- **Authorization Checks**: Admin users have access to both public and private profiles, while normal users can only access public profiles.
- **Privacy Protection**: Private user details remain private to unauthorized users.
- **API Endpoints**: Endpoints are provided for listing public profiles and retrieving user profiles based on user roles.
- **Profile Editing**: Profile editing functionality includes the option to set the profile as public or private.
- **Error Handling**: Proper error handling, validation, and security measures are implemented.
- **Hosting**: The API can be hosted on platforms like Heroku (optional).
- **API Playground**: Swagger or similar tools can be used to create an API playground for testing (optional).

## Swagger API Documentation

Use /api-docs for swagger documentation

## Note

Social login APIs were not implemented in this project due to time constraints. However, the system is designed to accommodate the integration of these APIs in future updates.

Feel free to contribute to the project and enhance its features further. Your feedback and suggestions are welcome!
