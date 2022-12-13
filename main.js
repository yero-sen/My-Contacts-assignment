// My Contacts Basic - Advanced Version

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    displayByEmail();
  } else if (selection === 'remove-all') {
    removeAllC();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = '';
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i]);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let contactEmail = prompt("Enter the contact's email:");
  for (let i = 0; i < contacts.length; i++) {
    if (contactEmail === contacts[i].email) {
      alert('Email already in use.');
      contactEmail = prompt("Enter a different email:");
    }
  }
  let contactPhone = prompt("Enter the contact's phone number:");
  let contactName = prompt("Enter the contact's name:");
  let contactCountry = prompt("Enter the contact's country:");
  contacts.push(newContact(contactEmail, contactPhone, contactName, contactCountry));
  saveContacts();
}

function removeContact() {
  let emailRemSearch = prompt('Enter contact email:');
  for (let i = 0; i < contacts.length; i++) {
    if (emailRemSearch === contacts[i].email) {
      contacts.splice(i, 1);
      saveContacts();
      break;
    } else {
      alert('Invalid Contact email');
    }
  }
}

function displayByName() {
  let searchName = prompt("Enter the contact's name:");
  searchName = searchName.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (searchName == contacts[i].name.toLowerCase()) {
      outputEl.innerHTML = getContactHTMLStr(contacts[i]);
      break;
    }
  }
}

function displayByCountry() {
  let searchCountry = prompt("Enter the contact's country:");
  searchCountry = searchCountry.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (searchCountry == contacts[i].country.toLowerCase()) {
      outputEl.innerHTML = getContactHTMLStr(contacts[i]);
      break;
    }
  }
}

// Helper Functions
function newContact(emailC, phoneC, nameC, countryC) {
  return {
    email: emailC,
    phone: phoneC,
    name: nameC,
    country: countryC
  };
}

function getContactHTMLStr(contact) {
  return `
  <div>
    ${contact.name} <br>
    ${contact.email} <br>
    ${contact.phone}
    (${contact.country}) <br>
    <hr>
  </div>`
}

// Save global contacts to local storage
function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Load contacts from local storage
function loadContacts() {
  let contactStr = localStorage.getItem('contacts');
  return JSON.parse(contactStr) ?? [];
}

// Search the global contacts array for a contact with the provided email
function displayByEmail() {
  let searchEmail = prompt("Enter the contact's email:");
  for (let i = 0; i < contacts.length; i++) {
    if (searchEmail == contacts[i].email) {
      outputEl.innerHTML = getContactHTMLStr(contacts[i]);
      break;
    }
  }
}

function removeAllC() {
  contacts = [];
  saveContacts();
}
