// Callbacks
let currentRamen = null;

const handleClick = (ramen) => {
  currentRamen = ramen; // Store selected ramen

  const detailImage = document.querySelector(".detail-image");
  const nameDisplay = document.querySelector(".name");
  const restaurantDisplay = document.querySelector(".restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameDisplay.textContent = ramen.name;
  restaurantDisplay.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addDeleteListener = () => {
  const deleteButton = document.getElementById("delete-button");

  deleteButton.addEventListener("click", () => {
    if (!currentRamen) return;

    // Remove thumbnail from #ramen-menu
    const ramenImages = document.querySelectorAll("#ramen-menu img");
    ramenImages.forEach((img) => {
      if (img.src === currentRamen.image) {
        img.remove();
      }
    });

    // Clear detail panel
    document.querySelector(".detail-image").src = "./assets/image-placeholder.jpg";
    document.querySelector(".name").textContent = "Insert Name Here";
    document.querySelector(".restaurant").textContent = "Insert Restaurant Here";
    document.getElementById("rating-display").textContent = "Insert rating here";
    document.getElementById("comment-display").textContent = "Insert comment here";

    currentRamen = null;
  });
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
    };

    renderRamenThumbnail(newRamen); // add new ramen to menu
    form.reset(); // clear form
  });
};

const addEditFormListener = () => {
  const editForm = document.getElementById("edit-ramen");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!currentRamen) return;

    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    currentRamen.rating = newRating;
    currentRamen.comment = newComment;

    // Update the DOM
    document.getElementById("rating-display").textContent = newRating;
    document.getElementById("comment-display").textContent = newComment;

    editForm.reset();
  });
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((ramens) => {
      ramens.forEach((ramen, index) => {
        renderRamenThumbnail(ramen);

        // Show first ramen in detail panel
        if (index === 0) {
          handleClick(ramen);
        }
      });
    });
};

const renderRamenThumbnail = (ramen) => {
  const ramenMenu = document.getElementById("ramen-menu");

  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener("click", () => handleClick(ramen));

  ramenMenu.appendChild(img);
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();

  // Invoke addSubmitListener here
  addSubmitListener();
  addEditFormListener();
  addDeleteListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};