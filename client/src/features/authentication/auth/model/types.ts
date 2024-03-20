import { ReactNode } from "react";

export interface OAuthProvider {
    name: string;
    componentImg: () => ReactNode;
    handler: () => Promise<void>;
    tailwind: string;
}