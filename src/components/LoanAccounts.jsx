import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for client-side routing
import './LoanAccounts.css';

const LoanAccounts = () => {
  const navigate = useNavigate(); // Initialize navigate function for routing
  const [formData, setFormData] = useState({ // Modified: updated form fields per new requirements
    firstName: '', // Unchanged: first name field
    lastName: '', // Unchanged: last name field
    email: '', // Unchanged: email field
    phone: '', // Unchanged: phone field
    loanAmount: '', // Unchanged: loan amount field
    loanPurpose: '', // Unchanged: loan purpose field
    loanStatus: '', // Added: loan status select value
    installment: '', // Added: number of months for installments
    emi: '' // Added: monthly EMI amount
    // employment: '', // Removed: employment field per request
    // income: '' // Removed: annual income field per request
  });

  // State to track validation errors for each field
  const [errors, setErrors] = useState({});
  // State to track if form has been submitted (to show errors)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to validate individual field based on name and value // Modified: updated to support new fields and removed ones
  const validateField = (name, value) => { // Modified: same signature, updated logic
    switch (name) { // Modified
      case 'firstName': // Unchanged
      case 'lastName': // Unchanged
        // Check if name contains only letters and spaces, minimum 2 characters // Unchanged
        return value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value.trim()) 
          ? '' : 'Must be at least 2 characters and contain only letters'; // Unchanged
      
      case 'email': // Unchanged
        // Validate email format using regex pattern // Unchanged
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Unchanged
        return emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address'; // Unchanged
      
      case 'phone': // Unchanged
        // Validate phone number (10-15 digits, optional formatting) // Unchanged
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Modified: reverted to original reliable pattern (starts with 1-9, allows optional +, up to 16 digits total)
        const cleanPhone = value.replace(/[\s\-\(\)]/g, ''); // Unchanged
        return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone) 
          ? '' : 'Please enter a valid phone number (10-15 digits)'; // Unchanged
      
      case 'loanAmount': // Unchanged
        // Validate loan amount is between $1,000 and $1,000,000 // Unchanged
        const amount = parseFloat(value); // Unchanged
        return amount >= 1000 && amount <= 1000000 
          ? '' : 'Loan amount must be between $1,000 and $1,000,000'; // Unchanged
      
      case 'loanPurpose': // Unchanged
        // Check if dropdown option is selected // Unchanged
        return value !== '' ? '' : 'Please select an option'; // Unchanged
      
      case 'loanStatus': // Added: validate new Loan Status field
        // Ensure user selected a loan status // Added
        return value !== '' ? '' : 'Please select a loan status'; // Added
      
      case 'installment': // Added: validate new Installment field
        // Require integer months between 1 and 360 // Added
        const months = Number(value); // Added
        return Number.isInteger(months) && months >= 1 && months <= 360 
          ? '' : 'Installment months must be an integer between 1 and 360'; // Added
      
      case 'emi': // Added: validate new EMI field
        // EMI must be > 0 and up to 1,000,000 // Added
        const emiVal = parseFloat(value); // Added
        return emiVal > 0 && emiVal <= 1000000 
          ? '' : 'EMI must be greater than 0 and up to 1,000,000'; // Added
      
      // case 'income': // Removed per request
      //   const income = parseFloat(value); // Removed
      //   return income >= 10000 ? '' : 'Annual income must be at least $10,000'; // Removed
      
      // case 'employment': // Removed per request
      //   return value !== '' ? '' : 'Please select an option'; // Removed
      
      default: // Unchanged
        return ''; // Unchanged
    } // Modified: end switch
  }; // Modified: end validateField

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data with new value
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if form has been submitted (real-time validation)
    if (isSubmitted) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set form as submitted to enable error display
    setIsSubmitted(true);

    // Validate all fields and collect errors
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Update errors state with validation results
    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      // Here you would typically send data to an API
    } else {
      console.log('Form has validation errors:', newErrors);
    }
  };

  return (
    <div className="LoanAccounts-container">
      <div className="LoanAccounts-wrapper">
        <div className="LoanAccounts-header">
          <h1 className="LoanAccounts-title">Loan Application</h1>
          <p className="LoanAccounts-subtitle">Fill out the form below to apply for a loan</p>
        </div>

        <form className="LoanAccounts-form" onSubmit={handleSubmit}>
          <div className="LoanAccounts-row">
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.firstName ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                required
              />
              {/* Display error message if validation fails */}
              {errors.firstName && <span className="LoanAccounts-error">{errors.firstName}</span>}
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.lastName ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                required
              />
              {/* Display error message if validation fails */}
              {errors.lastName && <span className="LoanAccounts-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="LoanAccounts-row">
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.email ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                required
              />
              {/* Display error message if validation fails */}
              {errors.email && <span className="LoanAccounts-error">{errors.email}</span>}
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.phone ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                required
              />
              {/* Display error message if validation fails */}
              {errors.phone && <span className="LoanAccounts-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="LoanAccounts-row">
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Loan Amount *</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.loanAmount ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                placeholder="$"
                required
              />
              {/* Display error message if validation fails */}
              {errors.loanAmount && <span className="LoanAccounts-error">{errors.loanAmount}</span>}
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Loan Purpose *</label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                className={`LoanAccounts-select ${errors.loanPurpose ? 'LoanAccounts-select--error' : ''}`} // Add error class if validation fails
                required
              >
                <option value="">Select Purpose</option>
                <option value="home">Home Purchase</option>
                <option value="car">Car Purchase</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="education">Education</option>
              </select>
              {/* Display error message if validation fails */}
              {errors.loanPurpose && <span className="LoanAccounts-error">{errors.loanPurpose}</span>}
            </div>
          </div>

          <div className="LoanAccounts-row"> {/* Modified: replaced Employment/Income row with Loan Status and Installment */}
            <div className="LoanAccounts-field"> {/* Added: Loan Status field container */}
              <label className="LoanAccounts-label">Loan Status *</label> {/* Added: label for Loan Status */}
              <select
                name="loanStatus" // Added: bind to loanStatus state key
                value={formData.loanStatus} // Added: current value from state
                onChange={handleInputChange} // Added: update state on change
                className={`LoanAccounts-select ${errors.loanStatus ? 'LoanAccounts-select--error' : ''}`} // Added: apply error styling when invalid
                required // Added: make field required
              >
                <option value="">Select Status</option> {/* Added: placeholder option */}
                <option value="approved">Approved</option> {/* Added: status option */}
                <option value="rejected">Rejected</option> {/* Added: status option */}
                <option value="pending">Pending</option> {/* Added: status option */}
              </select>
              {/* Display error message if validation fails */} {/* Unchanged pattern but for new field */}
              {errors.loanStatus && <span className="LoanAccounts-error">{errors.loanStatus}</span>} {/* Added: error message bind for Loan Status */}
            </div>
            <div className="LoanAccounts-field"> {/* Added: Installment field container */}
              <label className="LoanAccounts-label">Installment (months) *</label> {/* Added: label for Installment */}
              <input
                type="number" // Added: numeric input for months
                name="installment" // Added: bind to installment state key
                value={formData.installment} // Added: current value from state
                onChange={handleInputChange} // Added: update state on change
                className={`LoanAccounts-input ${errors.installment ? 'LoanAccounts-input--error' : ''}`} // Added: error styling
                placeholder="e.g., 12" // Added: hint for months
                required // Added: make field required
              />
              {/* Display error message if validation fails */} {/* Unchanged pattern but for new field */}
              {errors.installment && <span className="LoanAccounts-error">{errors.installment}</span>} {/* Added: error message bind for Installment */}
            </div>
            {/* <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Employment Status *</label>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleInputChange}
                className={`LoanAccounts-select ${errors.employment ? 'LoanAccounts-select--error' : ''}`}
                required
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
              {errors.employment && <span className="LoanAccounts-error">{errors.employment}</span>}
            </div> */} {/* Removed: Employment field per request */}
            {/* <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Annual Income *</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.income ? 'LoanAccounts-input--error' : ''}`}
                placeholder="$"
                required
              />
              {errors.income && <span className="LoanAccounts-error">{errors.income}</span>}
            </div> */} {/* Removed: Annual Income field per request */}
          </div>

          <div className="LoanAccounts-row"> {/* Added: New row for EMI */}
            <div className="LoanAccounts-field"> {/* Added: EMI field container */}
              <label className="LoanAccounts-label">EMI (Per Month Amount) *</label> {/* Added: label for EMI */}
              <input
                type="number" // Added: numeric input for EMI amount
                name="emi" // Added: bind to emi state key
                value={formData.emi} // Added: current value from state
                onChange={handleInputChange} // Added: update state on change
                className={`LoanAccounts-input ${errors.emi ? 'LoanAccounts-input--error' : ''}`} // Added: error styling when invalid
                placeholder="$" // Added: currency placeholder
                required // Added: make field required
              />
              {/* Display error message if validation fails */} {/* Unchanged pattern but for new field */}
              {errors.emi && <span className="LoanAccounts-error">{errors.emi}</span>} {/* Added: error bind for EMI */}
            </div>
            <div className="LoanAccounts-field" aria-hidden="true"> {/* Added: placeholder to keep 2-column layout */}
            </div>
          </div>

          <div className="LoanAccounts-actions">
            <button 
              type="button" 
              className="LoanAccounts-button LoanAccounts-button--secondary"
              onClick={() => navigate('/loan')} // Navigate to /loan route when Cancel button is clicked
            >
              Cancel
            </button>
            <button type="submit" className="LoanAccounts-button LoanAccounts-button--primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanAccounts;