import Card from "../ui/Card";
import {Landmark} from "../../Interfaces"

function LandMarkItem(props: any) {
  let landmark: Landmark  = props.landmark;
  return (
    <li>
      <Card>
        <img src={landmark.image} alt={landmark.title} height="200px" width="300px" />
        <h3>{landmark.title}</h3>
      </Card>
    </li>
  );
}

export default LandMarkItem;
