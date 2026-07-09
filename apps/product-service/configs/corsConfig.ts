const allowedOrigins = ['http://localhost:3002', 'http://localhost:3001'];

type CorsCallback = (err: Error | null, allow?: boolean) => void;

const corsOptions = (origin: string | undefined, callback: CorsCallback) => {
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
};

export { corsOptions };
