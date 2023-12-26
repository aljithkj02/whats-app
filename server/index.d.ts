declare namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
        MONGO_URL: string;
    }
}