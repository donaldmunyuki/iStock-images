// 1. The Data Source (Manual Database)
// You edit this list when you upload new files to your 'images' folder.
const imageData = [
    {
        id: 1,
        fileName: 'img1.jpg', // Make sure this matches your actual file name
        tags: ['nature', 'forest', 'green'],
        likes: 12
    },
    {
        id: 2,
        fileName: 'img2.jpg', 
        tags: ['tech', 'computer', 'work'],
        likes: 5
    },
    // Add more objects here as you add images
];

// Select DOM elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');

// 2. Function to display images
function renderGallery(images) {
    gallery.innerHTML = ''; // Clear current gallery

    if (images.length === 0) {
        gallery.innerHTML = '<p>No images found.</p>';
        return;
    }

    images.forEach(image => {
        // Create the card HTML structure
        const card = document.createElement('div');
        card.className = 'image-card';
        
        // We assume images are in the 'images/' folder
        const imagePath = `images/${image.fileName}`;

        card.innerHTML = `
            <img src="${imagePath}" alt="${image.tags.join(', ')}">
            <div class="card-details">
                <button class="btn like-btn" onclick="handleLike(${image.id})">
                    ❤️ <span id="likes-count-${image.id}">${image.likes}</span>
                </button>
                <a href="${imagePath}" download="${image.fileName}" class="btn download-btn">
                    ⬇ Download
                </a>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// 3. Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter the imageData array based on tags
    const filteredImages = imageData.filter(img => 
        img.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    renderGallery(filteredImages);
});

// 4. Like Functionality (Visual only for now)
window.handleLike = function(id) {
    const image = imageData.find(img => img.id === id);
    if (image) {
        image.likes++; // Increase count in memory
        
        // Update the number on the screen
        const countSpan = document.getElementById(`likes-count-${id}`);
        countSpan.innerText = image.likes;
        
        // Note: This resets when you refresh the page because 
        // we aren't using a real database server yet.
    }
};

// Initial Load
renderGallery(imageData);