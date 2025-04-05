document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.querySelector('.menu-items');
    const cartCount = document.querySelector('.cart-count');
    
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
        {
            id: 1,
            name: "برگر ویژه",
            desc: "برگر گوشت با پنیر چدار، کاهو و سس مخصوص",
            price: 290000,
            image: "burger.jpg"
        },
        {
            id: 2,
            name: "پیتزا پپرونی", 
            desc: "پیتزا با پپرونی، پنیر موزارلا و سس گوجه",
            price: 395000,
            image: "pepperoni-pizza.jpg"
        },
        {
            id: 3,
            name: "سیب زمینی سرخ کرده",
            desc: "سیب زمینی سرخ کرده ترد با سس مخصوص",
            price: 125000,
            image: "fries.jpg"
        },
        {
            id: 4,
            name: "پاستا آلفردو",
            desc: "پاستا با سس آلفردو، قارچ و پنیر پارمزان",
            price: 355000,
            image: "alfredo-pasta.jpg"
        }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderMenu() {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}" class="food-image">
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

    renderMenu();
    updateCartCount();
});
 
