# ExpenseTracker

ExpenseTracker is a modern web application designed for financial control,
allowing users to effectively monitor their daily expenses and incomes.

## About the Project and Its Purpose

The primary goal of ExpenseTracker is to provide users with full control over
their own cash flows. The application automates the process of balance
calculation and helps visualize financial habits.

**Key tasks the application solves:**

- **Transaction Recording:** Quickly add incomes and expenses with comments and
  date selection.
- **Budget Management:** Automatic balance recalculation after each operation.
- **In-depth Analytics:** Visualization of expenses by category to identify
  major spending areas.
- **Data Organization:** Creating a custom category structure for accurate
  accounting.

## Technology Stack

The project is built using a modern technology stack to ensure speed and
scalability:

- **Framework:** Next.js 15 (App Router) — utilizing server and client
  components for optimal performance.
- **State Management:** Zustand — lightweight and fast management of
  authentication state and global data.
- **Server State:** React Query — efficient data caching, handling of loading
  states, and automatic updates after mutations.
- **Forms & Validation:** Formik and Yup — reliable handling of complex forms
  and instant data validation.
- **Styling:** CSS Modules — isolated component styles using global CSS
  variables for a consistent design.
- **HTTP Client:** Axios — configured instances for interaction with the REST
  API.

## Features

### Authentication and Profiling

- Full registration and login cycle for users.
- User settings modal: changing name, updating avatar, and selecting the
  preferred currency.

### Transaction Management

- **Main Transactions Page:** Display of current balance, expense charts, and a
  form for instant entry addition.
- **Transactions History:** A detailed table of all operations with pagination
  support.
- **Edit and Delete:** Full CRUD cycle for each transaction with automatic
  balance updates for the current month.

### Analytics and Categories

- **Interactive Charts:** Visual representation of expense shares by category.
- **Custom Categories:** Modal window for creating, editing, and deleting
  personal user categories.

## How to Run the Project Locally

### 1) Prerequisites

- Installed **Node.js** (LTS version recommended).
- Installed **npm** (package manager).

### 2) Installation and Launch

```bash
# Clone the repository
git clone [https://github.com/your-username/expense-tracker.git](https://github.com/your-username/expense-tracker.git)

# Navigate to the project directory
cd expense-tracker

# Install dependencies
npm install

# Run the development server
npm run dev
```
