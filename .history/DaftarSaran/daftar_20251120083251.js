// -----------------------
// Import Supabase
// -----------------------
import { createClient } from "@supabase/supabase-js";

// -----------------------
// Setup Supabase
// -----------------------
const SUPABASE_URL = "https://zdexqljlftfneoulfndi.supabase.co"; // ganti dengan URL Supabase-mu
const SUPABASE_ANON_KEY = "sb_publishable_2sQMkEKVIViNBcrS_HVCRw_VfbBbA5eY";              // ganti dengan anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------
// Elemen dari HTML
// -----------------------
const container = document.getElementById("inspirasiContainer");
const popupOverlay = document.getElementById("popupOverlay");
const popupNama = document.getElementById("popupNama");
const popupIsi = document.getElementById("popupIsi");
const tutupPopup = document.getElementById("tutupPopup");
const mainContainer = document.querySelector(".container");

// -----------------------
// Fungsi ambil data dari Supabase
// -----------------------
export async function ambilSaran() {
  try {
    const { data, error } = await supabase
      .from("saran") // ganti dengan nama tabelmu
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    console.log("✅ Data dari Supabase:", data);
    tampilkanSaran(data);
  } catch (err) {
    console.error("❌ Error saat ambil saran:", err);
    container.innerHTML = `<p style="color:red;">Gagal memuat data.</p>`;
  }
}

// -----------------------
// Fungsi tampilkan saran
// -----------------------
function tampilkanSaran(list) {
  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML = "<p>Tidak ada saran untuk ditampilkan.</p>";
    return;
  }

  list.forEach((data) => {
    const box = document.createElement("div");
    box.classList.add("box-saran");

    // Nama
    const nama = document.createElement("p");
    nama.classList.add("nama");
    nama.textContent = data.nama || "Anonim";

    // Tanggal
    const tanggal = document.createElement("p");
    tanggal.classList.add("tanggal");
    const dateStr = data.createdAt;
    if (dateStr) {
      const date = new Date(dateStr);
      tanggal.textContent = !isNaN(date)
        ? date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-";
    } else {
      tanggal.textContent = "-";
    }

    const header = document.createElement("div");
    header.classList.add("header-saran");
    header.appendChild(nama);
    header.appendChild(tanggal);

    // Isi pesan
    const isi = document.createElement("p");
    isi.classList.add("isi");
    isi.textContent = data.pesan || "-";

    // Append ke box
    box.appendChild(header);
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

// -----------------------
// Tutup popup
// -----------------------
tutupPopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  mainContainer.classList.remove("blur");

  const popupBox = document.querySelector(".popup-box");
  popupBox.scrollTop = 0;

  document.querySelectorAll(".isi.expanded").forEach((el) => {
    el.classList.remove("expanded");
  });
});

// -----------------------
// Toggle expand/collapse isi saran
// -----------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("isi")) {
    e.target.classList.toggle("expanded");
  }
});

// -----------------------
// Jalankan setelah halaman dimuat
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  ambilSaran();
  document.body.classList.add("loaded");
});
