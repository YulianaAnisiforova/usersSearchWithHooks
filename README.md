# GitHub User Search Application Documentation

## Overview

This application allows users to search for GitHub users, view their profiles, and see basic information. The application features a clean UI with search functionality, pagination, and a timer-based user details display.

## Components

### 1. Page Component (`Page.tsx`)

The main container component that orchestrates the application flow.

**Features:**
- Manages the search term state
- Tracks the currently selected user
- Updates document title based on selected user
- Provides a reset button to return to default search

**Props:** None

**State:**
- `selectedUser`: Currently selected GitHub user (or null)
- `searchTerm`: Current search term (default: "Yuliana")

### 2. Search Component (`Search.tsx`)

Handles the search input functionality.

**Features:**
- Controlled input component
- Submit button to trigger search
- Maintains temporary search term before submission

**Props:**
- `value`: Current search term
- `onSubmit`: Callback when search is submitted

### 3. UsersList Component (`UsersList.tsx`)

Displays a paginated list of GitHub users matching the search term.

**Features:**
- Fetches users from GitHub API
- Pagination support (20 users per page)
- Highlights selected user
- Click handler to select a user

**Props:**
- `searchTerm`: Term to search for
- `selectedUser`: Currently selected user
- `onUserSelect`: Callback when a user is selected

### 4. UserDetails Component (`UserDetails.tsx`)

Displays detailed information about a selected GitHub user.

**Features:**
- Fetches user details from GitHub API
- Displays avatar and basic information
- Includes a countdown timer (5 seconds)
- Auto-closes when timer expires or when manually closed

**Props:**
- `user`: Selected user to display details for
- `onDisappear`: Callback when details should be closed

### 5. Timer Component (`Timer.tsx`)

A countdown timer used in the UserDetails component.

**Features:**
- Counts down from specified seconds
- Resets when timer key changes
- Provides manual close functionality

**Props:**
- `seconds`: Initial seconds to count down from
- `onChange`: Callback when seconds change
- `timerKey`: Key to identify when timer should reset
- `onClose`: Callback when timer is manually closed

## Styling

The application uses CSS Modules for styling with a `.module.css` file per component. Key styling features include:

- Responsive container layout
- Styled buttons and inputs
- Selected user highlighting
- Avatar image styling
- Clean list presentation

## API Usage

The application interacts with the GitHub API at:

1. User search: `https://api.github.com/search/users`
    - Parameters: `q` (search term), `page`, `per_page`

2. User details: `https://api.github.com/users/{login}`
    - Returns detailed information about a specific user

## Usage Instructions

1. Enter a search term in the input field
2. Click the search button or press Enter
3. Browse the paginated list of results
4. Click on a user to view their details
    - Details will automatically close after 5 seconds
    - Click the timer button to close manually
5. Use the reset button (trash icon) to return to the default search

## Dependencies

- React
- Ant Design (UI components)
- Axios (HTTP requests)
- TypeScript
