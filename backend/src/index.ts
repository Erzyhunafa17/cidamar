import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import apiRouter from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS — hanya izinkan request dari frontend
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Mock-Admin'],
}));

// Parse JSON body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api', apiRouter);

// 404 handler untuk route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} tidak ditemukan`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = parseInt(env.PORT, 10);

app.listen(PORT, () => {
  console.log(`\n🚀 Kampung Cidamar API berjalan di:`);
  console.log(`   → http://localhost:${PORT}`);
  console.log(`   → Environment: ${env.NODE_ENV}`);
  console.log(`   → Supabase: ${env.SUPABASE_URL}\n`);
});

export default app;
