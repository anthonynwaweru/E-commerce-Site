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

console.log(currentPairs);

// Opening image modal
const openModal = function () {
  document.querySelector('.my-modal').style.display = 'block';
};

// closing modal
const modalClose = function () {
  document.querySelector('.my-modal').style.display = 'none';
};

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

// updating counter
let count = 0;

const updateCount = function (count) {
  document.querySelector('.no--pairs').innerHTML = count;
};

//minus
minus.addEventListener('click', function () {
  if (count > 0) {
    count--;
    updateCount(count);
  } else if (count === 0) {
    return;
  }
});
//add
plus.addEventListener('click', function () {
  count++;
  updateCount(count);
});

// adding items to cart and Setting cart state
let cartState;

document
  .querySelector('.btn--addtocart')
  .addEventListener('click', function () {
    let totalAmount;
    let price = 125.0;
    if (count === 0) {
      emptyCartModal.classList.remove('hidden');
      setTimeout(function () {
        emptyCartModal.classList.add('hidden');
      }, 2000);
    }
    if (count > 0) {
      totalAmount = price * count;
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
        <div class="delete"><img src="images/delete.svg" alt=""></div>
      </div>
      
        <button class="checkout--btn" type="button">Checkout</button>`;
      document.querySelector('.itemCartBtn').innerHTML = count;
      document.querySelector('.itemCartBtn').classList.remove('hidden');
    }
  });

document.querySelector('.navcart').addEventListener('click', function () {
  console.log(count);
  if (count === 0) {
    cartState = false;
    if (!cartState) {
      emptyCartModal.classList.remove('hidden');
      setTimeout(function () {
        emptyCartModal.classList.add('hidden');
      }, 3000);
    }
  }
  if (count > 0) {
    cartState = true;
    if (cartState) filledCart.classList.remove('hidden');
  }
});

document.querySelector('.closeModal').addEventListener('click', function () {
  filledCart.classList.toggle('hidden');
});
