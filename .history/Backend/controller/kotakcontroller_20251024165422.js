import Saran from "../models/saranmodel.js";

export const getSaran = async (req, res) => {
  try {
    const data = await Saran.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSaran = async (req, res) => {
  const { nama, pesan } = req.body;
  try {
    const newSaran = await Saran.create({ nama, pesan });
    res.status(201).json(newSaran);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const deleteSaran = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Saran.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus data:", error);
    res.status(500).json({ message: "Gagal menghapus data" });
  }
};

export const editSaran = async (req, res) => {
  const { id } = req.params;
  const { nama, pesan } = req.body;

  try {
    // Cek apakah data ada
    const saran = await Saran.findByPk(id);
    if (!saran) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Update data
    saran.nama = nama ?? saran.nama; // kalau nama dikirim, update
    saran.pesan = pesan ?? saran.pesan; // kalau pesan dikirim, update
    await saran.save();

    res.json({ message: "Data berhasil diperbarui", data: saran });
  } catch (err) {
    console.error("Error saat mengedit data:", err);
    res.status(500).json({ message: "Gagal memperbarui data" });
  }
};