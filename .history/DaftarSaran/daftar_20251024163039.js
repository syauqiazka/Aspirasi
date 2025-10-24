// Elemen dari HTML
const container = document.getElementById("inspirasiContainer");
const popupOverlay = document.getElementById("popupOverlay");
const popupNama = document.getElementById("popupNama");
const popupIsi = document.getElementById("popupIsi");
const tutupPopup = document.getElementById("tutupPopup");
const mainContainer = document.querySelector(".container");

// Fungsi ambil data dari backend
async function ambilSaran() {
  try {
    const res = await fetch("http://localhost:5000/api/saran");
    if (!res.ok) throw new Error("Gagal fetch data");

    const data = await res.json();
    console.log("✅ Data dari backend:", data);
    tampilkanSaran(data);
  } catch (err) {
    console.error("❌ Error saat ambil saran:", err);
    container.innerHTML = `<p style="color:red;">Gagal memuat data.</p>`;
  }
}

// Fungsi untuk menampilkan saran ke halaman
function tampilkanSaran(list) {
  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML = "<p>Tidak ada saran untuk ditampilkan.</p>";
    return;
  }

  list.forEach((data) => {
    const box = document.createElement("div");
    box.classList.add("box-saran");

    const nama = document.createElement("p");
    nama.classList.add("nama");
    nama.textContent = data.nama || "Anonim";

    

     if (data.tanggal) {
    const date = new Date(data.tanggal);
    // format: 24 Okt 2025, 15:30
    tanggal.textContent = date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    tanggal.textContent = "-";
    }
    
    const header = document.createElement("div");
  header.classList.add("header-saran");
header.appendChild(nama);
header.appendChild(tanggal);

    

    const isi = document.createElement("p");
    isi.classList.add("isi");
    isi.textContent = data.pesan || "-";

    box.appendChild(nama);
    box.appendChild(isi);

    container.prepend(box);

    // Klik → tampilkan popup
    box.addEventListener("click", () => {
      popupNama.textContent = data.nama || "Anonim";
      popupIsi.textContent = data.pesan || "-";
      popupOverlay.style.display = "flex";
      mainContainer.classList.add("blur");

      const popupBox = document.querySelector(".popup-box");
      popupBox.scrollTop = 0;
    });
  });
}

// Tutup popup
tutupPopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  mainContainer.classList.remove("blur");

  const popupBox = document.querySelector(".popup-box");
  popupBox.scrollTop = 0;

    document.querySelectorAll(".isi.expanded").forEach((el) => {
      el.classList.remove("expanded");
      });
});

// Jalankan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  ambilSaran();
  document.body.classList.add("loaded");
});

// Fungsi toggle expand/collapse isi saran
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("isi")) {
    e.target.classList.toggle("expanded");
  }
});
