export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      if (data.tip === "zenska-odeca" || data.tip === "muska-odeca") {
        if (!data.velicina) {
          res.status(400).json({ message: "Unisite veličinu!" });
        }
      }
      if (data.tip === "zenska-obuca" || data.tip === "muska-obuca") {
        if (
          !data.obimPrstiju ||
          !data.obimRisa ||
          !data.duzinaStopala ||
          !data.velicina
        ) {
          res.status(400).json({ message: "Unisite veličinu!" });
        }
      }
      if (data.tip === "aksesoari") {
        if (
          data.category.name === "Kape" ||
          data.category.name === "Rukavice" ||
          data.category.name === "Čarape"
        ) {
          if (!data.velicina) {
            res.status(400).json({ message: "Unisite veličinu!" });
          }
        }
      }

      res.status(200).json({ ...data });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
