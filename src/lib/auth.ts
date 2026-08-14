import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE } from "@/lib/auth-constants";

export function checkCredentials(username: string, password: string) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) {
    throw new Error(
      "ADMIN_USERNAME / ADMIN_PASSWORD are not set. Add them to .env.local.",
    );
  }
  return username === validUser && password === validPass;
}

export async function createSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
}

export async function isAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;
}

// Defense in depth: middleware already guards /admin pages, but mutating
// Server Actions check again since they can be invoked directly.
export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
