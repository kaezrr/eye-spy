import { nanoid } from "nanoid";

const apiUrl: string = import.meta.env.VITE_API_URL;
type Status = {
  name: string;
  time: number;
  map: string;
  mapId: number;
  status: "won" | "playing" | "not playing";
};

export async function getCharacters(mapId: string | undefined) {
  // TODO: get characters from backend
  return ["Waldo", "Woof", "Wenda", "Whitebeard", "Odlaw"];
}

export async function checkPosition(
  // TODO: check position from backend
  name: string,
  pos: { x: number; y: number },
) {
  console.log(name, pos);
  return true;
}

export async function getStatus(): Promise<Status> {
  // TODO: check if user has won from backend
  return {
    name: "Anjishnu",
    time: 983412374,
    status: "won",
    map: "The Unfriendly Giants",
    mapId: 1,
  };
}

export async function getMaps() {
  return [
    {
      id: 1,
      name: "The Unfriendly Giants",
    },
    {
      id: 2,
      name: "The Underground Hunters",
    },
    {
      id: 3,
      name: "Dinosaurs, Spacemen And Ghouls",
    },
    {
      id: 4,
      name: "A Tremendous Song And Dance",
    },
    {
      id: 5,
      name: "Shhh! This Is A Silent Movie",
    },
    {
      id: 6,
      name: "The Swashbuckling Musketeers",
    },
  ];
}

export function createUser(name: string) {
  let userId = localStorage.getItem("id") ?? nanoid();
  localStorage.setItem("id", userId);
  localStorage.setItem("name", name);
}

export async function startUser() {
  // TODO: start user timer in backend
  let userId = localStorage.getItem("id");
  let username = localStorage.getItem("name");
  console.log(`game started for ${userId} - ${username}`);
  // await fetch(`${apiUrl}/start`, {
  //   method: "POST",
  //   body: JSON.stringify({ name: username, id: userId }),
  // });
}

type Score = {
  name: string;
  time: number;
};

type Leaderboard = {
  name: string;
  scores: Score[];
};

export async function getLeaderboard(mapId: string): Promise<Leaderboard> {
  // TODO: get leaderboard from backend according to map

  return {
    name: "The Unfriendly Giants",
    scores: [
      {
        name: "John",
        time: 909234235123,
      },
      {
        name: "Mason",
        time: 909234235123,
      },
      {
        name: "Bogart",
        time: 909234235123,
      },
      {
        name: "Gray",
        time: 909234235123,
      },
    ],
  };

  // await fetch(`${apiUrl}/leaderboard`);
}
