import { FormEvent, useRef } from "react";
import Card from "../ui/Card";
const classes = require("./Landmarks.module.css");

function LandmarkForm(props: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    if(titleRef.current && imageRef.current){
      const submitData = {
        title: titleRef.current.value,
        image: imageRef.current.value
      }

      props.onAddLandmark(submitData);
      
      titleRef.current.value = "";
      imageRef.current.value = "";
    }
  }
  
  return (
    <div className={classes.formContainer}>
      <Card>
        <h2>Submit a new landmark</h2>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Landmark Title</label>
            <input type="text" required id="title" ref={titleRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Image Url</label>
            <input type="url" required id="image" ref={imageRef} />
          </div>
          <div className={classes.actions}>
            <button>Add Landmark</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LandmarkForm;
