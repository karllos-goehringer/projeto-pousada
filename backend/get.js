import { Router } from 'express';
import connection from './dbConnection.js';

const router = Router();

router.get('/get-comodos', (req, res) => {
  connection.query('SELECT * FROM comodos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

router.get('/get-users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

router.get('/get-objetos-comodo', (req, res) => {
  connection.query('SELECT * FROM objetos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

export default router;
