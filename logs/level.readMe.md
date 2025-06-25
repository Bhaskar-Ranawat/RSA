### These are the error levels in Winston, to use them ideally create a new file for them to be stored in and then simply call logger.level of the error

### For example --> logger.error logger.warn logger.debug and so on

| Level     | Severity | Use Case Example                                |
| --------- | -------- | ----------------------------------------------- |
| `error`   | 0        | App crashes, DB failures, exceptions            |
| `warn`    | 1        | Non-critical failures, misuse, deprecations     |
| `info`    | 2        | Normal operations like user created, email sent |
| `http`    | 3        | HTTP layer logs (if configured)                 |
| `verbose` | 4        | Detailed logs for dev/debugging                 |
| `debug`   | 5        | Low-level debug logs (e.g., variable values)    |
| `silly`   | 6        | Extremely verbose — for deep tracing only       |
