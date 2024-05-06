import { Contact } from "Models/Contact";
import React, { useEffect, useState } from "react";

interface ContactFormProps {
    onSubmit: (contact: Contact) => void;
    initialContact?: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialContact }) => {
    const [contact, setContact] = useState<Contact>({ firstName: '', lastName: '', email: '', phoneNumber: '' });

    useEffect(() => {
        if (initialContact) {
            setContact(initialContact);
        } else {
            // Reset form fields if initialContact is null
            setContact({ firstName: '', lastName: '', email: '', phoneNumber: '' });
        }
    }, [initialContact]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contact);
        setContact({ firstName: '', lastName: '', email: '', phoneNumber: '' }); // Reset form after submission
    };
    return (
        <>
            <form style={{margin: "20px"}} onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={contact.firstName} onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
                <input type="number" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} placeholder="Phone" required />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default ContactForm;