export type ApiResponse<T> = {
  data: T
  ok: true
} | {
  error: string
  ok: false
}
