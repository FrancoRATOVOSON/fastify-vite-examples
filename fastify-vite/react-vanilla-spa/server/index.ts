import fastifyVite from "@fastify/vite";
import fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function main() {
  const server = fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    }
  })

  await server.register(fastifyVite, {
    root: path.resolve(import.meta.dirname,'../'),
    dev: process.argv.includes('--dev'),
    spa: true
  })

  server.get('/', (req,reply) => {
    return reply.html()
  })

  await server.vite.ready()

  return server
}

if(process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await main()
  await server.listen({port: 8080})
}