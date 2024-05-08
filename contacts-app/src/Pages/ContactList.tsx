import ContactForm from "Components/ContactForm";
import { environment } from "Environments/environment";
import { Contact } from "Models/Contact";
import React, { useEffect, useState } from "react";

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false); // State to manage whether to show the form or not
    const [editContact, setEditContact] = useState<Contact | null>(null);
    
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`${environment.apiUrl}/Contact`);
                if (!response.ok) {
                    throw new Error('Failed to fetch contacts');
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleFormSubmit = async (contact: Contact) => {
      console.log("contact", contact);
      console.log("editContact", editContact);
        try {
          let response;
          if (editContact) {
            // If editContact is not null, it means we are editing an existing contact
            response = await fetch(`${environment.apiUrl}/Contact/${editContact.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contact),
            });
          } else {
            // If editContact is null, it means we are creating a new contact
            response = await fetch(`${environment.apiUrl}/Contact`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contact),
            });
          }
    
          if (!response.ok) {
            throw new Error('Failed to save contact');
          }
    
          const updatedContact = await response.json();
    
          if (editContact) {
            // If editContact is not null, it means we are editing an existing contact
            setContacts(prevContacts =>
              prevContacts.map(prevContact =>
                prevContact.id === updatedContact.id ? updatedContact : prevContact
              )
            );
          } else {
            // If editContact is null, it means we are creating a new contact
            setContacts(prevContacts => prevContacts ? [...prevContacts, updatedContact] : [updatedContact]);
          }
    
          setShowForm(false); // Hide the form after submission
          setEditContact(null); // Reset editContact state
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleEditContact = (contact: Contact) => {
        console.log("contact", contact);
        setEditContact(contact); // Set the contact to be edited
        setShowForm(true); // Show the form
    };

    return (
        <div>
            <h2 style={{ marginLeft: "20px" }}>Contact List</h2>
            <button style={{ marginLeft: "20px" }} onClick={() => setShowForm(true)}>Add Contact</button>
            {showForm && <ContactForm onSubmit={handleFormSubmit} initialContact={editContact} />}
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts?.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>
                                <button onClick={() => handleEditContact(contact)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;