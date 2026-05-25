import { formatName } from "./utils/formatName";
import type { User } from "./type";

const URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(): Promise<User[]> {
  const resp = await fetch(`${URL}/users`);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();

  return data
    .map((user: User) => ({ ...user, displayLabel: formatName(user.name) }))
    .sort((a: User, b: User) => a.displayLabel.localeCompare(b.displayLabel));
}