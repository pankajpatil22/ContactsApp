using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService) {
            _contactService = contactService;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            var result  = _contactService.GetAllContacts();
            return result;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ActionResult<Contact> Get(int id)
        {
            var result = _contactService.GetContactById(id);
            return result;
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult<Contact> Post([FromBody]Contact contact)
        {
            var result = _contactService.CreateContact(contact);
            return result;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public ActionResult<Contact> Put(int id, Contact contact)
        {
            var result = _contactService.UpdateContact(id, contact);
            return result;
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _contactService.DeleteContact(id);
        }
    }
}
