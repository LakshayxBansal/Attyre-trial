import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => {
  console.error('Redis error:', err);
});


await client.connect();

export const cache = (req, res, next) => {
  const { id } = req.params;

  client.get(id, (err, data) => {
    if (err) throw err;

    if (data) {
      
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};
