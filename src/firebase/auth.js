import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./config";

export async function cadastroUsuario(dados) {
    const res = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    await updateProfile(res.user, { displayName: dados.nome });
    const finalUser = auth.currentUser;
    return finalUser;
}

export async function loginUsuario(dados) {
    const res = await signInWithEmailAndPassword(auth, dados.email, dados.senha);
    return res.user;
}

