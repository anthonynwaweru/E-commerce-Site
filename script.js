'use strict';
// DOM elements selection
const navLinks = document.querySelectorAll('.navlink');
const thumbImages = document.querySelectorAll('.modal-image');
const sectionHero = document.querySelector('#section--0');
const minus = document.querySelector('.minus');
const currentPairs = Number(document.querySelector('.no--pairs').textContent);
const plus = document.querySelector('.plus');
const emptyCartModal = document.querySelector('.empty--cart');
const filledCart = document.querySelector('.filled-cart');
const closeModals = document.querySelectorAll('.closeModal');

const photoSlides = document.querySelectorAll('.photo-slides');
const photoThumbs = document.querySelectorAll('.thumbnails');

// console.log(currentPairs);

// Opening image modal
const openModal = function () {
  document.querySelector('.my-modal').style.display = 'block';
};

// closing modal
const modalClose = function () {
  document.querySelector('.my-modal').style.display = 'none';
};
document.body.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelector('.my-modal').style.display = 'none';
  }
});

document.querySelector('.close-modal').addEventListener('click', modalClose);

// index for first slide
let slideindex;
// slide control
const slidePlus = function (n) {
  showSlides((slideindex += n));
};

// thumbnail control
const currSlide = function (n) {
  showSlides((slideindex = n));
};

// showing slides and closing slides as well

const showSlides = function (n) {
  if (n > photoSlides.length) {
    slideindex = 1;
  }
  if (n < 1) {
    slideindex = photoSlides.length;
  }

  for (let i = 0; i < photoSlides.length; i++) {
    photoSlides[i].style.display = 'none';
  }

  for (let i = 0; i < photoThumbs.length; i++) {
    photoThumbs[i].classList.remove('active');
  }
  // document.querySelector('.main-image').src = `images/image-product-${
  //   slideindex - 1
  // }.jpg`;
  photoSlides[slideindex - 1].style.display = 'block';
  photoThumbs[slideindex - 1].classList.add('active');
};

for (let i = 0; i < thumbImages.length; i++) {
  thumbImages[i].addEventListener('click', function () {
    console.log(thumbImages[i]);

    openModal();
    currSlide(i + 1);
  });
}

for (let i = 0; i < photoThumbs.length; i++) {
  photoThumbs[i].addEventListener('click', function () {
    currSlide(i + 1);
  });
}
// next and previous sliders

document.querySelector('.previous').addEventListener('click', function () {
  slidePlus(-1);
});
document.querySelector('.next').addEventListener('click', function () {
  slidePlus(1);
});

const mobileSlides = document.querySelectorAll('.main-image');
const mainPhoto = document.getElementById('mainPhoto');
let currMoSlide = 1;

// Mobile slider
document
  .querySelector('.previous-mobile')
  .addEventListener('click', function () {
    if (currMoSlide >= 1) currMoSlide--;
    mainPhoto.src = `images/image-product-${currMoSlide}.jpg`;
    // mobileSliderComponent();
    if (currMoSlide < 1) {
      currMoSlide = 4;

      mainPhoto.src = `images/image-product-${currMoSlide}.jpg`;
    }
  });

document.querySelector('.next-mobile').addEventListener('click', function () {
  if (currMoSlide <= 4 || currMoSlide === 0) {
    currMoSlide++;
    console.log(currMoSlide);
    mainPhoto.src = `images/image-product-${currMoSlide}.jpg`;
  }
  if (currMoSlide > 4) {
    currMoSlide = 1;
    mainPhoto.src = `images/image-product-${currMoSlide}.jpg`;
  }
});

// updating counter
let count = 0;
let totalAmount = 0;

const updateCount = function (n) {
  if (n > 1) {
    document.querySelector('.minus').classList.remove('hidden');
    document.querySelector('.no--pairs').innerHTML = n;
  }
  if (Number(n) === 1) {
    document.querySelector('.minus').classList.add('hidden');
    document.querySelector('.no--pairs').innerHTML = n;
  } else {
    document.querySelector('.no--pairs').textContent = n;
  }
};

//minus
minus.addEventListener('click', function () {
  if (count > 1) {
    count--;
    updateCount(count);
  }
});
//add
plus.addEventListener('click', function () {
  if (count > 1) {
    document.querySelector('.minus').classList.remove('hidden');
  } else if (count === 1) {
    document.querySelector('.minus').classList.add('hidden');
  }
  count += 1;

  updateCount(count);
});

// adding items to cart and Setting cart state
let cartState;
let shoesBought = 0;

document
  .querySelector('.btn--addtocart')
  .addEventListener('click', function () {
    // let totalAmount;
    let price = 125.0;
    count = Number(document.querySelector('.no--pairs').textContent);
    if (count >= 1) {
      shoesBought += count;
      totalAmount = totalAmount + price * shoesBought;
      document.querySelector(
        '.filled-cart'
      ).innerHTML = `<h1 class="cartheading">Cart</h1><span class="closeModal">&times;</span>
      <div class="container cart-divider"></div>
      <div class="cart-filled"><div><img class="modal-image" src="images/image-product-1-thumbnail.jpg" alt=""></div>
        <div class="desc-cart"><p>Fall Limited sneakers</p>
          <p>$${price.toFixed(2)} x ${count} <span><b>${totalAmount.toFixed(
        2
      )}</b></span></p>
        </div>
        <div ><img class="delete" src="images/delete.svg" alt=""></div>
      </div>
      
        <button class="checkout--btn" type="button">Checkout</button>`;
      // count = updateCount(count);
      document.querySelector('.itemCartBtn').innerHTML = shoesBought;
      document.querySelector('.itemCartBtn').classList.remove('hidden');
    }
  });

document.querySelector('.navcart').addEventListener('click', function () {
  console.log(count);
  console.log(document.querySelector('.itemCartBtn'));
  if (Number(document.querySelector('.itemCartBtn').textContent) === 0) {
    emptyCartModal.classList.remove('hidden');
    emptyCartModal.addEventListener('click', function (e) {
      if (e.target.classList.contains('closeModal')) {
        emptyCartModal.classList.add('hidden');
      }
    });
    setTimeout(function () {
      emptyCartModal.classList.add('hidden');
    }, 3000);
  }
  if (Number(document.querySelector('.itemCartBtn').textContent) === 0) {
    cartState = true;
  } else {
    cartState = false;
  }
  if (!cartState) filledCart.classList.remove('hidden');
});

document.querySelector('.filled-cart').addEventListener('click', function (e) {
  if (e.target.classList.contains('closeModal')) {
    filledCart.classList.add('hidden');
  }
  if (e.target.classList.contains('delete')) {
    count = 1;
    shoesBought = 0;
    updateCount(count);
    document.querySelector('.itemCartBtn').classList.add('hidden');
    filledCart.innerHTML = `<h1 class="cartheading">Cart</h1><span class="closeModal">&times;</span>
    <div class="container cart-divider"></div>
    <p class="empty--cart">Item removed from the cart.</p>`;
    setTimeout(function () {
      document.querySelector('.itemCartBtn').textContent = '0';
      filledCart.classList.add('hidden');
    }, 3000);
  }
  if (e.target.classList.contains('checkout--btn')) {
    count = 1;
    shoesBought = 0;
    updateCount(count);
    document.querySelector('.itemCartBtn').classList.add('hidden');
    filledCart.innerHTML = `<h1 class="cartheading" style="color: #ff7e1b;">Order Placed</h1><span class="closeModal">&times;</span>
    <div class="container cart-divider"></div>
    <p class="empty--cart" style="color: #ff7e1b;">Thank you for shopping at Sneakers.</p>`;
    setTimeout(function () {
      document.querySelector('.itemCartBtn').textContent = '0';
      filledCart.classList.add('hidden');
      // location.reload();
    }, 3000);
  }
});

// activating the hamburger menu

document.querySelector('.menu').addEventListener('click', function () {
  document.querySelector('.hamburger--menu').classList.remove('hidden');
});

document.querySelector('.menu-star').addEventListener('click', function () {
  document.querySelector('.hamburger--menu').classList.add('hidden');
});

// mobile slides
