import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `http://13.201.99.1:8000//api/schemes`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schemes" });
  }
}
