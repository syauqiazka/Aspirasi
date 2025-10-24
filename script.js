function goToPage(url) {
  const transition = document.querySelector('.page-transition');
  transition.classList.add('active');

  // Tunggu animasi selesai dulu (0.7s) baru pindah
  setTimeout(() => {
    window.location.href = url;
  }, 700);
}
