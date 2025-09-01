import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for client-side routing
import './LoanAccounts.css';

const LoanAccounts = ({ initialData = null, isModal = false, onCancel = null }) => { // Modified: added props for modal functionality and initial data
  const navigate = useNavigate(); // Initialize navigate function for routing
  const [formData, setFormData] = useState( // Modified: conditional initial state based on props
    initialData ? { // Added: if initial data provided, use it for pre-filling
      firstName: initialData.firstName || '', // Added: pre-fill first name from initial data
      lastName: initialData.lastName || '', // Added: pre-fill last name from initial data
      email: initialData.email || '', // Added: pre-fill email from initial data
      phone: initialData.phone || '', // Added: pre-fill phone from initial data
      loanAmount: initialData.amount ? initialData.amount.toString() : '', // Added: pre-fill loan amount, convert to string
      loanType: initialData.loanType || '', // Added: pre-fill loan type from initial data
      loanPurpose: initialData.loanPurpose || '', // Added: pre-fill loan purpose from initial data
      loanStatus: initialData.loanStatus || '', // Added: pre-fill loan status from initial data
      installment: initialData.installment || '', // Added: pre-fill installment from initial data
      emi: initialData.emi || '' // Added: pre-fill EMI from initial data
    } : { // Added: else use empty form for new applications
      firstName: '', // Unchanged: first name field
      lastName: '', // Unchanged: last name field
      email: '', // Unchanged: email field
      phone: '', // Unchanged: phone field
      loanAmount: '', // Unchanged: loan amount field
      loanType: '', // Added: loan type select value
      loanPurpose: '', // Unchanged: loan purpose field
      loanStatus: '', // Added: loan status select value
      installment: '', // Added: number of months for installments
      emi: '' // Added: monthly EMI amount
      // employment: '', // Removed: employment field per request
      // income: '' // Removed: annual income field per request
    } // Added: closing brace for else condition
  ); // Modified: closing for conditional state initialization

  // State to track validation errors for each field
  const [errors, setErrors] = useState({});
  // State to track if form has been submitted (to show errors)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false); // Added: track reject confirmation dialog state
  const [showDocumentUpload, setShowDocumentUpload] = useState(false); // Added: track document upload modal state
  const [uploadedFiles, setUploadedFiles] = useState([]); // Added: track uploaded files

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
      
      case 'loanType': // Added: validate new Loan Type field
        // Ensure user selected a loan type // Added
        return value !== '' ? '' : 'Please select a loan type'; // Added
      
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

  // Modified: Handle reject button click (renamed from cancel)
  const handleReject = () => { // Modified: renamed from handleCancel to handleReject
    setShowRejectDialog(true); // Modified: show reject confirmation dialog
  };

  // Added: Handle accept button click (renamed from submit)
  const handleAccept = () => { // Added: function to handle accept button
    setShowDocumentUpload(true); // Added: show document upload modal
  };

  // Added: Handle file upload
  const handleFileUpload = (event) => { // Added: function to handle file selection
    const files = Array.from(event.target.files); // Added: convert FileList to array
    setUploadedFiles(prevFiles => [...prevFiles, ...files]); // Added: add new files to existing files
  };

  // Added: Handle file drop
  const handleFileDrop = (event) => { // Added: function to handle drag and drop
    event.preventDefault(); // Added: prevent default browser behavior
    const files = Array.from(event.dataTransfer.files); // Added: get dropped files
    setUploadedFiles(prevFiles => [...prevFiles, ...files]); // Added: add dropped files to existing files
  };

  // Added: Handle drag over
  const handleDragOver = (event) => { // Added: function to handle drag over event
    event.preventDefault(); // Added: prevent default to allow drop
  };

  // Added: Remove uploaded file
  const removeFile = (index) => { // Added: function to remove file from upload list
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index)); // Added: remove file at specific index
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
              <label className="LoanAccounts-label">Type of Loan *</label> {/* Modified: changed from Loan Purpose to Type of Loan */}
              <select
                name="loanType" // Modified: changed from loanPurpose to loanType
                value={formData.loanType || ''} // Modified: use loanType field with fallback
                onChange={handleInputChange}
                className={`LoanAccounts-select ${errors.loanType ? 'LoanAccounts-select--error' : ''}`} // Modified: check loanType errors
                required
              >
                <option value="">Select Type</option> {/* Modified: changed placeholder text */}
                <option value="Home">Home</option> {/* Modified: capitalized and simplified options */}
                <option value="Car">Car</option> {/* Modified: capitalized and simplified options */}
                <option value="Business">Business</option> {/* Modified: capitalized and simplified options */}
                <option value="Education">Education</option> {/* Modified: capitalized and simplified options */}
                <option value="Other">Other</option> {/* Added: new option */}
              </select>
              {/* Display error message if validation fails */}
              {errors.loanType && <span className="LoanAccounts-error">{errors.loanType}</span>} {/* Modified: show loanType errors */}
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

          <div className="LoanAccounts-actions-Loan-record-app"> {/* Modified: updated className with suffix */}
            <button
              type="button"
              className="LoanAccounts-button-Loan-record-app LoanAccounts-button--reject-Loan-record-app" // Modified: updated className for reject button
              onClick={handleReject} // Modified: changed from handleCancel to handleReject
            >
              Reject {/* Modified: changed text from Cancel to Reject */}
            </button>
            <button
              type="button" // Modified: changed from submit to button to prevent form submission
              className="LoanAccounts-button-Loan-record-app LoanAccounts-button--accept-Loan-record-app" // Modified: updated className for accept button
              onClick={handleAccept} // Modified: changed to handleAccept function
            >
              Accept {/* Modified: changed text from Submit Application to Accept */}
            </button>
          </div>
        </form>

        {/* Modified: Reject Confirmation Dialog */}
        {showRejectDialog && ( // Modified: changed from showConfirmDialog to showRejectDialog
          <div className="LoanAccounts-overlay-Loan-record-app"> {/* Modified: updated className with suffix */}
            <div className="LoanAccounts-dialog-Loan-record-app"> {/* Modified: updated className with suffix */}
              <div className="LoanAccounts-dialog-header-Loan-record-app"> {/* Modified: updated className with suffix */}
                <h3>Do you really want to go back?</h3> {/* Modified: changed dialog title */}
                <button 
                  className="LoanAccounts-close-button-Loan-record-app" // Modified: updated className with suffix
                  onClick={() => setShowRejectDialog(false)} // Modified: close reject dialog
                  aria-label="Close dialog" // Added: accessibility label
                >
                  ×
                </button>
              </div>
              <div className="LoanAccounts-dialog-content-Loan-record-app"> {/* Modified: updated className with suffix */}
                <div className="LoanAccounts-dialog-actions-Loan-record-app"> {/* Modified: updated className with suffix */}
                  <button
                    type="button"
                    className="LoanAccounts-button-Loan-record-app LoanAccounts-button--secondary-Loan-record-app" // Modified: updated className with suffix
                    onClick={() => setShowRejectDialog(false)} // Modified: stay on form
                  >
                    Stay on Form {/* Added: stay on form button text */}
                  </button>
                  <button
                    type="button"
                    className="LoanAccounts-button-Loan-record-app LoanAccounts-button--primary-Loan-record-app" // Modified: updated className with suffix
                    onClick={() => {
                      setShowRejectDialog(false); // Modified: close reject dialog
                      if (onCancel) onCancel(); // Added: execute cancel if provided
                    }}
                  >
                    Yes, Go Back {/* Modified: changed button text */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Added: Document Upload Modal */}
        {showDocumentUpload && ( // Added: conditional rendering of document upload modal
          <div className="LoanAccounts-overlay-Loan-record-app"> {/* Added: overlay for document upload */}
            <div className="document-upload-modal-Loan-record-app"> {/* Added: document upload modal container */}
              <div className="document-upload-header-Loan-record-app"> {/* Added: modal header */}
                <h3>Upload Documents</h3> {/* Added: modal title */}
                <button 
                  className="LoanAccounts-close-button-Loan-record-app" // Added: close button styling
                  onClick={() => setShowDocumentUpload(false)} // Added: close upload modal
                  aria-label="Close upload modal" // Added: accessibility label
                >
                  ×
                </button>
              </div>
              <div className="document-upload-content-Loan-record-app"> {/* Added: upload content area */}
                <div 
                  className="drag-drop-area-Loan-record-app" // Added: drag and drop area
                  onDrop={handleFileDrop} // Added: handle file drop
                  onDragOver={handleDragOver} // Added: handle drag over
                >
                  <p>Drag & drop multiple documents here</p> {/* Added: drag drop instruction */}
                  <p>or</p> {/* Added: separator text */}
                  <input
                    type="file"
                    id="file-upload-Loan-record-app" // Added: file input ID
                    multiple // Added: allow multiple file selection
                    onChange={handleFileUpload} // Added: handle file selection
                    style={{ display: 'none' }} // Added: hide default file input
                  />
                  <label 
                    htmlFor="file-upload-Loan-record-app" // Added: label for file input
                    className="browse-button-Loan-record-app" // Added: browse button styling
                  >
                    Browse Files {/* Added: browse button text */}
                  </label>
                </div>
                
                {/* Added: Display uploaded files */}
                {uploadedFiles.length > 0 && ( // Added: conditional rendering of file list
                  <div className="uploaded-files-Loan-record-app"> {/* Added: uploaded files container */}
                    <h4>Uploaded Files:</h4> {/* Added: files section title */}
                    <ul> {/* Added: files list */}
                      {uploadedFiles.map((file, index) => ( // Added: iterate through uploaded files
                        <li key={index} className="file-item-Loan-record-app"> {/* Added: file list item */}
                          <span>{file.name}</span> {/* Added: display file name */}
                          <button 
                            className="remove-file-button-Loan-record-app" // Added: remove file button
                            onClick={() => removeFile(index)} // Added: remove file on click
                          >
                            Remove {/* Added: remove button text */}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="document-upload-actions-Loan-record-app"> {/* Added: upload modal actions */}
                  <button
                    type="button"
                    className="LoanAccounts-button-Loan-record-app LoanAccounts-button--secondary-Loan-record-app" // Added: cancel button styling
                    onClick={() => {
                      setShowDocumentUpload(false); // Added: close upload modal
                      setUploadedFiles([]); // Added: clear uploaded files
                    }}
                  >
                    Cancel {/* Added: cancel upload button */}
                  </button>
                  <button
                    type="button"
                    className="LoanAccounts-button-Loan-record-app LoanAccounts-button--primary-Loan-record-app" // Added: submit button styling
                    onClick={() => {
                      // Added: handle document submission
                      console.log('Documents submitted:', uploadedFiles); // Added: log submitted files
                      setShowDocumentUpload(false); // Added: close upload modal
                      setUploadedFiles([]); // Added: clear uploaded files
                      if (onCancel) onCancel(); // Added: close parent modal if in modal mode
                    }}
                  >
                    Submit {/* Added: submit documents button */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanAccounts;