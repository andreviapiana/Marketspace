import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from '@storage/storageConfig'

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_STORAGE, token)
}

// Função de Busca do Token no Storage //
export async function storageAuthTokenGet() {
  const token = await AsyncStorage.getItem(AUTH_STORAGE)

  return token
}

// Função de Remover o Token do Storage //
export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
