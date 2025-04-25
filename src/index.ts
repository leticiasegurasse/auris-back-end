// src/index.ts
import app from './server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API local rodando em http://localhost:${PORT}`);
});
