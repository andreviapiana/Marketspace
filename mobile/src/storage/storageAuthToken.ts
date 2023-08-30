import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from '@storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
  refresh_token: string
}

// Função p/ Salvar o AuthToken //
export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

// Função de Busca do Token no Storage //
export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE)

  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return { token, refresh_token }
}

// Função de Remover o Token do Storage //
export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
