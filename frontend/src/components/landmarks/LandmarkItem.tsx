import Card from "../ui/Card";

function LandMarkItem(props: any) {
  let sight = props.landmark;
  return (
    <li>
      <Card>
        <img src={sight.image} alt={sight.title} height="200px" width="300px" />
        <h3>{sight.title}</h3>
      </Card>
    </li>
  );
}

export default LandMarkItem;
