/**
 * Describes an HTTP mapped Google API error payload.
 * @see {@link https://cloud.google.com/apis/design/errors#http_mapping Google Cloud APIs' errors documentation}
 */
export interface Status {
  /** The HTTP status code that corresponds to `google.rpc.Status.code`. */
  readonly code: number;
  /** This corresponds to `google.rpc.Status.message`. */
  readonly message: string;
  /** This is the enum version for `google.rpc.Status.code`. */
  readonly status?: string;
  /** This corresponds to `google.rpc.Status.details`. */
  readonly details?: Record<string, unknown>[];
}

/** Describes an HTTP mapped Google API error model. */
export class GoogleAPIError extends Error implements Status {
  public readonly code: number;
  public readonly status?: string;
  public readonly details?: Record<string, unknown>[];

  /**
   * Constructs a new HTTP mapped Google API error instance.
   * @param error The actual error payload.
   * @param options The optional properties.
   */
  constructor(error: Status, options?: ErrorOptions) {
    super(error.message, options);

    this.name = 'GoogleAPIError';
    this.code = error.code;

    if (error.status) this.status = error.status;

    if (error.details) this.details = error.details;
  }
}
