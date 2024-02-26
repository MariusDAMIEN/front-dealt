declare global {
    namespace NodeJs {
        interface ProcessEnv {
            NODE_env: "development" | "production"
        }
    }
}

export { }