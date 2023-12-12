import React, { useState } from "react";
import { Card, Col, Container, Dropdown, FormControl, Row } from "react-bootstrap";

function App() {

  const [inValue, setInValue] = useState("");
  const [outValue, setOutValue] = useState("");

  const [selectedFromLang, setSelectedFromLang] = useState('English');
  const [selectedToLang, setSelectedToLang] = useState('Hindi');

  const [selectedFromLangCode, setSelectedFromLangCode] = useState('en');
  const [selectedToLangCode, setSelectedToLangCode] = useState('hi');

  function handleInChange(event) {
    // console.log(event.target.value);
    setInValue(event.target.value);
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
  ];

  function handleFromSelect(eventKey) {
    // console.log(eventKey);
    const selectedLang = languages.find((language) => language.code === eventKey);  //store language code and name 

    setSelectedFromLang(selectedLang.name);
    setSelectedFromLangCode(selectedLang.code);
  }

  function handleToSelect(eventKey) {
    // console.log(eventKey);
    const selectedLang = languages.find((language) => language.code === eventKey);  //store language code and name 

    setSelectedToLang(selectedLang.name);
    setSelectedToLangCode(selectedLang.code);
  }

  function handleKeyPress(event){
    if(event.key === "Enter" && inValue.trim() !== ""){
      fetch(`https://api.mymemory.translated.net/get?q=${inValue}!&langpair=${selectedFromLangCode}|${selectedToLangCode}`)
      .then((res) => {
        return res.json();
      })
      .then((finalRes) => {
        console.log(finalRes.responseData.translatedText);
        setOutValue(finalRes.responseData.translatedText)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div>
      <Container>
        <Card className="mt-5">
          <Card.Header>
            <h4 className="text-primary text-center">Traslator App</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="text-center">
                <h6>Traslate From: {selectedFromLang}</h6>
                <Dropdown onSelect={handleFromSelect} className="mb-2">
                  <Dropdown.Toggle>{selectedFromLang}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {languages.map((language) => {
                      return <Dropdown.Item eventKey={language.code} key={language.code}>
                        {language.name}
                      </Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>

                <FormControl
                  as='textarea'
                  placeholder="Enter your text"
                  onChange={handleInChange}
                  onKeyPress={handleKeyPress}
                  value={inValue}
                >
                </FormControl>
              </Col>

              <Col md={6} className="text-center">
                <h6>Traslate To: {selectedToLang}</h6>
                <Dropdown onSelect={handleToSelect} className="mb-2">
                  <Dropdown.Toggle>{selectedToLang}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {languages.map((language) => {
                      return <Dropdown.Item eventKey={language.code} key={language.code}>
                        {language.name}
                      </Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>

                <FormControl
                  as='textarea'
                  placeholder="Please wait..."
                  value={outValue}
                >

                </FormControl>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

// https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it 
export default App;
