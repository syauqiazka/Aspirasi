document.querySelector('.form-saran').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;

  const SUPABASE_URL = "https://zdexqljlftfneoulfndi.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZXhxbGpsZnRmbmVvdWxmbmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDE2NDEsImV4cCI6MjA3OTA3NzY0MX0.sqkyamI_RU0hzfHTBmNhf30zxrbBwm6s8jQOifXxNlA";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/saran`, {
      method: 'POST',
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        nama,
        pesan,
        createdAt: new Date().toISOString()
      }),
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
