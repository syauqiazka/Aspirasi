async function loadData() {
  console.log("Mengambil data dari Supabase...");

  const { data, error } = await supabase
    .from("saran")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error);
    alert("Error mengambil data!");
    return;
  }

  console.log("Data diterima:", data);

  const container = document.getElementById("inspirasiContainer");
  container.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "inspirasi-card";
    div.innerHTML = `
      <h3>${item.nama}</h3>
      <p>${item.isi.substring(0, 100)}...</p>
    `;

    div.onclick = () => showPopup(item);

    container.appendChild(div);
  });
}

function showPopup(item) {
  document.getElementById("popupNama").textContent = item.nama;
  document.getElementById("popupIsi").textContent = item.isi;
  document.getElementById("popupOverlay").style.display = "flex";
}

document.getElementById("tutupPopup").onclick = function () {
  document.getElementById("popupOverlay").style.display = "none";
};

loadData();
