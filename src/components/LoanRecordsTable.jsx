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

  // Modified: Initial loan data with hardcoded values and tenure
  const initialLoanData = [ // Modified: renamed to indicate initial data
    {
      id: 'LN-001', // Added: structured loan ID format
      firstName: 'John', // Added: sample first name
      lastName: 'Smith', // Added: sample last name
      email: 'john.smith@email.com', // Added: sample email
      phone: '+1234567890', // Added: sample phone
      loanType: 'Home', // Modified: hardcoded loan type, no dropdown
      amount: 500000, // Added: sample loan amount
      loanPurpose: 'home', // Added: corresponds to form purpose field
      tenure: 12, // Modified: replaced status with tenure in months
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
      loanType: 'Car', // Modified: hardcoded loan type, no dropdown
      amount: 750000, // Added: different loan amount
      loanPurpose: 'car', // Added: corresponds to form purpose field
      tenure: 15, // Modified: replaced status with tenure in months
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
      loanType: 'Business', // Modified: hardcoded loan type, no dropdown
      amount: 1200000, // Added: larger business loan amount
      loanPurpose: 'business', // Added: corresponds to form purpose field
      tenure: 25, // Modified: replaced status with tenure in months
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
      loanType: 'Education', // Modified: hardcoded loan type, no dropdown
      amount: 300000, // Added: smaller education loan amount
      loanPurpose: 'education', // Added: corresponds to form purpose field
      tenure: 18, // Modified: replaced status with tenure in months
      loanStatus: 'approved', // Added: lowercase for form field
      installment: '84', // Added: education loan term
      emi: '4500' // Added: education loan EMI
    }
  ];

  // Initialize loans state with initial data
  React.useEffect(() => { // Added: initialize loans state on component mount
    setLoans(initialLoanData); // Added: set initial loan data to state
  }, []); // Added: empty dependency array to run once on mount

  // Removed: Function to handle loan type change in dropdown - no longer needed
  // const handleLoanTypeChange = (loanId, newType) => { // Deleted: removed dropdown functionality
  //   setLoans(prevLoans => // Deleted: no longer updating loan type via dropdown
  //     prevLoans.map(loan => // Deleted: iteration no longer needed
  //       loan.id === loanId // Deleted: loan ID check removed
  //         ? { ...loan, loanType: newType, loanPurpose: newType.toLowerCase() } // Deleted: loan type update removed
  //         : loan // Deleted: return unchanged loan removed
  //     )
  //   );
  // }; // Deleted: entire function removed

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
    <div className="loan-records-container-Loan-record-app"> {/* Modified: updated className with suffix */}
      <div className="loan-records-header-Loan-record-app"> {/* Modified: updated className with suffix */}
        <button 
          className="back-button-Loan-record-app" // Added: back button for navigation
          onClick={() => {
            // Added: dummy navigation - navigate to random page
            window.location.href = '/random-page'; // Added: placeholder navigation
          }}
        >
          ← Back {/* Added: back arrow and text */}
        </button>
        <h1 className="loan-records-title-Loan-record-app">Loan Records</h1> {/* Modified: updated className with suffix */}
        <p className="loan-records-subtitle-Loan-record-app">Click on any row to view loan details</p> {/* Modified: updated className with suffix */}
      </div>

      <div className="table-container-Loan-record-app"> {/* Modified: updated className with suffix */}
        <table className="loan-records-table-Loan-record-app"> {/* Modified: updated className with suffix */}
          <thead> {/* Added: table header section */}
            <tr> {/* Added: header row */}
              <th>Loan ID</th> {/* Added: loan ID column header */}
              <th>Type of Loan</th> {/* Modified: loan type column header - no dropdown */}
              <th>Amount</th> {/* Added: amount column header */}
              <th>Tenure (in months)</th> {/* Modified: replaced Status with Tenure header */}
              <th>Action</th> {/* Added: new Action column header */}
            </tr>
          </thead>
          <tbody> {/* Added: table body section */}
            {loans.map((loan) => ( // Modified: iterate through loans state instead of static data
              <tr 
                key={loan.id} // Added: unique key for React rendering
                className="table-row-Loan-record-app" // Modified: updated className with suffix
              >
                <td className="loan-id-Loan-record-app" onClick={() => handleRowClick(loan)}>{loan.id}</td> {/* Modified: updated className with suffix */}
                <td className="loan-type-cell-Loan-record-app" onClick={() => handleRowClick(loan)}> {/* Modified: removed dropdown, hardcoded value, updated className */}
                  {loan.loanType} {/* Modified: simple text display instead of dropdown */}
                </td>
                <td className="loan-amount-Loan-record-app" onClick={() => handleRowClick(loan)}>{formatAmount(loan.amount)}</td> {/* Modified: updated className with suffix */}
                <td className="loan-tenure-Loan-record-app" onClick={() => handleRowClick(loan)}> {/* Modified: replaced status with tenure, updated className */}
                  {loan.tenure} months {/* Modified: display tenure in months */}
                </td>
                <td className="loan-action-Loan-record-app" onClick={() => handleRowClick(loan)}> {/* Added: new Action column cell */}
                  {/* Added: empty/null action column as requested */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal popup for loan application form */}
      {isModalOpen && ( // Added: conditional rendering of modal when open
        <div className="modal-overlay-Loan-record-app" onClick={handleCloseModal}> {/* Modified: updated className with suffix */}
          <div className="modal-content-Loan-record-app" onClick={(e) => e.stopPropagation()}> {/* Modified: updated className with suffix */}
            <div className="modal-header-Loan-record-app"> {/* Modified: updated className with suffix */}
              <h2>Loan Application Details</h2> {/* Added: modal title */}
              <button 
                className="modal-close-button-Loan-record-app" // Modified: updated className with suffix
                onClick={handleCloseModal} // Added: close modal on button click
                aria-label="Close modal" // Added: accessibility label
              >
                ×
              </button>
            </div>
            <div className="modal-body-Loan-record-app"> {/* Modified: updated className with suffix */}
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