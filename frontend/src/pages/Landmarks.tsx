import LandmarkList from "../components/landmarks/LandmarkList";

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
function LandmarksPage() {
  return (
    <div className="sights-container">
      <LandmarkList landmarks={DUMMY_DATA}></LandmarkList>
    </div>
  );
}

export default LandmarksPage;
