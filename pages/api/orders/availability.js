import nc from "next-connect";
import db from "@/helpers/db";
import Avalablity from "@/models/Availablity";

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { ime, prezime, kontaktTelefon, email } = req.body;

    if (!ime || !prezime || !kontaktTelefon) {
      return res.status(400).json({ message: "Popunite sva obavezna polja!" });
    }

    const newAvalibilty = new Avalablity({
      FirstName: ime,
      LastName: prezime,
      Phone: kontaktTelefon,
      Email: email,
    });

    try {
      await newAvalibilty.save();
      db.disconnectDb();
      res.status(200).json({ message: "Upit uspešno sačuvan." });
    } catch (error) {
      db.disconnectDb();
      res.status(400).json({
        message: "Los zahtev!",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
