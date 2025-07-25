import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for client-side routing
import './LoanAccounts.css';

const LoanAccounts = () => {
  const navigate = useNavigate(); // Initialize navigate function for routing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanPurpose: '',
    employment: '',
    income: ''
  });

  // State to track validation errors for each field
  const [errors, setErrors] = useState({});
  // State to track if form has been submitted (to show errors)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to validate individual field based on name and value
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        // Check if name contains only letters and spaces, minimum 2 characters
        return value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value.trim()) 
          ? '' : 'Must be at least 2 characters and contain only letters';
      
      case 'email':
        // Validate email format using regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address';
      
      case 'phone':
        // Validate phone number (10-15 digits, optional formatting)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, ''); // Remove formatting characters
        return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone) 
          ? '' : 'Please enter a valid phone number (10-15 digits)';
      
      case 'loanAmount':
        // Validate loan amount is between $1,000 and $1,000,000
        const amount = parseFloat(value);
        return amount >= 1000 && amount <= 1000000 
          ? '' : 'Loan amount must be between $1,000 and $1,000,000';
      
      case 'income':
        // Validate annual income is at least $10,000
        const income = parseFloat(value);
        return income >= 10000 
          ? '' : 'Annual income must be at least $10,000';
      
      case 'loanPurpose':
      case 'employment':
        // Check if dropdown option is selected
        return value !== '' ? '' : 'Please select an option';
      
      default:
        return '';
    }
  };

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

          <div className="LoanAccounts-row">
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Employment Status *</label>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleInputChange}
                className={`LoanAccounts-select ${errors.employment ? 'LoanAccounts-select--error' : ''}`} // Add error class if validation fails
                required
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
              {/* Display error message if validation fails */}
              {errors.employment && <span className="LoanAccounts-error">{errors.employment}</span>}
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Annual Income *</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className={`LoanAccounts-input ${errors.income ? 'LoanAccounts-input--error' : ''}`} // Add error class if validation fails
                placeholder="$"
                required
              />
              {/* Display error message if validation fails */}
              {errors.income && <span className="LoanAccounts-error">{errors.income}</span>}
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