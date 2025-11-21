document.querySelector('.form-saran').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;

  const SUPABASE_URL = "https://xxxxx.supabase.co"; // ganti ini
  const SUPABASE_KEY = "ey...."; // anon public key, bukan service role

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/aspirasi`, {
      method: 'POST',
      headers: {
        "apikey": sb_publishable_2sQMkEKVIViNBcrS_HVCRw_VfbBbA5e,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal" // biar ngirim tanpa return data
      },
      body: JSON.stringify({ nama, pesan }),
    });

    if (res.ok) {
      document.querySelector('.container').style.filter = 'blur(5px)';
      document.getElementById('popup').classList.add('active');
      e.target.reset();
    } else {
      alert('Gagal mengirim saran!');
      console.error(await res.text());
    }

  } catch (err) {
    console.error('Error:', err);
    alert('Terjadi kesalahan saat mengirim data!');
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
