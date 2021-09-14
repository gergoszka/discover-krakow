import LandmarkForm from "../components/landmarks/LandmarkForm";
import axios from "axios";
import { Landmark } from "../Interfaces";

function SubmitPage() {
  function addLandmarkHandler(newLandmark: Landmark){  
    axios.post("http://localhost:4040/landmarks", newLandmark).then(res => {console.log(res)})
  }

  return <LandmarkForm onAddLandmark={addLandmarkHandler } />
}

export default SubmitPage;