const SIGNED_IN_USER_ID_STORAGE_KEY = 'sopt-week4-signed-in-user-id'

export function saveSignedInUserId(userId: number) {
  localStorage.setItem(SIGNED_IN_USER_ID_STORAGE_KEY, String(userId))
}

export function getSignedInUserId() {
  const storedUserId = localStorage.getItem(SIGNED_IN_USER_ID_STORAGE_KEY)

  if (storedUserId === null) {
    return null
  }

  const parsedUserId = Number(storedUserId)

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    return null
  }

  return parsedUserId
}

export function removeSignedInUserId() {
  localStorage.removeItem(SIGNED_IN_USER_ID_STORAGE_KEY)
}
