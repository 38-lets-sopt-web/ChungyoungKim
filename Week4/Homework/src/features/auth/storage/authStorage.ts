const SIGNED_IN_USER_ID_STORAGE_KEY = 'sopt-week4-signed-in-user-id'

export function saveSignedInUserId(userId: number) {
  localStorage.setItem(SIGNED_IN_USER_ID_STORAGE_KEY, String(userId))
}
