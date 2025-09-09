(function () {
  'use strict';

  const contactsTable = document.querySelector('#contactsTable tbody');
  const firstInput = document.querySelector('#first');
  const lastInput = document.querySelector('#last');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const addContactForm = document.querySelector('#addContactForm');

  const contacts = [];

  addContactForm.addEventListener('submit', e => {
    e.preventDefault();

    if (! contacts.length) {
      contactsTable.deleteRow(0);
    }

    const newContact = {
      first: firstInput.value,
      last: lastInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    contacts.push(newContact);

    /*const newRow = document.createElement('tr');
    const firstCell = document.createElement('td');
    firstCell.innerText = 'Donald';
    newRow.appendChild(firstCell);
    contactsTable.appendChild(newRow);*/

    const row = contactsTable.insertRow();
    /*const first = row.insertCell();
    first.innerText = 'Donald';
    const last = row.insertCell();
    last.innerText = 'Trump';*/

    row.innerHTML = `<td>${newContact.first}</td>
                     <td>${newContact.last}</td>
                     <td>${newContact.email}</td>
                     <td>${newContact.phone}</td>`;

    /*firstInput.value = '';
    lastInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';*/

    addContactForm.reset();
  });

}());
