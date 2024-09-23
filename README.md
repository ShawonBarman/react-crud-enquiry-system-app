# react-crud-enquiry-system-app

This project is a fully functional enquiry management system built using **React**. It demonstrates **Create, Read, Update, Delete (CRUD)** functionality with form handling, data persistence using `localStorage`, and a user-friendly interface for managing user enquiries. The project uses **Bootstrap 5** for styling and **react-toastify** for notifications.

### Live: https://react-enquiry-system-app.netlify.app/

## Features

- **CRUD Operations**: Users can add, view, update, and delete enquiry records.
- **Form Handling**: The form inputs are managed using React's `useState` hook for dynamic data binding.
- **LocalStorage Persistence**: The enquiry data is stored in the browser's localStorage to maintain data between page reloads.
- **Responsive Design**: The app uses Bootstrap 5 for styling, ensuring responsiveness across devices.
- **Notifications**: Success and error messages are displayed using `react-toastify` for a smooth user experience.

## Key Technologies Used

- **React**: Component-based architecture for building the user interface.
- **useState**: React hook for managing form input values and user data.
- **useEffect**: React hook used to persist data changes to localStorage.
- **localStorage**: To save and retrieve enquiry data, ensuring data is available even after page reloads.
- **Bootstrap 5**: CSS framework for responsive design.
- **react-toastify**: Provides elegant notification messages.
- **JavaScript ES6**: Modern JavaScript features for clean, efficient code.

## Form Handling

The form data (name, email, phone number, and message) is managed using the `useState` hook in React. Here's a brief breakdown of how form handling works:

1. **useState for Form Data**: The `useState` hook initializes an object to hold the form values (`uname`, `uemail`, `uphone`, `umessage`, and `index`).
    ```javascript
    let [formData, setFormData] = useState({
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    });
    ```

2. **Dynamic Form Updates**: When the user types into the form, the `getData` function dynamically updates the formData state by binding input values to the respective fields.
    ```javascript
    let getData = (event) => {
      let oldFormData = { ...formData };
      let inputName = event.target.name;
      let inputValue = event.target.value;
      oldFormData[inputName] = inputValue;
      setFormData(oldFormData);
    };
    ```

3. **Submitting Data**: On form submission, the app checks for validation (e.g., duplicate emails/phone numbers) and either adds a new record or updates an existing one.
    ```javascript
    let handleSubmit = (event) => {
      event.preventDefault();
      // Validation and submission logic
    };
    ```

4. **CRUD Operations**: The `handleSubmit` function handles both creating and updating records. Deleting and editing records is handled through dedicated buttons and corresponding functions (`deleteUserData` and `editUserData`).

5. **Data Persistence with localStorage**: The `useEffect` hook ensures that the `userData` array is synced with localStorage, saving user entries between page reloads.
    ```javascript
    useEffect(() => {
      localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);
    ```

## Installation and Setup

To run these apps locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShawonBarman/react-crud-enquiry-system-app.git
   cd react-crud-enquiry-system-app
   ```

2. **Install dependencies:**

   Make sure you have Node.js and npm installed.

   ```bash
   npm install
   ```

3. **Run the applications:**

   ```bash
   npm start
   ```

This will start the app at http://localhost:3000.

## Usage

- **Add New Record**: Fill out the enquiry form (Name, Email, Phone, and Message) and click "Save" to store the record.
- **Edit Existing Record**: Click "Edit" next to a record to populate the form with the current values. Make changes and click "Update" to save the changes.
- **Delete Record**: Click "Delete" next to a record to remove it from the list.
- **Data Persistence**: All records are saved in `localStorage`, so they remain even after the page is refreshed.

## Project Structure

  ```bash
  public/
  │
  ├── index.html
 
  src/
  │
  ├── App.js           # Main component that includes form and table
  ├── index.js         # Entry point to render the App component
  └── index.css        # Additional CSS for custom styling
  ```

## Future Improvements

- **Backend Integration**: Replace `localStorage` with a backend API to store and retrieve data from a database.
- **Form Validation**: Add more robust validation for form fields (e.g., regex for email and phone number).
- **Search and Filter**: Implement search and filter functionality to manage large datasets more efficiently.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
