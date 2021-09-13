import Card from "../ui/Card";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Wavel Castle",
    img: "https://discovercracow.com/sites/all/pliki/styles/obraz_w_tekscie/public/obrazy_tekst/krakow-attractions9-760x500.jpg?itok=dFNoGMbA",
  },
  {
    id: 2,
    title: "Kazimierz Jewish Quarter",
    img: "https://discovercracow.com/sites/all/pliki/styles/obraz_w_tekscie/public/obrazy_tekst/krakow-jewish-district15-768x511.jpg?itok=zB01wYBg",
  },
  {
    id: 3,
    title: "Main Market Square",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG",
  },

];

// Demo of mapping array of objects to JSX items
function Sights() {
  return (
    <div className="sights-container">
      {DUMMY_DATA.map((sight) => {
        return (
          <Card key={sight.id}>
            <img
              src={sight.img}
              alt={sight.title}
              height="200px"
              width="300px"
            />
            <h3>{sight.title}</h3>
          </Card>
        );
      })}
    </div>
  );
}

export default Sights;
