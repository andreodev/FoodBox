import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type Meal = {
  id: number;
  title: string;
  value: string;
};

export type Dia = {
  nome: string;
  refeicoes: Meal[];
};

// Salvar um novo dia com refeições
export async function salvarDia(dia: Dia) {
  try {
    const docRef = await addDoc(collection(db, "diasDaSemana"), dia);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao salvar dia: ", e);
    throw e;
  }
}

// Atualizar dia existente (precisa do id do documento Firestore)
export async function atualizarDia(id: string, dia: Dia) {
  try {
    const diaRef = doc(db, "diasDaSemana", id);
    await updateDoc(diaRef, dia);
  } catch (e) {
    console.error("Erro ao atualizar dia: ", e);
    throw e;
  }
}

// Você pode também criar funções para buscar, deletar, etc.
