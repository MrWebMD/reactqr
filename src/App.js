import "./App.css";
import { useState, useRef, useEffect } from "react";
import qrcode from 'qrcode';

const Card = (props) => {
  return <div className="card">{props.children}</div>;
};

const NavBar = (props) => {
  return (
    <nav className="navBar">
      <h1>{props.title}</h1>
    </nav>
  );
};

const TextForm = (props) => {
  const textAreaRef = useRef();

  const [formError, setFormError] = useState(null);

  const inputIsEmpty = (inputRef) => {
    return inputRef.current.value.trim().length === 0;
  };

  const formIsValid = () => {
    if (inputIsEmpty(textAreaRef)) {
      setFormError("Input is empty");
      return false;
    }

    setFormError(null);

    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    props.onSubmit(textAreaRef.current.value);
    textAreaRef.current.value = "";
  };

  return (
    <Card>
      <form
        onSubmit={formSubmitHandler}
        onBlur={formIsValid}
        className="qrForm"
      >
        <h3>{props.title}</h3>
        <textarea
          ref={textAreaRef}
          className="qrForm-textarea"
          placeholder="Enter text"
        ></textarea>
        <br />
        {formError && <p className="qrForm-error">{formError}</p>}
        <button className="greenButton">Submit</button>
      </form>
    </Card>
  );
};

const QRCode = (props) => {
  const {qrCodeText} = props;

  const [imageURL, setImageURL] = useState("");

  useEffect(()=>{
    qrcode.toDataURL(qrCodeText, { type: "terminal" }, (err, url) => {
      if (err) {
        console.log(err);
        return;
      }
      setImageURL(url);
    });
  }, [qrCodeText])


  var qrCodeContent = <img src={imageURL} alt="QRCode" className="qrCode-image"></img>

  if(props.qrCodeText === ""){
    qrCodeContent = <h3 className="noQRData">No QR code data</h3>;
  }

  return (
    <Card>
      <div className="qrCode">
        {qrCodeContent}
      </div>
    </Card>
  );
};

const App = () => {
  const [qrCodeText, setQRCodeText] = useState("");

  const formSubmitHandler = (text) => {
    setQRCodeText(text);
  };

  return (
    <div className="App">
      <NavBar title="React QR"/>
      <TextForm onSubmit={formSubmitHandler} title="Enter QR Code Data" />

      <QRCode qrCodeText={qrCodeText}/>
    </div>
  );
};

export default App;
