export type ExecErrorOutput = Error & {
  cmd?: string
  code?: number
  killed?: boolean
  signal?: null
  stderr: string
  stdout: string
}

export type ExecOutput = { stderr: string, stdout: string }

type Err = Error | ExecErrorOutput

type Failure<E> = {
  data: null
  error: E
}

type Result<T, E = Err> = Failure<E> | Success<T>

type Success<T> = {
  data: T
  error: null
}

export async function tryCatch<T, E = T extends ExecOutput ? ExecErrorOutput : Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  }
  catch (error: unknown) {
    return { data: null, error: error as E }
  }
}
