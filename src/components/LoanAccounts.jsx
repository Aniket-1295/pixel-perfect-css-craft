import React, { useState } from 'react';
import './LoanAccounts.css';

const LoanAccounts = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                className="LoanAccounts-input"
                required
              />
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="LoanAccounts-input"
                required
              />
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
                className="LoanAccounts-input"
                required
              />
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="LoanAccounts-input"
                required
              />
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
                className="LoanAccounts-input"
                placeholder="$"
                required
              />
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Loan Purpose *</label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                className="LoanAccounts-select"
                required
              >
                <option value="">Select Purpose</option>
                <option value="home">Home Purchase</option>
                <option value="car">Car Purchase</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          <div className="LoanAccounts-row">
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Employment Status *</label>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleInputChange}
                className="LoanAccounts-select"
                required
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
            </div>
            <div className="LoanAccounts-field">
              <label className="LoanAccounts-label">Annual Income *</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className="LoanAccounts-input"
                placeholder="$"
                required
              />
            </div>
          </div>

          <div className="LoanAccounts-actions">
            <button type="button" className="LoanAccounts-button LoanAccounts-button--secondary">
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