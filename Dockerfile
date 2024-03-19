FROM oven/bun:debian

WORKDIR /app

EXPOSE 3033

COPY . .

RUN bun install --production

CMD ["bun", "index.js"]