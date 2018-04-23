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
var countrySelector = document.getElementById('country');
var country = countrySelector.options[countrySelector.selectedIndex].innerHTML;
var shippingInfo = '';

var outputTag = document.getElementById('shippinginfo');

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

document.querySelector('#name').addEventListener("blur", function(){
  name = document.querySelector('#name').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#email').addEventListener("blur", function(){
  email = document.getElementById('email').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#address').addEventListener("blur", function(){
  address = document.getElementById('address').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#address2').addEventListener("blur", function(){
  address2 = document.getElementById('address2').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#city').addEventListener("blur", function(){
  city = document.getElementById('city').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#state').addEventListener("blur", function(){
  state = document.getElementById('state').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})
document.querySelector('#zip').addEventListener("blur", function(){
  zip = document.getElementById('zip').value;
  var shippingInfo =
  `${name}
  ${email}
  ${address} ${address2}
  ${city} ${state} ${zip}
  ${country}`;
  outputTag.innerHTML = shippingInfo;
})

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
    document.querySelector('form').remove();
    document.querySelector('main').innerHTML =
      `<section>
      <h1>Order Completed</h1>
      <h2>Order Summary</h2>
      <h3>Shipping Address</h3>
      <p>${name}
      ${email}
      ${address} ${address2}
      ${city} ${state} ${zip}
      ${country}</p>
      <img src="circle-check.svg" alt="a blue checkmark">
      </section>`;
    }
})
