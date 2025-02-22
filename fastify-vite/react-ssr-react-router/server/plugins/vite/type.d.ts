import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export type RouteType = Partial<{
  server: unknown
  req: unknown
  reply: unknown
  head: unknown
  state: unknown
  data: Record<string, unknown>
  firstRender: boolean
  layout: unknown
  getMeta: unknown
  getData: unknown
  onEnter: unknown
  streaming: unknown
  clientOnly: unknown
  serverOnly: unknown
}>
export type Loosen<T> = T & Record<string, unknown>
export type Ctx = Loosen<{
  routes: Array<RouteType>
  context: unknown
  body: unknown
  stream: unknown
  data: unknown
}>

type CreateAppCTX = { serverSideProps?: unknown, data?: unknown, server:FastifyInstance, req:FastifyRequest, reply:FastifyReply }

export interface RendererFunctions {
  createHtmlTemplateFunction(source: string): unknown
  createHtmlFunction(
    source: string,
    scope?: unknown,
    config?: unknown,
  ): (ctx: Ctx) => Promise<unknown>
  createRenderFunction(
    args: Loosen<{
      routes: Array<RouteType>
      create: (arg0: Record<string, unknown>) => unknown
      createApp: (ctx?: CreateAppCTX,url?:string) => React.ReactNode
    }>,
  ): Promise<
    (
      server: FastifyInstance,
      req: FastifyRequest,
      reply: FastifyReply,
    ) => Ctx | { element: string; hydration: string }
  >
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export interface RendererOption<
  CM = string | Record<string, unknown> | unknown,
  C = unknown,
> extends RendererFunctions {
  clientModule: CM
  createErrorHandler(
    client: C,
    scope: FastifyInstance,
    config?: unknown,
  ): (error: Error, req?: FastifyRequest, reply?: FastifyReply) => void
  createRoute(
    args: Loosen<{
      client?: C
      handler?: (...args: unknown[]) => unknown
      errorHandler: (
        error: Error,
        req?: FastifyRequest,
        reply?: FastifyReply,
      ) => void
      route?: RouteType
    }>,
    scope: FastifyInstance,
    config: unknown,
  ): void
  createRouteHandler(
    client: C,
    scope: FastifyInstance,
    config?: unknown,
  ): (req: FastifyRequest, reply: FastifyReply) => Promise<unknown>
  prepareClient(
    clientModule: CM,
    scope?: FastifyInstance,
    config?: unknown,
  ): Promise<C>
}