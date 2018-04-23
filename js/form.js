// cache our inputs
const submit = document.querySelector('button');
var formInputs = document.getElementsByTagName('input');
var errorsPresent = false;

var name = '';
var email = '';
var address = '';
var address2 = '';
var city = '';
var state = '';
var zip = '';
var country = '';
var shippingInfo =
`${name}
${email}
${address} ${address2}
${city} ${state} ${zip}
${country}`;

// Create a validity class

class CheckValidity {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.errors = [];
  }

  addError(message) {
    this.errors.push(message);
  }

  getMessages() {
    const status = this.input.validity

    if (status.valueMissing) {
      this.addError('Required field');
    }

    if (status.tooLong) {
      this.addError('Entry is too long');
    }

    if (status.tooShort) {
      this.addError('Entry is too short');
    }

    if (this.type == "email" && !this.input.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
      this.addError('Invalid Email');
    }

    if (this.type == "zip" && !this.input.value.match(/^\d{5}(\-?\d{4})?$/gm)){
      this.addError('Invalid Zipcode');
    }

    return this.errors
  }

}



// Set up submit listener
submit.addEventListener("click", (event) => {
  event.preventDefault(); // this will stop the standard form submission.
  document.querySelectorAll('.error').forEach(function(a){
    a.remove()
  })
  errorsPresent = false;

  for (var i = 0; i < formInputs.length; i++) {
    var inputType = formInputs[i].id;
    let validateInput = new CheckValidity(formInputs[i], inputType);
    let errorMessages = validateInput.getMessages();

    if (errorMessages.length > 0) {
      errorsPresent = true;
      errorMessages.forEach( (err) => {
        formInputs[i].insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>')
      })
    }
  }
  if (!errorsPresent){
    document.querySelectorAll('.error').forEach(function(a){
      a.remove()
    })
  }

})
