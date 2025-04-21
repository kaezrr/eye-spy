import { nanoid } from "nanoid";

const apiUrl: string = import.meta.env.VITE_API_URL;

export async function getCharacters() {
  return ["Waldo", "Woof", "Wenda", "Whitebeard", "Odlaw"];
}

export async function checkPosition(
  name: string,
  pos: { x: number; y: number },
) {
  console.log(name, pos);
  return true;
}

export function hasWon() {
  return true;
}

export async function createUser(name: string) {
  let userId = localStorage.getItem("id") ?? nanoid();
  localStorage.setItem("id", userId);
  localStorage.setItem("name", name);
}

export async function startUser() {
  let userId = localStorage.getItem("id");
  let username = localStorage.getItem("name");
  console.log(`game started for ${userId} - ${username}`);
  // await fetch(`${apiUrl}/start`, {
  //   method: "POST",
  //   body: JSON.stringify({ name: username, id: userId }),
  // });
}

export async function getLeaderboard() {
  await fetch(`${apiUrl}/leaderboard`);
}
