export default function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      // Handle form submission (e.g., save data to the database)
  
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  