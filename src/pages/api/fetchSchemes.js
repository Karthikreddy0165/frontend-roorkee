import axios from "axios";

export default async function apiSchemesHandler(req, res) {
  try {
    const response = await axios.get(
      `http://3.109.208.148:8000/api/schemes`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schemes" });
  }
}
