import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);

    return {
        idUsuario: decodificado.jti,
        token: token,
        tipoUsuario: decodificado["Tipo do usuário"]
    }
}