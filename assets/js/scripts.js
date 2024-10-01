// Set the base URL for the API
const API_BASE_URL = 'http://localhost:5000'; // Update to match your backend's base URL

// Helper function to fetch with token
async function fetchWithToken(url, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No token found. Please login.');
    window.location.href = '/login.html';
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
}

// Login form submission logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard.html';
      } else {
        alert('Login failed: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Dashboard transactions logic
const dashboard = document.querySelector('#transactions-table');
if (dashboard) {
  document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login.html';
      return;
    }

    try {
      const data = await fetchWithToken('/api/transactions');
      const tbody = document.querySelector('#transactions-table tbody');
      if (data) {
        data.forEach((transaction) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${new Date(transaction.createdAt).toLocaleDateString()}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.description}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        alert('Failed to load transactions.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Signup form submission logic
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      } else {
        alert('Signup failed: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Helper function for API calls with token
async function fetchWithToken(url, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first!');
        window.location.href = '/login.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(API_BASE_URL + url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
}

// Submit support form
const supportForm = document.getElementById('support-form');
if (supportForm) {
    supportForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const issueType = document.getElementById('issue-type').value;
        const description = document.getElementById('description').value;

        try {
            const response = await fetchWithToken('/api/support', 'POST', { issueType, description });

            if (response) {
                alert('Support request submitted successfully.');
                window.location.reload();  // Reload to refresh the tickets
            } else {
                alert('Failed to submit the support request.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

// Fetch and display support tickets
const supportTicketsTable = document.getElementById('support-tickets-table');
if (supportTicketsTable) {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const tickets = await fetchWithToken('/api/support', 'GET');

            if (tickets && Array.isArray(tickets)) {
                const tbody = supportTicketsTable.querySelector('tbody');
                tbody.innerHTML = '';  // Clear any previous rows

                tickets.forEach((ticket) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${ticket.issueType}</td>
                        <td>${ticket.status}</td>
                        <td>${new Date(ticket.createdAt).toLocaleDateString()}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                alert('Failed to load support tickets.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


// Function to fetch with token
async function fetchWithToken(url, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first!');
        window.location.href = '/login.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(API_BASE_URL + url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
}

// Loan form submission
const loanForm = document.getElementById('loan-form');
if (loanForm) {
    loanForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loanType = document.getElementById('loan-type').value;
        const amount = document.getElementById('loan-amount').value;
        const repaymentPeriod = document.getElementById('repayment-period').value;

        try {
            const response = await fetchWithToken('/api/loans', 'POST', { loanType, amount, repaymentPeriod });

            if (response) {
                alert('Loan application submitted successfully.');
                window.location.reload();  // Refresh page to see updated loans
            } else {
                alert('Failed to submit loan application.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

// Fetch and display active loans
const activeLoansTable = document.getElementById('active-loans-table');
if (activeLoansTable) {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const loans = await fetchWithToken('/api/loans', 'GET');

            if (loans && Array.isArray(loans)) {
                const tbody = activeLoansTable.querySelector('tbody');
                tbody.innerHTML = '';  // Clear previous rows

                loans.forEach((loan) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${loan.loanType}</td>
                        <td>$${loan.amount.toLocaleString()}</td>
                        <td>${loan.status}</td>
                        <td>${new Date(loan.createdAt).toLocaleDateString()}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                alert('Failed to load active loans.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


// Function to fetch with token
async function fetchWithToken(url, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first!');
        window.location.href = '/login.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(API_BASE_URL + url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
}

// Deposit form submission
const depositForm = document.getElementById('deposit-form');
if (depositForm) {
    depositForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const depositAmount = document.getElementById('deposit-amount').value;
        const term = document.getElementById('term').value;

        try {
            const response = await fetchWithToken('/api/deposits', 'POST', { depositAmount, term });

            if (response) {
                alert('Fixed deposit created successfully.');
                window.location.reload();  // Refresh page to see updated deposits
            } else {
                alert('Failed to create deposit.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const deposits = await fetchWithToken('/api/deposits', 'GET');
    
    if (deposits && Array.isArray(deposits)) {
      const tbody = document.querySelector('#deposits-table tbody');
      tbody.innerHTML = '';  // Clear previous rows

      deposits.forEach((deposit) => {
        const row = document.createElement('tr');
        
        // Correctly format maturity date (adjust to the desired format)
        const formattedDate = new Date(deposit.maturityDate).toLocaleDateString('en-GB');
        
        row.innerHTML = `
          <td>$${deposit.depositAmount.toLocaleString()}</td>
          <td>${deposit.interestRate}%</td>
          <td>${formattedDate}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      alert('Failed to load active deposits.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const transactionForm = document.getElementById('transactionForm');
  const transactionList = document.getElementById('transactionList');

  // Fetch transactions and display them in the table
  const fetchTransactions = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/api/transactions`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include the token
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const transactions = await response.json();

          // Clear the current table
          transactionList.innerHTML = '';

          // Populate the transaction table
          transactions.forEach(transaction => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td>${transaction.type}</td>
                  <td>$${transaction.amount}</td>
                  <td>$${transaction.balanceAfterTransaction}</td>
              `;
              transactionList.appendChild(row);
          });
      } catch (error) {
          console.error('Error fetching transactions:', error);
      }
  };

  // Handle new transaction submission
  transactionForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const amount = document.getElementById('amount').value;
      const type = document.getElementById('type').value;
      const description = document.getElementById('description').value;

      try {
          const response = await fetch(`${API_BASE_URL}/api/transactions`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include token in POST
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount, type, description }),
          });

          if (response.ok) {
              transactionForm.reset();  // Clear form
              fetchTransactions();  // Refresh transaction list
          } else {
              console.error('Failed to create transaction');
          }
      } catch (error) {
          console.error('Error submitting transaction:', error);
      }
  });

  // Fetch transactions on page load
  fetchTransactions();
});
