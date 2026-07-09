const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({
    stats: {
      totalCases: { value: '1,247', change: '-12% this month' },
      riskLevel: { value: 'Medium', label: 'Moderate risk' },
      activeAlerts: { value: '8', detail: '3 high priority' },
      atRisk: { value: '3,842', detail: '15 villages' }
    },
    forecast: [45, 52, 68, 85, 124, 95],
    outbreaks: [
      { id: 1, location: 'Kampala', cases: 65, timeAgo: '2 hours ago', status: 'high' },
      { id: 2, location: 'Jinja', cases: 30, timeAgo: '5 hours ago', status: 'medium' },
      { id: 3, location: 'Wakiso', cases: 10, timeAgo: '1 day ago', status: 'low' }
    ]
  });
});

module.exports = router;