import Content from "../models/content";

const CONTENT = [
  new Content(
    "C",
    "Cardio",
    "https://i.imgur.com/TxWfEGv.png",
    "Cardio Circuit",
    "1 of 4 sections",
    "../assets/icon-noexlogo.png",
    29.99,
    "Class about Cardio to improve stamina"
  ),
  new Content(
    "S",
    "Strength",
    "https://i.imgur.com/VOPt2Us.png",
    "Strength Circuit",
    "2 of 4 sections",
    "../assets/icon-noexlogo.png",
    99.99,
    "Class about Strength to improve stamina"
  ),
  new Content(
    "M",
    "Cardio & Strength",
    "https://i.imgur.com/ymOClmI.jpg",
    "Cardio & Strength Circuit",
    "3 of 4 sections",
    "../assets/icon-noexlogo.png",
    8.99,
    "Class about Mixed to improve stamina"
  ),
  new Content(
    "R",
    "Recovery",
    "https://i.imgur.com/Andv9mv.jpg",
    "Time to Recover",
    "4 of 4 sections",
    "../assets/icon-noexlogo.png",
    15.99,
    "Class about Recovery to improve stamina"
  ),
];

export default CONTENT;
