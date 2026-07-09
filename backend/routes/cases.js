const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route   POST /api/cases
// @desc    Report a new case
router.post('/', async (req, res) => {
  const { location, cases, severity } = req.body;

  try {
    const newCase = await pool.query(
      'INSERT INTO cases (location, cases_count, severity) VALUES ($1, $2, $3) RETURNING *',
      [location, cases, severity]
    );

    res.json(newCase.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/cases/monthly-risk
// @desc    Get aggregated cases for a specific month/year to determine risk zones
router.get('/monthly-risk', async (req, res) => {
  const { month, year } = req.query;
  
  if (!month || !year) {
    return res.status(400).json({ msg: 'Month and year are required' });
  }

  try {
    // Group by location and sum cases
    const result = await pool.query(
      `SELECT location, SUM(cases_count) as total_cases 
       FROM cases 
       WHERE EXTRACT(MONTH FROM reported_at) = $1 AND EXTRACT(YEAR FROM reported_at) = $2
       GROUP BY location`,
      [month, year]
    );

    // Apply algorithm to determine severity based on aggregated cases
    const riskZones = result.rows.map(row => {
      const casesCount = parseInt(row.total_cases, 10);
      let calculatedSeverity = 'safe';

      if (casesCount > 50) {
        calculatedSeverity = 'high';
      } else if (casesCount > 20) {
        calculatedSeverity = 'medium';
      } else if (casesCount > 0) {
        calculatedSeverity = 'low';
      }

      return {
        location: row.location,
        totalCases: casesCount,
        severity: calculatedSeverity
      };
    });

    res.json(riskZones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
