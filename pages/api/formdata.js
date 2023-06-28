export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { obimRisa, obimPrstiju, duzinaStopala, velicina } = data;
    const gender = data.gender;
    try {
      if (gender === "female") {
        res.status(200).json({ ...data });
      }
      if (gender === "male") {
        res.status(200).json({ ...data });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
