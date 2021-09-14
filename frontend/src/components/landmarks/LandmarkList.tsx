import LandMarkItem from "./LandmarkItem";
import classes from './Landmarks.module.css';

function LandmarkList(props: any) {
  return (
  <ul className={classes.container}>
    {props.landmarks.map((landmark: any) => <LandMarkItem key={landmark._id} landmark={landmark}/>)}
  </ul>
  )
}

export default LandmarkList;