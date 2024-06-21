FROM node:20 as builder

WORKDIR /usr/src/app

COPY . /usr/src/app/

# RUN curl -fsSL https://bun.sh/install | bash
RUN npm install -g bun

RUN bun install && bun run build

CMD ["bun", "run", "start"]