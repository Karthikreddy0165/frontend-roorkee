import axios from "axios";

export default async function apiSchemesHandler(req, res) {
  try {
    const response = await axios.get(
      `http://65.0.122.213:8000/api/schemes`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schemes" });
  }
}
