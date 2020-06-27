// import moment from "moment";

class MemberDetails {
  constructor(
    fName,
    lName,
    age,
    weight,
    height,
    medHistory,
    occupation,
    bmi,
    fat,
    muscle,
    kcal,
    meta,
    vis,
    startDate,
    endDate,
    daysLeft,
    basePic,
    newPic
  ) {
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.medHistory = medHistory;
    this.occupation = occupation;
    this.bmi = bmi;
    this.fat = fat;
    this.muscle = muscle;
    this.kcal = kcal;
    this.meta = meta;
    this.vis = vis;
    this.startDate = startDate;
    this.endDate = endDate;
    this.daysLeft = daysLeft;
    this.basePic = basePic;
    this.newPic = newPic;
  }
}

export default MemberDetails;
