interface IEncryption {
    crypt(value: String): Promise<String>
    decrypt(value: String, hash: String): Promise<Boolean>
}

export { IEncryption }