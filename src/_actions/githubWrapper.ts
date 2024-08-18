"use server"

import { createServerAction } from "zsa";
import z from "zod";
import prisma from "@/prisma";

// Create the server action
export const ServerAction = createServerAction()
    .input(z.object({}))
    .output(z.object({}))
    .handler(async ({ input }) => {
        try {
            return
        } catch (error) {
            console.error("Server Error: ", error);
            throw error;
        }
    });