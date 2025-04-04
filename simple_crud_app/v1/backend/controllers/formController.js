const pool = require("../config/db");

async function createformdbTable() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS form_data(
    id SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    country TEXT NOT NULL
    )`);
    console.log("Table created sucessfully");
  } catch (error) {
    console.log("Error creating table", error);
  }
}

exports.createForm = async (req, res) => {
  try {
    await createformdbTable(); // Ensure the table exists

    const { firstname, lastname, email, gender, age, address, country } =
      req.body;

    const emailCheckQuery = "SELECT * FROM form_data WHERE email = $1";
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert new record if email is unique
    const insertQuery =
      "INSERT INTO form_data (firstname, lastname, email, gender, age, address, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*";
    const values = [firstname, lastname, email, gender, age, address, country];
    const result = await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: "Form submitted successfully", form: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readForm = async (req, res) => {
  const { email } = req.params;
  console.log("Received email:", email); // Debugging step
  try {
    const result = await pool.query(
      "SELECT * FROM form_data WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User details not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateForm = async (req, res) => {
  const { email } = req.params;
  const { updateAddress } = req.body;

  if (!updateAddress) {
    return res.status(400).json({ error: "Field is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE form_data SET address = $1 WHERE email = $2 RETURNING *`,
      [updateAddress, email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User details not found" });
    }
    res.json({
      message: "Details updated successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteForm = async (req, res) => {
  const { email } = req.params;
  console.log("Deleted email:", email);
  try {
    const result = await pool.query(
      "DELETE FROM form_data WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User details not found" });
    }

    res.json({ message: "User details deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
