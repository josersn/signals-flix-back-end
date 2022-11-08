import { JsonWebTokenProvider } from "./implementations/json-web-token";

class Tokenization extends JsonWebTokenProvider {
    constructor(secret: string, expiresIn: number) {
        super(secret, expiresIn)
    }
}

export { Tokenization }