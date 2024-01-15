export const MIN_PASSWORD_LENGTH = 6;
export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 15;
import ian from "./images/concert-ian.jpg";
import collage from "./images/collage-party.jpg";
import orcherstra from "./images/concer-orchestra.jpg";
import ts from "./images/concert.jpg";
import rock from "./images/concert-rock.jpg";
import trav from "./images/concert-trav.jpg";
import ted from "./images/conferinta.jpg";
import expo from "./images/expozitie.jpg";
import untold from "./images/festival.jpg";
import film from "./images/film.jpg";
import muzeu from "./images/muzeu.jpg";
import petrecere from "./images/petrecere.jpg";
import pool from "./images/poolparty.jpg";
import roof from "./images/rooftop.jpg";

export const USER_DATA_KEY = "userdata";
export const AUTH_TOKEN_KEY = "authtoken";

export const EVENTS = [
  {
    id: "ev-3",
    title: "Concert Orchestra",
    img: orcherstra,
    desc: "descriere scurta",
    date: new Date(2024, 1, 11),
    city: "Bucuresti",
  },
  {
    id: "ev-4",
    title: "Concert Taylor Swift",
    img: ts,
    desc: "descriere scurta",
    date: new Date(2024, 1, 11),
    city: "Satu Nou de Jos",
  },
  {
    id: "Concert Rock",
    title: "Concert Rock",
    img: rock,
    desc: "descriere scurta",
    date: new Date(2032, 1, 10),
    city: "Cluj-Napoca",
  },
  {
    id: "ev-7",
    title: "Concert Travis Scott",
    img: trav,
    desc: "Wow concert Travis Scott",
    date: new Date(2023, 9, 30),
    city: "Bucuresti",
  },
  {
    id: "ev-8",
    title: "TED Talk",
    img: ted,
    desc: "desc scurta",
    date: new Date(2023, 1, 21),
    city: "Baia Mare",
  },
  {
    id: "ev-1",
    title: "Concert Trap",
    img: ian, // Updated img path
    desc: "descriere scurta",
    date: new Date(2024, 0, 10),
    city: "Baia Mare",
  },
  {
    id: "ev-9",
    title: "Expozitie de arhitectura",
    img: expo,
    desc: "desc scurta",
    date: new Date(2025, 5, 6),
    city: "Timisoara",
  },
  {
    id: "ev-10",
    title: "Untold",
    img: untold,
    desc: "yey Untold",
    date: new Date(2030, 9, 10),
    city: "Cluj-Napoca",
  },
  {
    id: "ev-11",
    title: "Seara de film",
    img: film,
    desc: "seara de film",
    date: new Date(2023, 1, 10),
    city: "Iasi",
  },
  {
    id: "ev-12",
    title: "Muzeu de Arta",
    img: muzeu,
    desc: "scurta descriere",
    date: new Date(2021, 10, 10),
    city: "Bucuresti",
  },
  {
    id: "ev-13",
    title: "Petrecere",
    img: petrecere,
    desc: "scurta descriere",
    date: new Date(2026, 9, 20),
    city: "Deva",
  },
  {
    id: "ev-15",
    title: "Pool Party",
    img: pool,
    desc: "scurta desc",
    date: new Date(2024, 11, 10),
    city: "Targu Jiu",
  },
  {
    id: "ev-16",
    title: "RoofTop Party ",
    img: roof,
    desc: "Ruftop party",
    date: new Date(2024, 4, 15),
    city: "Baia Mare",
  },
];
