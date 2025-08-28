import React, { useState } from 'react';
import LoanAccounts from './LoanAccounts.jsx'; // Import existing loan form component
import './LoanRecordsTable.css'; // Import CSS styles for table

const LoanRecordsTable = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // Added: track modal open/close state
  // State to store selected loan data for modal
  const [selectedLoan, setSelectedLoan] = useState(null); // Added: store clicked row data for pre-filling

  // Sample loan data with structured IDs and realistic amounts
  const loanData = [ // Added: static sample data for table population
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
              <th>Customer Name</th> {/* Added: customer name column header */}
              <th>Type of Loan</th> {/* Added: loan type column header */}
              <th>Amount</th> {/* Added: amount column header */}
              <th>Status</th> {/* Added: status column header */}
            </tr>
          </thead>
          <tbody> {/* Added: table body section */}
            {loanData.map((loan) => ( // Added: iterate through loan data to create rows
              <tr 
                key={loan.id} // Added: unique key for React rendering
                className="table-row" // Added: CSS class for row styling
                onClick={() => handleRowClick(loan)} // Added: click handler to open modal with loan data
              >
                <td className="loan-id">{loan.id}</td> {/* Added: loan ID cell */}
                <td className="customer-name">{loan.firstName} {loan.lastName}</td> {/* Added: full customer name cell */}
                <td className="loan-type">{loan.loanType}</td> {/* Added: loan type cell */}
                <td className="loan-amount">{formatAmount(loan.amount)}</td> {/* Added: formatted amount cell */}
                <td className="loan-status"> {/* Added: status cell container */}
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