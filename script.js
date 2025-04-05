document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceElement = document.querySelector('.total-price');
    
    let cart = [];
    
    // باز و بسته کردن سبد خرید
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // افزودن آیتم به سبد خرید
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            
            // بررسی آیا آیتم قبلاً در سبد خرید وجود دارد یا نه
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1
                });
            }
            
            updateCart();
        });
    });
    
    // به‌روزرسانی سبد خرید
    function updateCart() {
        renderCartItems();
        updateCartCount();
        updateTotalPrice();
    }
    
    // نمایش آیتم‌های سبد خرید
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} تومان × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">حذف</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // اضافه کردن ایونت لیسنر برای دکمه‌های حذف
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
    
    // به‌روزرسانی تعداد آیتم‌های سبد خرید
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // محاسبه و نمایش جمع کل
    function updateTotalPrice() {
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} تومان`;
    }
    
    // تکمیل سفارش
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('سبد خرید شما خالی است!');
        } else {
            alert(`سفارش شما با مبلغ ${totalPriceElement.textContent} ثبت شد!`);
            cart = [];
            updateCart();
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});
// در ابتدای فایل script.js
const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
    // آیتم‌های پیش‌فرض
    {
        name: "برگر ویژه",
        desc: "برگر گوشت با پنیر چدار، کاهو و سس مخصوص",
        price: 290000,
        image: "burger.jpg"
    }
];