(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  /* ---- Image Preview for Hosting Forms ---- */
  const imageInput = document.getElementById('image');
  const imagePreview = document.getElementById('imagePreview');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');

  if (imageInput && imagePreview) {
    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
          imagePreview.setAttribute('src', this.result);
          if (imagePreviewContainer) {
            imagePreviewContainer.style.display = 'flex';
          }
        });
        reader.readAsDataURL(file);
      }
    });
  }

  /* ---- Mobile Menu Toggle Logic ---- */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  if (mobileMenuToggle && mobileNavOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });
  }

  if (mobileMenuClose && mobileNavOverlay) {
    mobileMenuClose.addEventListener('click', () => {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    });
  }

  // Close on overlay click
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
})()