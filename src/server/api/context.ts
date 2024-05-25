import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import EventEmitter from "events";

import { getSession } from "next-auth/react";
import { db } from "../db";

const ee = new EventEmitter();

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (
  opts: CreateNextContextOptions | CreateWSSContextFnOptions,
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = await getSession({ req });

  return {
    req,
    res,
    session,
    db,
    ee,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
