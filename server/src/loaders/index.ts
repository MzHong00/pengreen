import expressLoader from './express';
import { Express } from 'express';

interface Prop {
    expressApp: Express
}

export default async ({ expressApp }: Prop) => {
    await expressLoader(expressApp);
}