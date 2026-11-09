document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu');
    const closeButton = document.querySelector('.close-btn');
  
    menuButton.addEventListener('click', () => {
      sidebar.classList.add('show'); // Show the sidebar
    });
  
    closeButton.addEventListener('click', () => {
      sidebar.classList.remove('show'); // Hide the sidebar
    });
  });