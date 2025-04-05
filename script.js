// script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.querySelector('.menu-items');
    const cartCount = document.querySelector('.cart-count');
    
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
        {
            id: 1,
            name: "برگر ویژه",
            desc: "برگر گوشت با پنیر چدار، کاهو و سس مخصوص",
            price: 45000,
            image: "burger.jpg"
        },
        {
            id: 2,
            name: "پیتزا پپرونی",
            desc: "پیتزا با پپرونی، پنیر موزارلا و سس گوجه",
            price: 65000,
            image: "pizza.jpg"
        }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderMenu() {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="${item.image || 'default-food.jpg'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="item-footer">
                    <span>${item.price.toLocaleString()} تومان</span>
                    <button class="add-to-cart" data-id="${item.id}">افزودن به سبد</button>
                </div>
            `;
            menuContainer.appendChild(itemElement);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const selectedItem = menuItems.find(item => item.id === itemId);
                addToCart(selectedItem);
            });
        });
    }

    function addToCart(item) {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${item.name} به سبد خرید اضافه شد!`);
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // بارگذاری اولیه
    renderMenu();
    updateCartCount();

    // برای نسخه پیشرفته (اتصال به Firebase):
    // async function loadMenuFromFirebase() {
    //     const snapshot = await db.collection('menuItems').get();
    //     menuItems = snapshot.docs.map(doc => doc.data());
    //     renderMenu();
    // }
    // loadMenuFromFirebase();
});