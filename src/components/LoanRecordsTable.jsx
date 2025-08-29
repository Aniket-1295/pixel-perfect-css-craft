import React, { useState } from 'react';
import LoanAccounts from './LoanAccounts.jsx'; // Import existing loan form component
import './LoanRecordsTable.css'; // Import CSS styles for table

const LoanRecordsTable = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // Added: track modal open/close state
  // State to store selected loan data for modal
  const [selectedLoan, setSelectedLoan] = useState(null); // Added: store clicked row data for pre-filling
  // State to store loan data with updated types
  const [loans, setLoans] = useState([]); // Added: state to manage loan data with dropdown changes

  // Initial loan data with structured IDs and realistic amounts
  const initialLoanData = [ // Modified: renamed to indicate initial data
    {
      id: 'LN-001', // Added: structured loan ID format
      firstName: 'John', // Added: sample first name
      lastName: 'Smith', // Added: sample last name
      email: 'john.smith@email.com', // Added: sample email
      phone: '+1234567890', // Added: sample phone
      loanType: 'Home', // Added: loan type from dropdown options
      amount: 500000, // Added: sample loan amount
      loanPurpose: 'home', // Added: corresponds to form purpose field
      status: 'Approved', // Added: loan status from dropdown options
      loanStatus: 'approved', // Added: lowercase for form field
      installment: '240', // Added: sample installment months
      emi: '2500' // Added: sample EMI amount
    },
    {
      id: 'LN-002', // Added: sequential structured ID
      firstName: 'Sarah', // Added: sample first name
      lastName: 'Johnson', // Added: sample last name  
      email: 'sarah.johnson@email.com', // Added: sample email
      phone: '+1987654321', // Added: sample phone
      loanType: 'Car', // Added: different loan type
      amount: 750000, // Added: different loan amount
      loanPurpose: 'car', // Added: corresponds to form purpose field
      status: 'Pending', // Added: different status
      loanStatus: 'pending', // Added: lowercase for form field
      installment: '60', // Added: shorter installment period
      emi: '15000' // Added: higher EMI amount
    },
    {
      id: 'LN-003', // Added: sequential structured ID
      firstName: 'Michael', // Added: sample first name
      lastName: 'Brown', // Added: sample last name
      email: 'michael.brown@email.com', // Added: sample email
      phone: '+1122334455', // Added: sample phone
      loanType: 'Business', // Added: business loan type
      amount: 1200000, // Added: larger business loan amount
      loanPurpose: 'business', // Added: corresponds to form purpose field
      status: 'Rejected', // Added: rejected status
      loanStatus: 'rejected', // Added: lowercase for form field
      installment: '120', // Added: medium-term installment
      emi: '12000' // Added: business loan EMI
    },
    {
      id: 'LN-004', // Added: sequential structured ID
      firstName: 'Emily', // Added: sample first name
      lastName: 'Davis', // Added: sample last name
      email: 'emily.davis@email.com', // Added: sample email
      phone: '+1556677889', // Added: sample phone
      loanType: 'Education', // Added: education loan type
      amount: 300000, // Added: smaller education loan amount
      loanPurpose: 'education', // Added: corresponds to form purpose field
      status: 'Approved', // Added: approved status
      loanStatus: 'approved', // Added: lowercase for form field
      installment: '84', // Added: education loan term
      emi: '4500' // Added: education loan EMI
    }
  ];

  // Initialize loans state with initial data
  React.useEffect(() => { // Added: initialize loans state on component mount
    setLoans(initialLoanData); // Added: set initial loan data to state
  }, []); // Added: empty dependency array to run once on mount

  // Function to handle loan type change in dropdown
  const handleLoanTypeChange = (loanId, newType) => { // Added: function to handle dropdown changes
    setLoans(prevLoans => // Added: update loans state with new loan type
      prevLoans.map(loan => // Added: iterate through loans to find and update
        loan.id === loanId // Added: check if this is the loan to update
          ? { ...loan, loanType: newType, loanPurpose: newType.toLowerCase() } // Added: update both display and form field values
          : loan // Added: return unchanged loan if not the target
      )
    );
  };

  // Function to handle row click and open modal
  const handleRowClick = (loan) => { // Added: function to handle table row clicks
    setSelectedLoan(loan); // Added: store selected loan data for form pre-filling
    setIsModalOpen(true); // Added: open modal when row is clicked
  };

  // Function to close modal
  const handleCloseModal = () => { // Added: function to handle modal closing
    setIsModalOpen(false); // Added: close modal
    setSelectedLoan(null); // Added: clear selected loan data
  };

  // Function to format amount with currency
  const formatAmount = (amount) => { // Added: utility function for currency formatting
    return new Intl.NumberFormat('en-US', { // Added: format numbers with commas and currency
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="loan-records-container"> {/* Added: main container for table component */}
      <div className="loan-records-header"> {/* Added: header section container */}
        <h1 className="loan-records-title">Loan Records</h1> {/* Added: main page title */}
        <p className="loan-records-subtitle">Click on any row to view loan details</p> {/* Added: instruction text */}
      </div>

      <div className="table-container"> {/* Added: container for responsive table */}
        <table className="loan-records-table"> {/* Added: main table element */}
          <thead> {/* Added: table header section */}
            <tr> {/* Added: header row */}
              <th>Loan ID</th> {/* Added: loan ID column header */}
              <th>Type of Loan</th> {/* Added: loan type column header */}
              <th>Amount</th> {/* Added: amount column header */}
              <th>Status</th> {/* Added: status column header */}
            </tr>
          </thead>
          <tbody> {/* Added: table body section */}
            {loans.map((loan) => ( // Modified: iterate through loans state instead of static data
              <tr 
                key={loan.id} // Added: unique key for React rendering
                className="table-row" // Added: CSS class for row styling
              >
                <td className="loan-id" onClick={() => handleRowClick(loan)}>{loan.id}</td> {/* Modified: loan ID cell with click handler */}
                <td className="loan-type-cell"> {/* Added: loan type cell with dropdown */}
                  <select 
                    className="loan-type-dropdown" // Added: CSS class for dropdown styling
                    value={loan.loanType} // Added: current loan type value
                    onChange={(e) => { // Added: handle dropdown change
                      e.stopPropagation(); // Added: prevent row click when dropdown changes
                      handleLoanTypeChange(loan.id, e.target.value); // Added: update loan type
                    }}
                    onClick={(e) => e.stopPropagation()} // Added: prevent row click when clicking dropdown
                  >
                    <option value="Home">Home</option> {/* Added: dropdown option */}
                    <option value="Car">Car</option> {/* Added: dropdown option */}
                    <option value="Business">Business</option> {/* Added: dropdown option */}
                    <option value="Education">Education</option> {/* Added: dropdown option */}
                    <option value="Other">Other</option> {/* Added: dropdown option */}
                  </select>
                </td>
                <td className="loan-amount" onClick={() => handleRowClick(loan)}>{formatAmount(loan.amount)}</td> {/* Modified: formatted amount cell with click handler */}
                <td className="loan-status" onClick={() => handleRowClick(loan)}> {/* Modified: status cell container with click handler */}
                  <span className={`status-badge status-${loan.status.toLowerCase()}`}> {/* Added: status badge with dynamic class */}
                    {loan.status} {/* Added: status text */}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal popup for loan application form */}
      {isModalOpen && ( // Added: conditional rendering of modal when open
        <div className="modal-overlay" onClick={handleCloseModal}> {/* Added: modal background overlay with click-to-close */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Added: modal content container with click event stop */}
            <div className="modal-header"> {/* Added: modal header container */}
              <h2>Loan Application Details</h2> {/* Added: modal title */}
              <button 
                className="modal-close-button" // Added: CSS class for close button
                onClick={handleCloseModal} // Added: close modal on button click
                aria-label="Close modal" // Added: accessibility label
              >
                ×
              </button>
            </div>
            <div className="modal-body"> {/* Added: modal body container for form */}
              <LoanAccounts 
                initialData={selectedLoan} // Added: pass selected loan data to form for pre-filling
                isModal={true} // Added: flag to indicate form is in modal mode
                onCancel={handleCloseModal} // Added: pass close function for cancel button
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanRecordsTable;