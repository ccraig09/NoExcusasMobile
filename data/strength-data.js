import strengthCategory from "../models/strengthCategory";

const STRENGTHCATEGORY = [
  new strengthCategory(
    "s1",
    "Strength",
    "https://i.imgur.com/TxWfEGv.png",
    "NIVEL 1",
    "20m",
    "Principiante",
    "../assets/icon-noexlogo.png",
    29.99,
    "Class about Cardio to improve stamina",
    "https://drive.google.com/uc?export=download&id=15YogOHVyyUE5G7G_UmEUNtNlxcEjZOZV"
  ),
  new strengthCategory(
    "s2",
    "Strength",
    "https://i.imgur.com/VOPt2Us.png",
    "NIVEL 2",
    "22m",
    "Medio",
    "../assets/icon-noexlogo.png",
    99.99,
    "Class about Strength to improve stamina"
  ),
  new strengthCategory(
    "s3",
    "Strength",
    "https://i.imgur.com/ymOClmI.jpg",
    "NIVEL 3",
    "23m",
    "Avanzado",
    "../assets/icon-noexlogo.png",
    8.99,
    "Class about Mixed to improve stamina"
  ),
];

export default STRENGTHCATEGORY;
