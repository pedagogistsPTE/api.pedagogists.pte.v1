import express from 'express';
import questionRoutes from './routes/question.routes.js';
import moduleRoutes from './routes/module.routes.js';
import typeRoutes from './routes/type.routes.js';
import mediaRoutes from './routes/media.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/types', typeRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
