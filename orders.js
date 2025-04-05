
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const orderForm = document.getElementById('order-form');
    
    function renderCart() {
        cartContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString()} تومان</p>
                </div>
                <button onclick="removeItem(${index})">🗑️</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price;
        });
        
       
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `<strong>جمع کل: ${total.toLocaleString()} تومان</strong>`;
        cartContainer.appendChild(totalElement);
    }
    
    
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const order = {
            customer: {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            },
            items: cart,
            date: new Date().toLocaleString(),
            status: 'در انتظار پرداخت'
        };
        
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        alert(`سفارش شما با شماره #${orders.length} ثبت شد!`);
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
    
    window.removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };
    
    renderCart();
});
