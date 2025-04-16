import bcrypt from 'bcryptjs';

export class HashService {
    private static readonly SALT_ROUNDS = 10;

    /**
     * Gera um hash seguro para a senha fornecida.
     * @param password Senha em texto puro.
     * @returns Retorna a senha hasheada.
     */
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }

    /**
     * Compara a senha fornecida com um hash armazenado.
     * @param password Senha em texto puro.
     * @param hash Hash armazenado no banco de dados.
     * @returns Retorna `true` se a senha for válida, caso contrário, `false`.
     */
    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
