import { Router } from 'express';

import auth from './routes/auth';
import vote from './routes/vote';

export default () => {
	const app = Router();

	auth(app);
	vote(app);

	return app
}