document.querySelector('.form-saran').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;

  try {
    // kirim ke backend
    const res = await fetch('http://localhost:5000/api/saran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, pesan }),
    });

    if (res.ok) {
      // tampilkan popup sukses
      document.querySelector('.container').style.filter = 'blur(5px)';
      document.getElementById('popup').classList.add('active');
      e.target.reset();
    } else {
      alert('Gagal mengirim saran!');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Terjadi kesalahan saat mengirim data!');
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
