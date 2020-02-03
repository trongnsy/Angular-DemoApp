using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MobileServices.Common;
using MobileServices.Models;
using MobileServices.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileServices.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MobileController : ControllerBase
    {
        private readonly ILogger<MobileController> _logger;
        private readonly RDSContext _context;

        public MobileController(ILogger<MobileController> logger, RDSContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpGet]
        public IEnumerable<MobileForm> GetAll()
        {
            _logger.LogInformation("GetAll is called");

            return _context.Mobiles.Select(mobile => new MobileForm(mobile)).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MobileForm>> GetById(int id)
        {
            _logger.LogInformation("GetById is called");
            var mobile = await _context.Mobiles.FindAsync(id);

            return mobile == null ? NotFound() : (ActionResult<MobileForm>)new MobileForm(mobile);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MobileForm form)
        {
            if (form.Id != 0)
                return BadRequest($"Can not add new mobile with Id");

            _logger.LogInformation("Create new mobile is called");
            
            _context.Mobiles.Add(new Mobile(form));
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = form.Id }, form);
        }

        [HttpPut]
        public async Task<IActionResult> Update(MobileForm form)
        {
            var mobile = await _context.Mobiles.FindAsync(form.Id);
            if (mobile == null)
                return NotFound("Not found mobile to update");

            _logger.LogInformation("Update a mobile is called");
            _context.Entry(mobile).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = form.Id }, form);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mobile = await _context.Mobiles.FindAsync(id);
            if (mobile == null)
                return NotFound($"Not found mobile with id {id} to delete");

            _logger.LogInformation("Delete is called");
            _context.Mobiles.Remove(mobile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), _context.Mobiles.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Order(MobileOrder order)
        {
            for (var i = 0; i < order.Ids.Length; i++)
            {
                var id = order.Ids[i];
                var mobile = await _context.Mobiles.FindAsync(id);

                if (mobile == null)
                    return NotFound($"Not found mobile with id {id} to this order");

                if (mobile.Instock < order.Quantity[i])
                    return BadRequest($"Stock is not enough {mobile.Name} to this order.");

                _context.Entry(mobile).State = EntityState.Modified;
                mobile.Instock -= order.Quantity[i];
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), _context.Mobiles.ToList());
        }
    }
}
