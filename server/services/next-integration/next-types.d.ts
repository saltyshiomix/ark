import { Server } from 'next-server'
export type RequestHandler = any;
export type Renderer = Server["render"];
export type ErrorRenderer = Server["renderError"];
