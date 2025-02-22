import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RendererFunctions } from "./type";
import {renderToString} from 'react-dom/server'

const createRenderFunction:RendererFunctions['createRenderFunction'] = async ({createApp}) => {
  return (server:FastifyInstance, req:FastifyRequest, reply:FastifyReply) => {
    const app = createApp()
    const element = renderToString(app)
    return { element, hydration: '' }
  }
}

export default {createRenderFunction}