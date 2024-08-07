import dotenv from "dotenv";

dotenv.config();

export const keys = {
    web: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        project_id: process.env.PROJECT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "redirect_uris": [
            "http://localhost:3000/auth/google",
            "https://pengreen-client.vercel.app/auth/google"
        ],
        "javascript_origins": [
            "http://localhost:5001"
        ]
    }
}