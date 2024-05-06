using ContactsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services;

public class ContactService : IContactService
{
    private readonly ApplicationDbContext _context;
    public ContactService(ApplicationDbContext context)
    {
        _context = context;
    }

    public Contact CreateContact(Contact contact)
    {
        if (contact == null)
        {
            throw new InvalidOperationException();
        }
        _context.Contacts.Add(contact);
        _context.SaveChanges();

        return contact;
    }

    public void DeleteContact(int id)
    {
        var contact = _context.Contacts.Find(id);

        if (contact == null)
        {
            throw new KeyNotFoundException();
        }

        _context.Contacts.Remove(contact);
        _context.SaveChanges();
    }

    public List<Contact> GetAllContacts()
    {
        return _context.Contacts.ToList();
    }

    public Contact GetContactById(int id)
    {
        var contact = _context.Contacts.Find(id);

        if (contact == null)
        {
            throw new KeyNotFoundException();
        }

        return contact;
    }

    public Contact UpdateContact(int id, Contact contact)
    {
        if (id != contact.Id)
        {
            throw new InvalidOperationException("Incorrect Contact Id");
        }

        _context.Entry(contact).State = EntityState.Modified;
        _context.SaveChanges();

        return contact;
    }
}
