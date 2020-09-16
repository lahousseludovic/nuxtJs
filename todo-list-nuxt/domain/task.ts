export class Task {
  readonly id: string

  constructor(
    public readonly description: string,
    public isDone: boolean = false,
    public tags: Array<string> = []
  ) {
    this.id = `${encodeURI(description)}`
  }
}
