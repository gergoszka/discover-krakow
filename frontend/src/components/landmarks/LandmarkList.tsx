import { Landmark } from "../../Interfaces";
import LandMarkItem from "./LandmarkItem";
const classes = require('./Landmarks.module.css');

function LandmarkList(props: any) {
  return (
  <ul className={classes.container}>
    {props.landmarks.map((landmark: Landmark) => <LandMarkItem key={landmark._id} landmark={landmark}/>)}
  </ul>
  )
}

export default LandmarkList;