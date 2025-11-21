// -----------------------
// Setup Supabase
// -----------------------
const SUPABASE_URL = "https://zdexqljlftfneoulfndi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZXhxbGpsZnRmbmVvdWxmbmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDE2NDEsImV4cCI6MjA3OTA3NzY0MX0.sqkyamI_RU0hzfHTBmNhf30zxrbBwm6s8jQOifXxNlA";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------
// Elemen HTML
// -----------------------
const container = document.getElementById("inspirasiContainer");
const popupOverlay = document.getElementById("popupOverlay");
const popupNama = document.getElementById("popupNama");
const popupIsi = document.getElementById("popupIsi");
const tutupPopup = document.getElementById("tutupPopup");
const mainContainer = document.querySelector(".container");

// -----------------------
// Ambil data dari Supabase
// -----------------------
async function ambilSaran() {
  try {
    const { data, error } = await client
      .from("saran")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    console.log("DATA =", data);
    tampilkanSaran(data);
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p style="color:red;">Gagal memuat data.</p>`;
  }
}

// -----------------------
// Tampilkan saran
// -----------------------
function tampilkanSaran(list) {
  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML = "<p>Tidak ada saran.</p>";
    return;
  }

  list.forEach((data) => {
    const box = document.createElement("div");
    box.classList.add("box-saran");

    const nama = document.createElement("p");
    nama.classList.add("nama");
    nama.textContent = data.nama || "Anonim";

    const tanggal = document.createElement("p");
    tanggal.classList.add("tanggal");

    const date = new Date(data.createdAt);
    tanggal.textContent = !isNaN(date)
      ? date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

    const header = document.createElement("div");
    header.classList.add("header-saran");
    header.appendChild(nama);
    header.appendChild(tanggal);

    const isi = document.createElement("p");
    isi.classList.add("isi");
    isi.textContent = data.pesan || "-";

    box.appendChild(header);
    box.appendChild(isi);
    container.appendChild(box);

    // Event Detail Popup
    box.addEventListener("click", () => {
      popupNama.textContent = data.nama || "Anonim";
      popupIsi.textContent = data.pesan || "-";
      popupOverlay.style.display = "flex";
      mainContainer.classList.add("blur");
    });
  });
}

// -----------------------
// Tutup popup
// -----------------------
tutupPopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  mainContainer.classList.remove("blur");
});

// -----------------------
// Mulai load data
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  ambilSaran();
});
