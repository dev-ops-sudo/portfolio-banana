import { getDb } from "../../../db";
import { portfolioMessages } from "../../../db/schema";

type ContactPayload = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  preferredDate?: unknown;
  rating?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

const clean = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (clean(payload.website, 120)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const type =
      payload.type === "review"
        ? "review"
        : payload.type === "meeting"
          ? "meeting"
          : null;
    const name = clean(payload.name, 80);
    const email = clean(payload.email, 120).toLowerCase();
    const message = clean(payload.message, 1500);
    const preferredDate = clean(payload.preferredDate, 20) || null;
    const rating = Number(payload.rating);
    const normalizedRating =
      type === "review" &&
      Number.isInteger(rating) &&
      rating >= 1 &&
      rating <= 5
        ? rating
        : null;
    const consent = payload.consent === "yes" || payload.consent === true;

    if (
      !type ||
      !name ||
      !message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return Response.json(
        { error: "Please provide valid contact details." },
        { status: 400 },
      );
    }
    if (type === "meeting" && !preferredDate) {
      return Response.json(
        { error: "Please choose a preferred date." },
        { status: 400 },
      );
    }
    if (type === "review" && normalizedRating === null) {
      return Response.json(
        { error: "Please choose a rating." },
        { status: 400 },
      );
    }

    const db = getDb();
    await db.insert(portfolioMessages).values({
      id: crypto.randomUUID(),
      type,
      name,
      email,
      preferredDate,
      rating: normalizedRating,
      message,
      consent,
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const missingTable =
      message.includes("no such table") || message.includes("portfolio_messages");
    return Response.json(
      {
        error: missingTable
          ? "The contact database is still initializing."
          : "Unable to save the message.",
      },
      { status: 500 },
    );
  }
}
