## Check for docker tag existence

## inputs
| Field | Required | Description                          |
| ----- | -------- | ------------------------------------ |
| image | yes      | Docker image to check                |
| tag   | no       | Docker image tag, default is: latest |

## outputs
| Field    | Description              |
| -------- | ------------------------ |
| is_exist | true if image tag exists |
