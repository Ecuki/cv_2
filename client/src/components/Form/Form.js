import React, { useState } from "react";

import "./Form.scss";

function Form() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const my_email = "jeziorski.emil@gmail.com";

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then(res => {
        alert("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const templateId = "template_QBf5wqdK";
    if (message !== "" && name !== "") {
      sendFeedback(templateId, {
        message_html: message,
        from_name: name,
        reply_to: my_email,
        from_email: email
      });
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>write to me!</h1>
      <input
        id="name"
        name="name"
        type="text"
        onChange={e => setName(e.target.value)}
        placeholder="name"
        required
        value={name}
      />
      <input
        id="email"
        name="email"
        type="email"
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        required
        value={email}
      />
      <textarea
        id="message"
        name="message"
        onChange={e => setMessage(e.target.value)}
        placeholder="ask me a question or write what you want"
        required
        value={message}
      />
      <input type="submit" value="Send" className="button" />
    </form>
  );
}

export default Form;
