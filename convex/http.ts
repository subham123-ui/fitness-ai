import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, req) => {

        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET as string;
        if (!webhookSecret) {

            throw new Error("Missing env variable: CLERK_WEBHOOK_SECRET");
        }

        const svix_id = req.headers.get("svix-id");
        const svix_timestamp = req.headers.get("svix-timestamp");
        const svix_signature = req.headers.get("svix-signature");


        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response("Missing headers", { status: 400 });
        }

        const payload = await req.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {

            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature
            }) as WebhookEvent;

        } catch (error) {
            console.error("Error verifying webhook", error);
            return new Response("Error verifying webhook", { status: 400 });
        }


        const eventType = evt.type;

        if (eventType === "user.created") {

            const {id, first_name, last_name, image_url, email_addresses} = evt.data;

            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, {clerkId: id, name, email, image: image_url});
            } catch (error) {
                console.log("Error syncing user", error);
                return new Response("Error syncing user", { status: 500 });
            }
        }

        return new Response("Webhook processed successfully", { status: 200 });

    })
})


export default http;



