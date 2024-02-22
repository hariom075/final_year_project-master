let cart = [];
let total = 0;

function addToCart(productName, price, imageURL) {
  const quantity = 1; // You can set a default quantity here if needed

  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: quantity, image: imageURL });
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    // Quantity section
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.className = 'quantity-button decrease';
    decreaseButton.onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      }
    };
    
    

    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = item.quantity;
    quantityDisplay.classList.add('quantity-display');

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.className = 'quantity-button increase';
    increaseButton.onclick = () => {
      item.quantity++;
      updateCart();
    };


    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityDisplay);
    quantityContainer.appendChild(increaseButton);

    // Rest of the item details
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = item.name;
    itemElement.appendChild(imageElement);

    const detailsElement = document.createElement('div');
    detailsElement.classList.add('item-details');

    const nameElement = document.createElement('p');
    nameElement.textContent = item.name;
    detailsElement.appendChild(nameElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = `${item.price.toFixed(2)}`;
    detailsElement.appendChild(priceElement);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => removeItem(index);
    detailsElement.appendChild(removeButton);

    itemElement.appendChild(quantityContainer);
    itemElement.appendChild(detailsElement);

    cartItemsElement.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}



function checkout() {
  
  // Generate UPI QR code using the payment gateway SDK
  var paymentAmount = parseFloat(document.getElementById('cart-total').innerText);
  var upiId = '6378367800@paytm'; // Replace with your actual UPI ID
  var qrCode = paymentGateway.generateUPIQRCode(paymentAmount, upiId);

  // Display the QR code to the user
  document.getElementById('qr-code-container').innerHTML = qrCode;
}

