document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-item-form');
    const itemsList = document.getElementById('menu-items-list');

   
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

   
    function renderItems() {
        itemsList.innerHTML = '';
        menuItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item-card';
            itemElement.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <span>${item.price.toLocaleString()} تومان</span>
                </div>
                <button onclick="deleteItem(${index})">حذف</button>
            `;
            itemsList.appendChild(itemElement);
        });
    }

  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newItem = {
            name: document.getElementById('item-name').value,
            desc: document.getElementById('item-desc').value,
            price: parseInt(document.getElementById('item-price').value),
            image: document.getElementById('item-image').value || 'default-food.jpg'
        };

        menuItems.push(newItem);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        renderItems();
        form.reset();
    });

 
    window.deleteItem = (index) => {
        menuItems.splice(index, 1);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        renderItems();
    };

    renderItems();
});
