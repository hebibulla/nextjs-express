import React from "react";
import axios from 'axios';

export default function index() {
 
 const contactForm_ref = React.useRef(null);

 function formHandler(e){

  e.preventDefault();
  const data = {
   email: contactForm_ref.current.email.value,
   subject: contactForm_ref.current.subject.value
  }

  console.log(data);

  axios.post('/contact-email',data)
  .then(Response => {
   console.log(Response.data);  
    if(Response.data === "success"){
      contactForm_ref.current.reset();
    }
  })
  .catch(err => {
   console.error(err);
  })

 }


  return (
    <React.Fragment>
      <div className="container pt-5">
       <h1 className="mb-2">Contact</h1>
        <form ref={contactForm_ref} onSubmit={(event)=>formHandler(event)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Subject</label>
            <textarea
              type="password"
              name="subject"
              rows="10"
              className="form-control"
              id="exampleInputPassword1"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
