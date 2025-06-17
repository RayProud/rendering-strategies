## How to run an image

- Go to the root
- `colima start`
- `docker build -t menti .` (you can use any tag instead of `menti`)
- `docker run --publish 3000:3000 menti:latest`
- go to `localhost:3000`