'use strict';
// DOM elements selection
const navLinks = document.querySelectorAll('.navlink');
const thumbImages = document.querySelectorAll('.modal-image');
const sectionHero = document.querySelector('#section--0');
const minus = document.querySelector('.minus');
const currentPairs = Number(document.querySelector('.no--pairs').textContent);
const plus = document.querySelector('.plus');
const cartModal = document.querySelector('.cart--modal');
const filledCart = document.querySelector('.filled-cart');
const closeModals = document.querySelectorAll('.closeModal');

const photoSlides = document.querySelectorAll('.photo-slides');
const photoThumbs = document.querySelectorAll('.thumbnails');

console.log(currentPairs);

//Nav-cart modal opening and closing
const showCartModal = function (modalName) {
  modalName.classList.remove('hidden');
};
const closeModal = function () {
  cartModal.classList.add('hidden');
  filledCart.classList.add('hidden');
};

// updating cart status

let cartEmpty = true;

// Changing active states on clicked thumbnail images
const toggle = function (img) {
  const currentActive = document.querySelector('.active');
  currentActive.classList.remove('active');
  img.classList.add('active');
};

// Adding and substracting number of shoes
let count;

const updateCount = function (count) {
  document.querySelector('.no--pairs').innerHTML = count;
};

minus.addEventListener('click', function (e) {
  count = Number(document.querySelector('.no--pairs').innerHTML);
  //   count = currentPairs;
  if (count >= 1) {
    count--;
  } else if ((count = 0)) {
    count = count;
  } else {
    return;
  }

  updateCount(count);
  return count;
});

plus.addEventListener('click', function (e) {
  count = Number(document.querySelector('.no--pairs').innerHTML);
  //   count = currentPairs;
  count++;

  updateCount(count);
  return count;
});

let price = 125.0;
document
  .querySelector('.btn--addtocart')
  .addEventListener('click', function (e) {
    if (count) {
      document.querySelector('.empty--cart').classList.add('hidden');
      console.log(count);
      document.querySelector('.itemCartBtn').innerHTML = count;
      document.querySelector('.itemCartBtn').classList.remove('hidden');
      document.querySelector(
        '.filled-cart'
      ).innerHTML = `<h1 class="cartheading">Cart</h1><span class="closeModal">&times;</span>
      <div class="container cart-divider"></div>
      <div class="cart-filled"><div><img class="modal-image" src="images/image-product-1-thumbnail.jpg" alt=""></div>
      <div class="desc-cart"><p>Fall Limited sneakers</p>
      <p>$${price.toFixed(2)} x ${count} <span><b>$${(price * count).toFixed(
        2
      )}</b></span></p>
        </div>
        <div class="delete"><img src="images/delete.svg" alt=""></div>
        </div>
        
        <button class="checkout--btn" type="button">Checkout</button>`;

      // filledCart.classList.add('hidden');
      document
        .querySelector('.closeModal')
        .addEventListener('click', function () {
          console.log('hi');
          closeModal();
        });
    } else if (!count) {
      document.querySelector('.empty--cart').classList.remove('hidden');
    }
  });

document.querySelector('.navcart').addEventListener('click', function (e) {
  console.log(e.target);
  if (count) {
    showCartModal(filledCart);
  } else {
    showCartModal(cartModal);
  }
});

for (let i = 0; i < closeModals.length; i++) {
  closeModals[i].addEventListener('click', closeModal);
}

document.body.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Opening modal
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
// snext and previous

document.querySelector('.previous').addEventListener('click', function () {
  slidePlus(-1);
});
document.querySelector('.next').addEventListener('click', function () {
  slidePlus(1);
});
