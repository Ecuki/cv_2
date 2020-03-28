import React from "react";
import Form from "../Form";
import useClipboard from "react-use-clipboard";
import Giphy from "../Giphy";
import "./Contact.scss";

function Contact() {
  const contacts = [
    {
      type: "email",
      value: "jeziorski.emil@gmail.com",
      message: "You can write me an email📮📩"
    },
    {
      type: "phone",
      value: "726 558 563",
      message: "or you can call 📱📞"
    },
    {
      type: "gitHub",
      value: "github.com/ecuki",
      link: "https://github.com/Ecuki",
      message: "I'm just getting started 😊"
    },
    {
      type: "facebook",
      value: "I do not use",
      message: "such a waste of time 😜"
    }
  ];

  return (
    <div className="contact-site">
      <div className="contact__section">
        <h1 className="contact__title">contact</h1>
        <Contacts contacts={contacts} />
      </div>
      <Form />
      <Giphy />
    </div>
  );
}

function Contacts({ contacts }) {
  return contacts.map(contact => (
    <ContactElement key={contact.value} {...contact} />
  ));
}

function ContactElement({ type, link, value, message }) {
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: 1500
  });
  return (
    <div key={type}>
      <h2 className="contact__subtitle">{type}</h2>
      <div className="contact__text">
        {link ? (
          <a href={link} className="contact__link">
            {value}
          </a>
        ) : (
          <span> {value}</span>
        )}
        <p className="contact_message">{message}</p>{" "}
        <button onClick={setCopied} className="button">
          {isCopied ? "Copied 👍" : "Copy! "}
        </button>
      </div>
    </div>
  );
}

export default Contact;
