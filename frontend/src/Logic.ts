import { nanoid } from "nanoid";

const apiUrl: string = import.meta.env.VITE_API_URL;

export async function getCharacters(): Promise<
  {
    name: string;
    url: string;
  }[]
> {
  const playerId = localStorage.getItem("id");
  const response = await fetch(
    `${apiUrl}/game/characters?playerId=${playerId}`,
  );
  return await response.json();
}

export async function checkPosition(
  name: string,
  pos: { x: number; y: number },
) {
  const playerId = localStorage.getItem("id") as string;
  const response = await fetch(`${apiUrl}/game/check`, {
    method: "PUT",
    body: JSON.stringify({ playerId: playerId, who: name, x: pos.x, y: pos.y }),
  });
  const data: { result: boolean; message: string } = await response.json();

  return data.result;
}

export async function getStatus(): Promise<{
  mapId: number;
  map: string;
  time: number | null;
  finished: boolean;
}> {
  const playerId = localStorage.getItem("id");
  const response = await fetch(`${apiUrl}/game/round?playerId=${playerId}`);
  return await response.json();
}

export async function getMaps(): Promise<
  {
    id: number;
    url: string;
    name: string;
  }[]
> {
  const response = await fetch(`${apiUrl}/maps`);
  const data = await response.json();
  return data;
}

export function createUser(name: string) {
  let userId = localStorage.getItem("id") ?? nanoid();
  localStorage.setItem("id", userId);
  localStorage.setItem("name", name);
}

export async function startUser(mapId: string) {
  let userId = localStorage.getItem("id");
  let username = localStorage.getItem("name");
  await fetch(`${apiUrl}/game/start`, {
    method: "POST",
    body: JSON.stringify({ name: username, playerId: userId, mapId }),
  });
}

export async function getLeaderboard(mapId: string): Promise<{
  name: string;
  scores: { name: string; time: number }[];
}> {
  const response = await fetch(`${apiUrl}/scores/${mapId}`);
  const data = await response.json();
  return data;
}
